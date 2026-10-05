import { useScrollProgress } from '@/hooks/useScrollProgress';

export default function ScrollIndicator() {
  const progress = useScrollProgress();

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '3px',
        zIndex: 60,
        width: `${progress * 100}%`,
        backgroundColor: '#ffffff',
        transition: 'width 0.1s linear',
      }}
      aria-hidden="true"
    />
  );
}
