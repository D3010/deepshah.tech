"use client";

import { useEffect, useRef } from "react";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function KonamiEasterEgg() {
  const buffer = useRef<string[]>([]);

  useEffect(() => {
    const onKey = async (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      buffer.current = [...buffer.current, key].slice(-KONAMI.length);

      if (buffer.current.length !== KONAMI.length) return;
      if (buffer.current.every((k, i) => k === KONAMI[i])) {
        buffer.current = [];
        const confetti = (await import("canvas-confetti")).default;
        const burst = (origin: { x: number; y: number }) =>
          confetti({
            particleCount: 80,
            startVelocity: 45,
            spread: 70,
            ticks: 200,
            origin,
            colors: ["#f7e6c4", "#e8b55a", "#e8a384", "#c9873f", "#fbefd5"],
            disableForReducedMotion: true,
          });
        burst({ x: 0.2, y: 0.6 });
        setTimeout(() => burst({ x: 0.8, y: 0.6 }), 120);
        setTimeout(() => burst({ x: 0.5, y: 0.4 }), 240);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return null;
}
