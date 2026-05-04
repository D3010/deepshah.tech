"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/* The blob — high-poly icosahedron with continuous shader distortion   */
/* ------------------------------------------------------------------ */

function Blob() {
  const ref = useRef<THREE.Mesh>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useFrame(({ clock, mouse }) => {
    if (!ref.current) return;
    // Mouse parallax — eased
    target.current.x = mouse.y * 0.35;
    target.current.y = mouse.x * 0.35;
    current.current.x += (target.current.x - current.current.x) * 0.04;
    current.current.y += (target.current.y - current.current.y) * 0.04;

    ref.current.rotation.x = current.current.x;
    ref.current.rotation.y =
      clock.getElapsedTime() * 0.18 + current.current.y;
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.45, 64]} />
      <MeshDistortMaterial
        color="#ff3d8a"
        roughness={0.18}
        metalness={0.65}
        distort={0.42}
        speed={1.6}
        emissive="#3d0820"
        emissiveIntensity={0.4}
      />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/* A faint wireframe halo behind the blob for extra depth               */
/* ------------------------------------------------------------------ */

function Halo() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = -clock.getElapsedTime() * 0.06;
    ref.current.rotation.x = clock.getElapsedTime() * 0.04;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[2.5, 1]} />
      <meshBasicMaterial
        color="#8b5cf6"
        wireframe
        transparent
        opacity={0.12}
      />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/* Visibility-aware frame loop                                          */
/* ------------------------------------------------------------------ */

function VisibilityGuard() {
  const set = useThree((s) => s.set);
  useMemo(() => {
    if (typeof document === "undefined") return;
    const onVis = () => {
      set({ frameloop: document.hidden ? "never" : "always" });
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [set]);
  return null;
}

/* ------------------------------------------------------------------ */
/* The full scene                                                       */
/* ------------------------------------------------------------------ */

function Scene() {
  return (
    <>
      <VisibilityGuard />
      <ambientLight intensity={0.35} />
      {/* Coral key light */}
      <directionalLight
        position={[3, 4, 5]}
        intensity={2.2}
        color="#ff6b6b"
      />
      {/* Violet rim light */}
      <directionalLight
        position={[-4, -2, 2]}
        intensity={1.6}
        color="#8b5cf6"
      />
      {/* Magenta fill */}
      <pointLight position={[0, -3, 3]} intensity={1.2} color="#d946ef" />

      <Halo />

      <Float
        speed={1.4}
        rotationIntensity={0.35}
        floatIntensity={1.2}
        floatingRange={[-0.15, 0.15]}
      >
        <Blob />
      </Float>

      <Sparkles
        count={140}
        scale={[10, 6, 4]}
        size={3}
        speed={0.35}
        color="#ffffff"
        opacity={0.7}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Public component                                                     */
/* ------------------------------------------------------------------ */

export default function ContactArt() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4.6], fov: 45 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{ background: "transparent" }}
    >
      <Scene />
    </Canvas>
  );
}
