"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/* Shaders — soft glowing dots with size attenuation + breathing pulse */
/* ------------------------------------------------------------------ */

const VERT = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uSize;
  uniform float uBreathStrength;

  attribute vec3 aColor;
  attribute float aPhase;
  attribute float aScale;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vColor = aColor;

    // Breathing — each particle pulses outward along its normal.
    float pulse = sin(uTime * 0.5 + aPhase) * uBreathStrength;
    vec3 dir = normalize(position);
    vec3 displaced = position + dir * pulse;

    vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);

    // Size attenuates with distance from camera.
    gl_PointSize = uSize * aScale * uPixelRatio * (1.0 / -mvPosition.z);
    // Ensure points stay legible at any DPR.
    gl_PointSize = clamp(gl_PointSize, 1.0, 64.0);

    vAlpha = 1.0;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // Soft round dot using gl_PointCoord.
    vec2 uv = gl_PointCoord - 0.5;
    float dist = length(uv);
    // Hard core, soft halo
    float core = smoothstep(0.5, 0.0, dist);
    float halo = smoothstep(0.5, 0.15, dist) * 0.45;
    float a = clamp(core + halo, 0.0, 1.0) * vAlpha;
    if (a < 0.01) discard;
    gl_FragColor = vec4(vColor, a);
  }
`;

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const COLOR_OFFWHITE = new THREE.Color("#fafafa");
const COLOR_PINK = new THREE.Color("#ff3d8a");
const COLOR_VIOLET = new THREE.Color("#8b5cf6");

/** Even point distribution on a sphere via Fibonacci lattice. */
function fibonacciSphere(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    positions[i * 3 + 0] = Math.cos(theta) * r * radius;
    positions[i * 3 + 1] = y * radius;
    positions[i * 3 + 2] = Math.sin(theta) * r * radius;
  }
  return positions;
}

function buildShellAttributes(count: number) {
  const colors = new Float32Array(count * 3);
  const phases = new Float32Array(count);
  const scales = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const r = Math.random();
    let c: THREE.Color;
    if (r < 0.04) c = COLOR_VIOLET;
    else if (r < 0.12) c = COLOR_PINK;
    else c = COLOR_OFFWHITE;
    colors[i * 3 + 0] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
    phases[i] = Math.random() * Math.PI * 2;
    // Slight size variance so the shell doesn't look uniform
    scales[i] = 0.7 + Math.random() * 0.8;
  }
  return { colors, phases, scales };
}

/* ------------------------------------------------------------------ */
/* A single shell                                                      */
/* ------------------------------------------------------------------ */

interface ShellProps {
  count: number;
  radius: number;
  size: number;
  rotateSpeed: number;
  breathStrength: number;
}

function ParticleShell({
  count,
  radius,
  size,
  rotateSpeed,
  breathStrength,
}: ShellProps) {
  const ref = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const dpr = useThree((s) => s.viewport.dpr);

  const { positions, colors, phases, scales } = useMemo(() => {
    const positions = fibonacciSphere(count, radius);
    const attrs = buildShellAttributes(count);
    return { positions, ...attrs };
  }, [count, radius]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: dpr },
      uSize: { value: size },
      uBreathStrength: { value: breathStrength },
    }),
    [dpr, size, breathStrength],
  );

  useFrame((_state, delta) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value += delta;
    }
    if (ref.current) {
      ref.current.rotation.y += delta * rotateSpeed;
    }
  });

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-aColor"
          args={[colors, 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-aPhase"
          args={[phases, 1]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-aScale"
          args={[scales, 1]}
          count={count}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/* Parallax group — tilts toward cursor                                */
/* ------------------------------------------------------------------ */

function OrbGroup() {
  const groupRef = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  // Listen on the canvas via R3F's pointer events so we don't bind globals.
  const onPointerMove = (e: ThreeEvent<PointerEvent>) => {
    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = (e.clientY / window.innerHeight) * 2 - 1;
    target.current.x = nx * 0.15;
    target.current.y = -ny * 0.15;
  };

  useFrame(() => {
    if (!groupRef.current) return;
    current.current.x += (target.current.x - current.current.x) * 0.04;
    current.current.y += (target.current.y - current.current.y) * 0.04;
    groupRef.current.rotation.x = current.current.y;
    groupRef.current.rotation.y += 0; // shells handle their own y-rotation
    groupRef.current.rotation.z = current.current.x * 0.5;
  });

  return (
    <>
      <mesh
        // Invisible plane to capture pointer-move across the whole canvas
        position={[0, 0, -1]}
        onPointerMove={onPointerMove}
      >
        <planeGeometry args={[40, 40]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      <group ref={groupRef}>
        {/* Inner shell — denser, slightly faster */}
        <ParticleShell
          count={3500}
          radius={2.4}
          size={9}
          rotateSpeed={0.06}
          breathStrength={0.04}
        />
        {/* Outer shell — sparser, slower, counter-rotating */}
        <ParticleShell
          count={800}
          radius={3.0}
          size={11}
          rotateSpeed={-0.035}
          breathStrength={0.06}
        />
      </group>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Visibility-aware frame loop                                         */
/* ------------------------------------------------------------------ */

function VisibilityGuard() {
  const set = useThree((s) => s.set);
  // Pause rendering when tab is hidden — saves battery and keeps perf budget.
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
/* Public component                                                    */
/* ------------------------------------------------------------------ */

export default function ParticleOrb() {
  // We deliberately keep the orb running even when prefers-reduced-motion is
  // set — the rotation is slow + ambient, well within the spirit of the
  // preference. Headline word-reveal animations still respect it.
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 7], fov: 45 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <VisibilityGuard />
      <OrbGroup />
    </Canvas>
  );
}
