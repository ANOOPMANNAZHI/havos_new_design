import { motion } from 'framer-motion';

export default function WaveText({
  text,
  stagger = 0.06,
  amplitude = 10,
  duration = 0.6,
  className = '',
}) {
  const letters = text.split('');

  return (
    <span className={`wave-text ${className}`} aria-label={text}>
      {letters.map((char, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
          initial={{ y: amplitude, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{
            delay: i * stagger,
            duration,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}
