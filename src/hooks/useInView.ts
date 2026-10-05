import { useEffect, useRef, useState } from 'react';

export function useInView(
  options?: IntersectionObserverInit,
): [React.RefObject<Element>, boolean] {
  const ref = useRef<Element>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        obs.disconnect();
      }
    }, options);

    obs.observe(el);

    return () => obs.disconnect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return [ref, inView];
}
