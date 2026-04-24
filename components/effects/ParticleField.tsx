"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseSize: number;
  hue: number;
  alpha: number;
  twinklePhase: number;
};

const HUES = [12, 340, 260, 24]; // coral, magenta, violet, amber
const POINTER_RADIUS = 220;
const POINTER_FORCE = 0.45;
const DAMPING = 0.94;
const MAX_DRIFT = 0.28;
const DENSITY_DIVISOR = 14000; // px² per particle — smaller = more particles

export function ParticleField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let pointerX = -9999;
    let pointerY = -9999;

    const particles: Particle[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const seed = () => {
      particles.length = 0;
      const target = Math.max(60, Math.min(180, Math.floor((width * height) / DENSITY_DIVISOR)));
      for (let i = 0; i < target; i++) {
        const baseSize = 1.6 + Math.random() * 3.2;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * MAX_DRIFT,
          vy: (Math.random() - 0.5) * MAX_DRIFT,
          size: baseSize,
          baseSize,
          hue: HUES[Math.floor(Math.random() * HUES.length)],
          alpha: 0.45 + Math.random() * 0.4,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerX = e.clientX - rect.left;
      pointerY = e.clientY - rect.top;
    };

    const onPointerLeave = () => {
      pointerX = -9999;
      pointerY = -9999;
    };

    const draw = (p: Particle) => {
      // Soft outer halo
      const haloR = p.size * 6;
      const halo = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, haloR);
      halo.addColorStop(0, `hsla(${p.hue}, 92%, 58%, ${p.alpha * 0.45})`);
      halo.addColorStop(0.5, `hsla(${p.hue}, 92%, 60%, ${p.alpha * 0.12})`);
      halo.addColorStop(1, `hsla(${p.hue}, 92%, 65%, 0)`);
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(p.x, p.y, haloR, 0, Math.PI * 2);
      ctx.fill();

      // Solid colored core
      ctx.fillStyle = `hsla(${p.hue}, 90%, 52%, ${p.alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    };

    const tick = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";

      const time = t * 0.001;

      for (const p of particles) {
        // Cursor push outward
        const dx = p.x - pointerX;
        const dy = p.y - pointerY;
        const dist2 = dx * dx + dy * dy;
        if (dist2 < POINTER_RADIUS * POINTER_RADIUS && dist2 > 1) {
          const dist = Math.sqrt(dist2);
          const falloff = 1 - dist / POINTER_RADIUS;
          const force = falloff * falloff * POINTER_FORCE;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        p.vx *= DAMPING;
        p.vy *= DAMPING;
        // Tiny drift bias so particles don't all freeze
        p.vx += (Math.random() - 0.5) * 0.012;
        p.vy += (Math.random() - 0.5) * 0.012;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < -20) p.x = width + 20;
        else if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        else if (p.y > height + 20) p.y = -20;

        // Twinkle: subtle size pulse
        const twinkle = 0.85 + Math.sin(time * 1.4 + p.twinklePhase) * 0.15;
        p.size = p.baseSize * twinkle;

        draw(p);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    if (!reduced) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerleave", onPointerLeave);
      rafRef.current = requestAnimationFrame(tick);
    } else {
      // Reduced motion: paint a static, still-pretty scatter
      ctx.globalCompositeOperation = "source-over";
      for (const p of particles) draw(p);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className ?? "absolute inset-0 h-full w-full"}
    />
  );
}
