Build an Apple-style scroll-controlled frame animation for my website using my existing PNG image sequence.

My current animation consists of hundreds of PNG frames. Optimize the entire implementation for production performance and smooth scrolling.

Requirements:

1. Convert all jpeg frames into optimized WebP images.

   * Preserve visual quality.
   * Use efficient compression suitable for website animation.
   * Keep filenames in sequential order, for example:
     frame_0001.webp
     frame_0002.webp
     frame_0003.webp
   * Do not resize incorrectly or change the aspect ratio.
   * Recommend a reasonable WebP quality around 75–85 and make it configurable.
   * Provide a Node.js conversion script using Sharp so I can convert the entire PNG folder automatically.

2. Create an Apple-style scroll animation using HTML5 Canvas.

   * Do NOT display hundreds of `<img>` elements.
   * Use one `<canvas>` and draw the required frame based on scroll progress.
   * Map the complete scroll section from frame 1 to the final frame.
   * The animation should feel cinematic, smooth, and directly connected to scrolling.

3. Use a sticky/pinned animation section.

   * Keep the canvas fixed/sticky while the user scrolls through a long section.
   * Example:
     animation section height: around 400vh–700vh
     canvas: sticky at top: 0
     canvas height: 100vh
   * Once the sequence finishes, normal page scrolling should continue.

4. Performance optimization is extremely important.

   * Do NOT preload every frame immediately.
   * Load the first frame instantly.
   * Preload a small number of initial frames.
   * Load remaining frames progressively in batches.
   * Prioritize frames close to the currently displayed frame.
   * Cache successfully loaded images.
   * Avoid duplicate network requests.
   * Use requestAnimationFrame for rendering.
   * Avoid React state updates on every scroll event.
   * Store frequently changing values in refs where appropriate.

5. Add intelligent frame preloading.
   For example, when the current frame is 120:

   * prioritize approximately frames 110–140,
   * then continue loading nearby frames,
   * load distant frames with lower priority.

6. Make scrolling extremely smooth.

   * Do not update the canvas unnecessarily.
   * Only redraw when the calculated frame changes.
   * Use requestAnimationFrame to synchronize canvas rendering with the browser.
   * Handle fast scrolling without freezing or showing broken frames.
   * If the exact requested frame has not loaded yet, temporarily display the nearest available loaded frame.

7. Make the canvas responsive.

   * Support desktop, tablet, and mobile.
   * Maintain the original image aspect ratio.
   * Implement object-fit: cover style behavior inside Canvas.
   * Correctly handle devicePixelRatio for sharp Retina displays.
   * Do not unnecessarily render at an excessively high resolution that hurts performance.
   * Recalculate canvas dimensions on resize.

8. Add mobile optimization.

   * Allow a separate lower-resolution WebP sequence for mobile if needed.
   * Detect viewport width and select the appropriate sequence.
   * Reduce memory usage on low-powered devices.
   * Avoid loading hundreds of very large desktop frames on mobile.

9. Structure the files cleanly, for example:

public/
frames/
desktop/
frame_0001.webp
frame_0002.webp
...
mobile/
frame_0001.webp
frame_0002.webp
...

scripts/
convert-frames.js

src/
components/
ScrollFrameAnimation.jsx

10. The frame path should be generated dynamically instead of manually importing every image.

Example concept:

const framePath = (index) =>
`/frames/desktop/frame_${String(index).padStart(4, "0")}.webp`;

11. Calculate animation progress approximately like:

scrollProgress = scrollPositionInsideSection / scrollableSectionDistance

currentFrame = Math.round(
scrollProgress * (TOTAL_FRAMES - 1)
)

Clamp the result between 0 and TOTAL_FRAMES - 1.

12. Do not use a huge JavaScript array containing imported image files.

13. Add loading/error handling.

* First frame should appear as quickly as possible.
* Avoid blank canvas while nearby frames load.
* Gracefully skip a missing frame.
* Log missing frame paths during development.

14. Prevent memory problems.

* Do not decode hundreds of full-resolution images simultaneously if unnecessary.
* Use browser-friendly caching.
* Consider createImageBitmap where supported if it improves rendering performance.
* Explain the tradeoff before using it.
* Keep memory usage reasonable for mobile Safari.

15. Avoid unnecessary animation libraries unless they provide a meaningful benefit.
    Prefer native:

* Canvas
* requestAnimationFrame
* IntersectionObserver
* scroll events/passive listeners

If GSAP ScrollTrigger is used, use it only for pinning/progress management and still render frames efficiently through Canvas.

16. Add IntersectionObserver so frame loading becomes more aggressive only when the animation section is approaching the viewport.

17. Add optional loading progress for debugging, such as:
    "87 / 480 frames cached"
    but make it easy to disable in production.

18. Optimize Core Web Vitals.

* Do not block initial page rendering with all animation frames.
* Prioritize the first visible frame.
* Lazy-load the remaining sequence.
* Avoid layout shift.
* Keep the canvas dimensions reserved before assets finish loading.

19. Include accessibility/fallback behavior.

* Respect prefers-reduced-motion.
* For users requesting reduced motion, display a static representative frame instead of running the full scroll animation.

20. Create production-ready code rather than a basic demo.

Assume approximately 480 frames, but keep TOTAL_FRAMES configurable.

Also provide:

A. The complete Node.js Sharp script to convert PNG → WebP.

B. Recommended Sharp settings for:

* desktop WebP
* mobile WebP

C. Complete React component code.

D. CSS required for the sticky scroll section.

E. A recommended folder structure.

F. Instructions explaining where I should put my original PNG frames and how to run the conversion command.

G. Recommended deployment strategy so hundreds of frames do not unnecessarily slow down the website.

H. Explain how to adjust:

* animation scroll length
* total frame count
* WebP quality
* desktop/mobile resolution
* preload batch size

The final result should visually feel similar to premium Apple product-page scroll storytelling: smooth, responsive, frame-accurate, cinematic, and optimized for real-world production deployment.
