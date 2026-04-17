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
          grab: { distance: 160, links: { opacity: 0.4 } },
        },
      },
      particles: {
        color: { value: ["#a855f7", "#22d3ee", "#f59e0b", "#c084fc"] },
        links: {
          color: "#a855f7",
          distance: 140,
          enable: true,
          opacity: 0.2,
          width: 1,
        },
        move: {
          enable: !reduced,
          direction: "none",
          outModes: { default: "bounce" },
          random: true,
          speed: 0.5,
          straight: false,
        },
        number: {
          density: { enable: true, width: 1200, height: 800 },
          value: 55,
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
