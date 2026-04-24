"use client";

import { useEffect, useRef } from "react";

type Particle = {
  ringIdx: number;
  baseAngle: number;
  baseRadius: number;
  ox: number;
  oy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  hue: number;
};

const ACCENT_HUES = [12, 340, 260, 24];
const RING_COUNT = 4;
const PARTICLES_PER_RING = 20;
const POINTER_RADIUS = 300;
const POINTER_FORCE = 0.55;
const RETURN_STIFFNESS = 0.045;
const DAMPING = 0.86;

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
    let cx = 0;
    let cy = 0;
    let pointerX = -9999;
    let pointerY = -9999;
    let rotation = 0;

    const particles: Particle[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      cx = width / 2;
      cy = height / 2;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedParticles();
    };

    const seedParticles = () => {
      particles.length = 0;
      const minDim = Math.min(width, height);
      const baseR = Math.max(120, minDim * 0.18);
      for (let r = 0; r < RING_COUNT; r++) {
        const radius = baseR + r * (minDim * 0.085);
        for (let i = 0; i < PARTICLES_PER_RING; i++) {
          const angle = (i / PARTICLES_PER_RING) * Math.PI * 2 + r * 0.3;
          const jitter = (Math.random() - 0.5) * 14;
          const ox = Math.cos(angle) * (radius + jitter);
          const oy = Math.sin(angle) * (radius + jitter);
          particles.push({
            ringIdx: r,
            baseAngle: angle,
            baseRadius: radius + jitter,
            ox,
            oy,
            x: cx + ox,
            y: cy + oy,
            vx: 0,
            vy: 0,
            size: 1.4 + Math.random() * 1.6,
            hue: ACCENT_HUES[r % ACCENT_HUES.length],
          });
        }
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

    const tick = (t: number) => {
      rotation = t * 0.00006;
      ctx.clearRect(0, 0, width, height);
      // multiply makes colored particles appear as ink-on-paper on a white canvas
      ctx.globalCompositeOperation = "multiply";

      for (const p of particles) {
        const ringSpin = (p.ringIdx % 2 === 0 ? 1 : -1) * (0.12 + p.ringIdx * 0.04);
        const angle = p.baseAngle + rotation * ringSpin * 60;
        const restX = cx + Math.cos(angle) * p.baseRadius;
        const restY = cy + Math.sin(angle) * p.baseRadius;

        const dx = p.x - pointerX;
        const dy = p.y - pointerY;
        const dist2 = dx * dx + dy * dy;
        if (dist2 < POINTER_RADIUS * POINTER_RADIUS && dist2 > 1) {
          const dist = Math.sqrt(dist2);
          const falloff = 1 - dist / POINTER_RADIUS;
          const force = falloff * falloff * POINTER_FORCE;
          p.vx += (dx / dist) * force * 8;
          p.vy += (dy / dist) * force * 8;
        }

        p.vx += (restX - p.x) * RETURN_STIFFNESS;
        p.vy += (restY - p.y) * RETURN_STIFFNESS;
        p.vx *= DAMPING;
        p.vy *= DAMPING;
        p.x += p.vx;
        p.y += p.vy;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 9);
        grad.addColorStop(0, `hsla(${p.hue}, 90%, 55%, 0.55)`);
        grad.addColorStop(0.45, `hsla(${p.hue}, 88%, 60%, 0.18)`);
        grad.addColorStop(1, `hsla(${p.hue}, 90%, 70%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 9, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `hsla(${p.hue}, 95%, 45%, 0.55)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.9, 0, Math.PI * 2);
        ctx.fill();
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
      ctx.globalCompositeOperation = "multiply";
      for (const p of particles) {
        ctx.fillStyle = `hsla(${p.hue}, 90%, 50%, 0.45)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
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
