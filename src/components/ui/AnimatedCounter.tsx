import { useEffect, useRef, useState } from 'react';
import { useMotionValue } from 'framer-motion';
import { useInView } from '@/hooks/useInView';

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
}

export default function AnimatedCounter({
  target,
  suffix = '',
  prefix = '',
}: AnimatedCounterProps) {
  const motionValue = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);
  const [ref, inView] = useInView({ threshold: 0.5 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 1500; // 1.5s
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOut cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      motionValue.set(current);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, target, motionValue]);

  return (
    <span ref={ref as React.RefObject<HTMLSpanElement>}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}
