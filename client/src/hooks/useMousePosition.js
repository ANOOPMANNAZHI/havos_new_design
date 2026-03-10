import { useEffect } from 'react';
import { useMotionValue } from 'framer-motion';

const canHover =
  typeof window !== 'undefined' &&
  window.matchMedia('(pointer: fine) and (hover: hover)').matches;

export default function useMousePosition() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    if (!canHover) return;

    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;   // -1 … 1
      const y = (e.clientY / window.innerHeight) * 2 - 1;  // -1 … 1
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, [mouseX, mouseY]);

  return { mouseX, mouseY };
}
