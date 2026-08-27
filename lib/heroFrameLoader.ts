// Hero frames preloader and shared cache
export const TOTAL_HERO_FRAMES = 480;
export const getHeroFramePath = (i: number) =>
  `/hero-frames/frame_${String(i).padStart(6, "0")}.jpeg`;

// Global in-memory cache for loaded frame images
export const heroFramesCache = new Map<number, HTMLImageElement>();

type ProgressCallback = (loaded: number, total: number, percent: number) => void;
type CompleteCallback = () => void;

let isPreloading = false;
let isPreloaded = false;
let loadedCount = 0;
const progressListeners = new Set<ProgressCallback>();
const completeListeners = new Set<CompleteCallback>();

export function isHeroFramesLoaded(): boolean {
  return isPreloaded;
}

export function getHeroLoadingProgress(): { loaded: number; total: number; percent: number } {
  return {
    loaded: loadedCount,
    total: TOTAL_HERO_FRAMES,
    percent: TOTAL_HERO_FRAMES > 0 ? (loadedCount / TOTAL_HERO_FRAMES) * 100 : 100,
  };
}

export function subscribeHeroProgress(
  onProgress: ProgressCallback,
  onComplete?: CompleteCallback
): () => void {
  progressListeners.add(onProgress);
  if (onComplete) completeListeners.add(onComplete);

  // Immediately notify current progress
  onProgress(
    loadedCount,
    TOTAL_HERO_FRAMES,
    TOTAL_HERO_FRAMES > 0 ? (loadedCount / TOTAL_HERO_FRAMES) * 100 : 100
  );

  if (isPreloaded && onComplete) {
    onComplete();
  }

  return () => {
    progressListeners.delete(onProgress);
    if (onComplete) completeListeners.delete(onComplete);
  };
}

export function startHeroFramesPreload(concurrency = 16): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (isPreloaded) return Promise.resolve();
  if (isPreloading) {
    return new Promise((resolve) => {
      const unsub = subscribeHeroProgress(
        () => {},
        () => {
          unsub();
          resolve();
        }
      );
    });
  }

  isPreloading = true;

  return new Promise((resolve) => {
    let nextIndexToLoad = 0;
    let activeWorkers = 0;

    const notifyProgress = () => {
      const pct = (loadedCount / TOTAL_HERO_FRAMES) * 100;
      progressListeners.forEach((fn) => {
        try {
          fn(loadedCount, TOTAL_HERO_FRAMES, pct);
        } catch {
          // Ignore listener errors
        }
      });
    };

    const checkDone = () => {
      if (loadedCount >= TOTAL_HERO_FRAMES) {
        isPreloaded = true;
        isPreloading = false;
        notifyProgress();
        completeListeners.forEach((fn) => {
          try {
            fn();
          } catch {
            // Ignore listener errors
          }
        });
        resolve();
      }
    };

    const loadNext = () => {
      if (nextIndexToLoad >= TOTAL_HERO_FRAMES) {
        if (activeWorkers === 0) checkDone();
        return;
      }

      const currentIndex = nextIndexToLoad++;
      activeWorkers++;

      // If already cached
      if (heroFramesCache.has(currentIndex)) {
        loadedCount++;
        activeWorkers--;
        notifyProgress();
        checkDone();
        loadNext();
        return;
      }

      const img = new Image();
      img.src = getHeroFramePath(currentIndex);

      const onFinish = () => {
        heroFramesCache.set(currentIndex, img);
        loadedCount++;
        activeWorkers--;
        notifyProgress();
        checkDone();
        loadNext();
      };

      img.onload = onFinish;
      img.onerror = onFinish; // Don't block whole sequence if one frame has network glitch
    };

    // Spawn concurrent workers
    const workerCount = Math.min(concurrency, TOTAL_HERO_FRAMES);
    for (let w = 0; w < workerCount; w++) {
      loadNext();
    }
  });
}
