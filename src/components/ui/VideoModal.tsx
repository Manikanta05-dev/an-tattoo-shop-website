import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { scaleIn } from './variants';

interface VideoModalProps {
  src: string;
  onClose: () => void;
  poster?: string;
}

export default function VideoModal({ src, onClose, poster }: VideoModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Video player"
    >
      {/* Close button */}
      <button
        className="absolute top-4 right-4 text-white text-3xl w-11 h-11 flex items-center justify-center hover:text-gray-300 transition-colors duration-200 z-10"
        onClick={onClose}
        aria-label="Close video"
      >
        ×
      </button>

      <motion.div
        variants={scaleIn}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          src={src}
          poster={poster}
          controls
          autoPlay
          className="max-w-[90vw] max-h-[80vh]"
        />
      </motion.div>
    </div>
  );
}
