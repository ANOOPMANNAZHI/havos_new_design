import { useRef, useEffect } from 'react';

const PARTICLE_COUNT = 60;
const COLORS = ['rgba(43, 92, 255, 0.15)', 'rgba(43, 92, 255, 0.25)', 'rgba(43, 92, 255, 0.35)', 'rgba(107, 140, 255, 0.2)'];

function createParticle(width, height) {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    size: 2 + Math.random() * 2,
    speedX: (Math.random() - 0.5) * 0.4,
    speedY: (Math.random() - 0.5) * 0.3,
    opacity: 0.15 + Math.random() * 0.25,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  };
}

export default function ParticleCanvas() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.scale(dpr, dpr);
      return { width: rect.width, height: rect.height };
    }

    let dims = resize();

    // Init particles
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () =>
      createParticle(dims.width, dims.height)
    );

    function draw() {
      ctx.clearRect(0, 0, dims.width, dims.height);

      for (const p of particlesRef.current) {
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around edges
        if (p.x < -10) p.x = dims.width + 10;
        if (p.x > dims.width + 10) p.x = -10;
        if (p.y < -10) p.y = dims.height + 10;
        if (p.y > dims.height + 10) p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      animFrameRef.current = requestAnimationFrame(draw);
    }

    draw();

    const handleResize = () => {
      dims = resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        willChange: 'transform',
      }}
    />
  );
}
