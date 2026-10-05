import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from './variants';

interface SectionRevealProps {
  variant?: 'fadeUp' | 'fadeIn' | 'stagger';
  children: React.ReactNode;
  className?: string;
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

export default function SectionReveal({
  variant = 'fadeUp',
  children,
  className,
}: SectionRevealProps) {
  if (variant === 'stagger') {
    return (
      <motion.div
        className={className}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {children}
      </motion.div>
    );
  }

  const chosenVariant = variant === 'fadeIn' ? fadeIn : fadeUp;

  return (
    <motion.div
      className={className}
      variants={chosenVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.div>
  );
}
