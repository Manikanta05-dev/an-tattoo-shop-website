import { motion } from 'framer-motion';
import { staggerContainer, fadeUp } from './variants';
import type { PortfolioItem } from '@/types';

interface MasonryGridProps {
  images: PortfolioItem[];
  onImageClick: (index: number) => void;
}

export default function MasonryGrid({ images, onImageClick }: MasonryGridProps) {
  return (
    <motion.div
      className="columns-2 md:columns-3 lg:columns-4 gap-2"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {images.map((item, index) => (
        <motion.div
          key={item.id}
          className="break-inside-avoid mb-2"
          variants={fadeUp}
        >
          <img
            src={item.src}
            alt={item.alt}
            loading="lazy"
            onClick={() => onImageClick(index)}
            className="w-full h-auto object-cover cursor-pointer hover:scale-[1.02] transition-transform duration-300"
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
