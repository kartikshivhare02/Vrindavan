"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface ProjectGalleryProps {
  images: string[];
  projectName: string;
}

export default function ProjectGallery({
  images,
  projectName,
}: ProjectGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openLightbox = useCallback((index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  }, []);

  const navigate = useCallback(
    (dir: "prev" | "next") => {
      setActiveIndex((prev) =>
        dir === "prev"
          ? (prev - 1 + images.length) % images.length
          : (prev + 1) % images.length
      );
    },
    [images.length]
  );

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navigate("prev");
      if (e.key === "ArrowRight") navigate("next");
    },
    [closeLightbox, navigate]
  );

  if (!images || images.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="font-body text-charcoal-mid text-sm">
          [Gallery images will be added here. Place images in{" "}
          <code className="text-brand-green">
            /public/images/projects/PROJECT_SLUG/
          </code>
          ]
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Gallery Grid */}
      <div
        className="grid grid-cols-2 md:grid-cols-3 gap-3"
        role="list"
        aria-label={`${projectName} photo gallery`}
      >
        {images.map((src, i) => {
          const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(src);
          return (
            <button
              key={i}
              role="listitem"
              onClick={() => openLightbox(i)}
              className="relative overflow-hidden rounded-sm group cursor-zoom-in bg-black/40"
              style={{ aspectRatio: i === 0 ? "16/9" : "4/3", ...(i === 0 ? { gridColumn: "span 2" } : {}) }}
              aria-label={`View ${projectName} media ${i + 1}`}
            >
              {isVideo ? (
                <video
                  src={src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <Image
                  src={src}
                  alt={`${projectName} — gallery image ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              )}
              <div
                className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center"
                aria-hidden="true"
              >
                <ZoomIn
                  size={24}
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${projectName} gallery lightbox`}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="Close lightbox"
            >
              <X size={18} />
            </button>

            {/* Counter */}
            <div className="absolute top-6 left-6 z-10 text-white/60 font-body text-sm">
              {activeIndex + 1} / {images.length}
            </div>

            {/* Prev */}
            <button
              onClick={() => navigate("prev")}
              className="absolute left-4 z-10 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Image / Video */}
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-5xl mx-16 flex items-center justify-center"
              style={{ aspectRatio: "16/9" }}
            >
              {/\.(mp4|webm|ogg|mov)$/i.test(images[activeIndex]) ? (
                <video
                  src={images[activeIndex]}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain rounded-xs max-h-[80vh]"
                />
              ) : (
                <Image
                  src={images[activeIndex]}
                  alt={`${projectName} — image ${activeIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="90vw"
                  priority
                />
              )}
            </motion.div>

            {/* Next */}
            <button
              onClick={() => navigate("next")}
              className="absolute right-4 z-10 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>

            {/* Thumbnails */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? "bg-white w-6"
                      : "bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Go to image ${i + 1}`}
                  aria-current={i === activeIndex}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
