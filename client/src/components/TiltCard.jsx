import { useRef } from 'react';
import { motion, useMotionValue, useMotionTemplate, useSpring } from 'framer-motion';

const springCfg = { stiffness: 200, damping: 20 };

export default function TiltCard({
  children,
  tiltMax = 8,
  scale = 1.02,
  glareEnabled = true,
  className = '',
  style = {},
}) {
  const ref = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useMotionValue(0);

  const springX = useSpring(rotateX, springCfg);
  const springY = useSpring(rotateY, springCfg);

  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.4) 0%, transparent 60%)`;

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;   // 0…1
    const py = (e.clientY - rect.top) / rect.height;    // 0…1
    rotateX.set((py - 0.5) * -tiltMax * 2);
    rotateY.set((px - 0.5) * tiltMax * 2);
    glareX.set(px * 100);
    glareY.set(py * 100);
    glareOpacity.set(0.15);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glareOpacity.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`tilt-card ${className}`}
      style={{
        perspective: 800,
        transformStyle: 'preserve-3d',
        ...style,
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={{ scale }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <motion.div
        style={{
          rotateX: springX,
          rotateY: springY,
          transformStyle: 'preserve-3d',
          width: '100%',
          height: '100%',
        }}
      >
        {children}

        {glareEnabled && (
          <motion.div
            className="tilt-card__glare"
            style={{
              opacity: glareOpacity,
              background: glareBackground,
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}
