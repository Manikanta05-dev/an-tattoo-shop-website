import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { scaleIn } from './variants';
import type { PortfolioItem } from '@/types';

interface LightboxProps {
  images: PortfolioItem[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const current = images[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      {/* Close button */}
      <button
        className="absolute top-4 right-4 text-white text-3xl w-11 h-11 flex items-center justify-center hover:text-gray-300 transition-colors duration-200 z-10"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        ×
      </button>

      {/* Previous button */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl w-11 h-11 flex items-center justify-center hover:text-gray-300 transition-colors duration-200 z-10"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous image"
      >
        ←
      </button>

      {/* Next button */}
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl w-11 h-11 flex items-center justify-center hover:text-gray-300 transition-colors duration-200 z-10"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next image"
      >
        →
      </button>

      {/* Image container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="flex flex-col items-center gap-3"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={current.src}
            alt={current.alt}
            className="object-contain max-h-[90vh] max-w-[90vw]"
          />
          {current.alt && (
            <p className="text-gray-300 text-sm text-center max-w-md">
              {current.alt}
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
