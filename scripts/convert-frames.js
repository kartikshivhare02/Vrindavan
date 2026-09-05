const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
function getArg(flag, def) {
  var i = args.indexOf(flag);
  return (i !== -1 && args[i + 1]) ? args[i + 1] : def;
}

var CONFIG = {
  inputDir:        getArg("--input", "./source-frames"),
  outputDesktop:   "./public/frames/desktop",
  outputMobile:    "./public/frames/mobile",
  qualityDesktop:  parseInt(getArg("--quality-desktop", "75"), 10),
  qualityMobile:   parseInt(getArg("--quality-mobile",  "65"), 10),
  effortDesktop:   parseInt(getArg("--effort-desktop",  "6"),  10),
  effortMobile:    parseInt(getArg("--effort-mobile",   "6"),  10),
  mobileWidth:     parseInt(getArg("--width-mobile",    "720"), 10),
  concurrency:     parseInt(getArg("--concurrency",     "8"),  10),
  startIndex:      1
};

console.log("Frame Conversion JPEG -> WebP (optimised)");
console.log(JSON.stringify(CONFIG, null, 2));

if (!fs.existsSync(CONFIG.inputDir)) {
  console.error("Input dir not found:", CONFIG.inputDir);
  process.exit(1);
}

var EXTS = [".jpeg", ".jpg", ".png", ".webp"];
var srcFiles = fs.readdirSync(CONFIG.inputDir)
  .filter(function(f) { return EXTS.includes(path.extname(f).toLowerCase()); })
  .sort();

if (!srcFiles.length) { console.error("No images found"); process.exit(1); }
console.log("Found", srcFiles.length, "frames.");

[CONFIG.outputDesktop, CONFIG.outputMobile].forEach(function(d) {
  fs.mkdirSync(d, { recursive: true });
});

function pad4(n) { return String(n).padStart(4, "0"); }

async function convertFrame(srcFile, fi) {
  var src = path.join(CONFIG.inputDir, srcFile);
  var outName = "frame_" + pad4(fi) + ".webp";
  var dOut = path.join(CONFIG.outputDesktop, outName);
  var mOut = path.join(CONFIG.outputMobile,  outName);
  if (fs.existsSync(dOut) && fs.existsSync(mOut)) return { fi: fi, skipped: true };
  try {
    var b = sharp(src, { failOnError: false });
    if (!fs.existsSync(dOut)) {
      await b.clone()
        .webp({
          quality:        CONFIG.qualityDesktop,
          effort:         CONFIG.effortDesktop,
          smartSubsample: true,
          nearLossless:   false
        })
        .toFile(dOut);
    }
    if (!fs.existsSync(mOut)) {
      await b.clone()
        .resize(CONFIG.mobileWidth, null, { fit: "inside", withoutEnlargement: true })
        .webp({
          quality:        CONFIG.qualityMobile,
          effort:         CONFIG.effortMobile,
          smartSubsample: true,
          nearLossless:   false
        })
        .toFile(mOut);
    }
    return { fi: fi, skipped: false };
  } catch(e) {
    return { fi: fi, skipped: false, error: e.message };
  }
}

async function runPool(items, fn, c) {
  var res = []; var i = 0;
  async function worker() {
    while (i < items.length) {
      var idx = i++;
      res[idx] = await fn(idx);
    }
  }
  await Promise.all(Array.from({ length: c }, function() { return worker(); }));
  return res;
}

(async function() {
  var t = Date.now(); var ok = 0, sk = 0, er = 0;
  await runPool(srcFiles, async function(idx) {
    var fi = CONFIG.startIndex + idx;
    var r = await convertFrame(srcFiles[idx], fi);
    if (r.error) { er++; console.error("ERR frame_" + pad4(fi), r.error); }
    else if (r.skipped) sk++;
    else ok++;
    if ((idx + 1) % 20 === 0 || idx + 1 === srcFiles.length)
      process.stdout.write("\r  " + (idx + 1) + "/" + srcFiles.length + " ok:" + ok + " sk:" + sk + " er:" + er + "   ");
    return r;
  }, CONFIG.concurrency);
  var elapsed = ((Date.now() - t) / 1000).toFixed(1);
  console.log("");
  console.log("Done in " + elapsed + "s");
  console.log("ok:" + ok + " sk:" + sk + " er:" + er);
  console.log("Desktop ~" + Math.round(ok * 58.7 / 1024) + " MB | Mobile ~" + Math.round(ok * 26.1 / 1024) + " MB (estimated)");
  console.log("TOTAL_FRAMES:", srcFiles.length);
})();
