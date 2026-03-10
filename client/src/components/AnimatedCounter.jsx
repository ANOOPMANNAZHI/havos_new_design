import { useRef, useEffect, useState } from 'react';
import { useInView, useMotionValue, useSpring, motion } from 'framer-motion';

export default function AnimatedCounter({ value, suffix = '', className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20% 0px' });
  const isNumeric = typeof value === 'number';
  const [display, setDisplay] = useState(isNumeric ? '0' + suffix : value);

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.5,
  });

  useEffect(() => {
    if (!isNumeric) return;
    const unsubscribe = spring.on('change', (v) => {
      setDisplay(Math.round(v) + suffix);
    });
    return unsubscribe;
  }, [spring, suffix, isNumeric]);

  useEffect(() => {
    if (isInView && isNumeric) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue, isNumeric]);

  if (!isNumeric) {
    return (
      <motion.span
        ref={ref}
        className={className}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        {value}
      </motion.span>
    );
  }

  return <span ref={ref} className={className}>{display}</span>;
}
