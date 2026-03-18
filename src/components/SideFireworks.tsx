import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
  type: "star" | "circle" | "ring";
}

interface Rocket {
  x: number;
  y: number;
  targetY: number;
  speed: number;
  color: string;
  exploded: boolean;
  trail: { x: number; y: number; alpha: number }[];
}

const COLORS = ["#F48FB1", "#B3E5FC", "#FFF9C4", "#E1BEE7", "#FFFFFF", "#F8BBD0"];

const SideFireworks = ({ side }: { side: "left" | "right" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rocketsRef = useRef<Rocket[]>([]);
  const animRef = useRef<number>(0);
  const lastLaunchRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const launchRocket = () => {
      const x = 10 + Math.random() * (canvas.width - 20);
      rocketsRef.current.push({
        x,
        y: canvas.height,
        targetY: canvas.height * 0.15 + Math.random() * canvas.height * 0.35,
        speed: 2.5 + Math.random() * 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        exploded: false,
        trail: [],
      });
    };

    const explode = (rocket: Rocket) => {
      const count = 20 + Math.floor(Math.random() * 15);
      const burstType = Math.random();
      for (let i = 0; i < count; i++) {
        let angle: number, speed: number;
        if (burstType < 0.33) {
          // Ring burst
          angle = (i / count) * Math.PI * 2;
          speed = 1.5 + Math.random() * 0.5;
        } else if (burstType < 0.66) {
          // Star burst
          const isPoint = i % 3 === 0;
          angle = (i / count) * Math.PI * 2;
          speed = isPoint ? 2.5 + Math.random() * 0.5 : 1 + Math.random() * 0.5;
        } else {
          // Standard burst
          angle = Math.random() * Math.PI * 2;
          speed = 0.5 + Math.random() * 2.5;
        }
        particlesRef.current.push({
          x: rocket.x,
          y: rocket.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          maxLife: 60 + Math.random() * 40,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          size: 2 + Math.random() * 2.5,
          type: burstType < 0.33 ? "ring" : burstType < 0.66 ? "star" : "circle",
        });
      }
    };

    const animate = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Launch rockets
      if (timestamp - lastLaunchRef.current > 800 + Math.random() * 1500) {
        launchRocket();
        lastLaunchRef.current = timestamp;
      }

      // Update & draw rockets
      const rockets = rocketsRef.current;
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.trail.push({ x: r.x, y: r.y, alpha: 0.6 });
        if (r.trail.length > 8) r.trail.shift();
        r.y -= r.speed;
        if (r.y <= r.targetY) {
          explode(r);
          rockets.splice(i, 1);
          continue;
        }
        // Draw trail
        for (let t = 0; t < r.trail.length; t++) {
          ctx.beginPath();
          ctx.arc(r.trail[t].x, r.trail[t].y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = r.color;
          ctx.globalAlpha = (t / r.trail.length) * 0.4;
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = r.color;
        ctx.fill();
      }

      // Update & draw particles
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.02; // gravity
        p.vx *= 0.99;
        p.vy *= 0.99;
        p.life -= 1 / p.maxLife;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = p.life * 0.8;
        ctx.fillStyle = p.color;
        if (p.type === "star") {
          drawStar(ctx, p.x, p.y, p.size);
        } else if (p.type === "ring") {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1;
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      className="fixed top-0 bottom-0 pointer-events-none"
      style={{
        [side]: 0,
        width: "25vw",
        zIndex: 5,
      }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

function drawStar(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
    const method = i === 0 ? "moveTo" : "lineTo";
    ctx[method](x + r * Math.cos(angle), y + r * Math.sin(angle));
  }
  ctx.closePath();
  ctx.fill();
}

export default SideFireworks;
