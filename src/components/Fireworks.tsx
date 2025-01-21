import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
}

interface FireworksProps {
  onComplete?: () => void;
}

const Fireworks: React.FC<FireworksProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>();

  const createParticles = (x: number, y: number) => {
    const colors = ['#ff0', '#f0f', '#0ff', '#ff4', '#4ff'];
    const particleCount = 100;
    const newParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      const speed = 2 + Math.random() * 3;
      newParticles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    return newParticles;
  };

  const animate = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx) return;

    // 使用 clearRect 替代 fillRect 来清除画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.current = particles.current.filter((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vy += 0.05; // 重力效果
      particle.alpha *= 0.98; // 淡出效果

      // 修改颜色处理方式
      ctx.beginPath();
      ctx.fillStyle = particle.color.replace('rgba', 'rgba').replace(')', `, ${particle.alpha})`);
      ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
      ctx.fill();

      return particle.alpha > 0.01;
    });

    if (particles.current.length === 0) {
      cancelAnimationFrame(animationFrameId.current!);
      onComplete?.();
      return;
    }

    animationFrameId.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const container = canvas.parentElement;
    if (!container) return;

    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    particles.current = createParticles(centerX, centerY);
    animate();

    const handleResize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        borderRadius: '1.5rem',
        background: 'transparent'
      }}
    />
  );
};

export default Fireworks;