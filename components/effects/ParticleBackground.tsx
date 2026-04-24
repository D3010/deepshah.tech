"use client";

import { useEffect, useState, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";
import { prefersReducedMotion } from "@/lib/utils";

export function ParticleBackground() {
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(prefersReducedMotion());
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      detectRetina: true,
      interactivity: {
        events: {
          onHover: { enable: !reduced, mode: "grab" },
          resize: { enable: true },
        },
        modes: {
          grab: { distance: 160, links: { opacity: 0.35 } },
        },
      },
      particles: {
        color: { value: ["#f7e6c4", "#e8b55a", "#e8a384", "#c9873f"] },
        links: {
          color: "#e8b55a",
          distance: 140,
          enable: true,
          opacity: 0.18,
          width: 1,
        },
        move: {
          enable: !reduced,
          direction: "none",
          outModes: { default: "bounce" },
          random: true,
          speed: 0.45,
          straight: false,
        },
        number: {
          density: { enable: true, width: 1200, height: 800 },
          value: 48,
        },
        opacity: {
          value: { min: 0.2, max: 0.6 },
          animation: { enable: true, speed: 0.4, sync: false },
        },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 2.5 } },
      },
    }),
    [reduced]
  );

  if (!ready) return null;

  return (
    <Particles
      id="hero-particles"
      options={options}
      className="absolute inset-0 h-full w-full"
    />
  );
}
