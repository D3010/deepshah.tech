"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";

/* ==================================================================== */
/* MORPHING PARTICLE GALAXY                                               */
/*                                                                        */
/* 12,000 GPU-rendered particles continuously flow between four sacred    */
/* geometries (sphere → torus knot → DNA double helix → infinity loop)    */
/* while a curl-noise breathing field and a cursor-driven repulsion       */
/* shockwave push them off their target positions. Color is a chromatic   */
/* gradient cycling through cyan → pink → violet → amber.                 */
/* ==================================================================== */

const PARTICLE_COUNT = 12_000;
const SHAPE_COUNT = 4;
const MORPH_HOLD = 4.2; // seconds spent fully on a shape before morphing
const MORPH_TRANSITION = 2.6; // seconds spent crossfading between shapes

/* ------------------------------------------------------------------ */
/* Shape generators                                                    */
/* ------------------------------------------------------------------ */

function makeSphere(count: number, r = 1.65): Float32Array {
  const out = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = golden * i;
    out[i * 3 + 0] = Math.cos(theta) * radius * r;
    out[i * 3 + 1] = y * r;
    out[i * 3 + 2] = Math.sin(theta) * radius * r;
  }
  return out;
}

function makeTorusKnot(count: number, R = 1.2, rTube = 0.42, p = 2, q = 5): Float32Array {
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 2;
    const u = t * p;
    const v = t * q;
    const cx = (R + Math.cos(v) * 0.5) * Math.cos(u);
    const cy = (R + Math.cos(v) * 0.5) * Math.sin(u);
    const cz = Math.sin(v) * 0.55;

    // Tangent → frame
    const tx = -p * Math.sin(u) * (R + Math.cos(v) * 0.5) - q * Math.sin(v) * Math.cos(u) * 0.5;
    const ty = p * Math.cos(u) * (R + Math.cos(v) * 0.5) - q * Math.sin(v) * Math.sin(u) * 0.5;
    const tz = q * Math.cos(v) * 0.55;
    const tlen = Math.hypot(tx, ty, tz) || 1;
    const ux = tx / tlen, uy = ty / tlen, uz = tz / tlen;
    let n1x = uy * 1 - uz * 0, n1y = uz * 0 - ux * 1, n1z = ux * 0 - uy * 0;
    const n1len = Math.hypot(n1x, n1y, n1z) || 1;
    n1x /= n1len; n1y /= n1len; n1z /= n1len;
    const n2x = uy * n1z - uz * n1y;
    const n2y = uz * n1x - ux * n1z;
    const n2z = ux * n1y - uy * n1x;

    const ang = Math.random() * Math.PI * 2;
    const rad = Math.sqrt(Math.random()) * rTube;
    const ox = (Math.cos(ang) * n1x + Math.sin(ang) * n2x) * rad;
    const oy = (Math.cos(ang) * n1y + Math.sin(ang) * n2y) * rad;
    const oz = (Math.cos(ang) * n1z + Math.sin(ang) * n2z) * rad;

    out[i * 3 + 0] = cx + ox;
    out[i * 3 + 1] = cy + oy;
    out[i * 3 + 2] = cz + oz;
  }
  return out;
}

function makeDNAHelix(count: number): Float32Array {
  const out = new Float32Array(count * 3);
  const turns = 4;
  const height = 3.4;
  const radius = 1.0;
  for (let i = 0; i < count; i++) {
    const tt = i / count;
    const t = tt * Math.PI * 2 * turns;
    const slot = i % 8; // 0..2 strand A, 3..5 strand B, 6..7 rung
    const yy = (tt - 0.5) * height;
    if (slot < 3) {
      out[i * 3 + 0] = Math.cos(t) * radius;
      out[i * 3 + 1] = yy;
      out[i * 3 + 2] = Math.sin(t) * radius;
    } else if (slot < 6) {
      out[i * 3 + 0] = Math.cos(t + Math.PI) * radius;
      out[i * 3 + 1] = yy;
      out[i * 3 + 2] = Math.sin(t + Math.PI) * radius;
    } else {
      const f = Math.random() * 2 - 1;
      out[i * 3 + 0] = Math.cos(t) * radius * f;
      out[i * 3 + 1] = yy;
      out[i * 3 + 2] = Math.sin(t) * radius * f;
    }
    out[i * 3 + 0] += (Math.random() - 0.5) * 0.04;
    out[i * 3 + 1] += (Math.random() - 0.5) * 0.04;
    out[i * 3 + 2] += (Math.random() - 0.5) * 0.04;
  }
  return out;
}

function makeInfinityLoop(count: number): Float32Array {
  const out = new Float32Array(count * 3);
  const A = 1.7;
  const tubeR = 0.32;
  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 2;
    const denom = 1 + Math.sin(t) * Math.sin(t);
    const cx = (A * Math.cos(t)) / denom;
    const cy = (A * Math.sin(t) * Math.cos(t)) / denom;
    const cz = Math.sin(t * 2) * 0.35;
    const ang = Math.random() * Math.PI * 2;
    const rad = Math.sqrt(Math.random()) * tubeR;
    out[i * 3 + 0] = cx + Math.cos(ang) * rad;
    out[i * 3 + 1] = cy + Math.sin(ang) * rad;
    out[i * 3 + 2] = cz + (Math.random() - 0.5) * tubeR;
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Shaders                                                             */
/* ------------------------------------------------------------------ */

const VERT = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uMorph;
  uniform vec3  uMouse;
  uniform float uMousePower;

  attribute vec3  aPosA;
  attribute vec3  aPosB;
  attribute float aSeed;

  varying vec3  vColor;
  varying float vGlow;

  float ease(float x) { return x * x * (3.0 - 2.0 * x); }

  vec3 swirl(vec3 p, float t) {
    return vec3(
      sin(p.y * 1.8 + t * 0.7) + cos(p.z * 1.4 - t * 0.5),
      sin(p.z * 1.6 + t * 0.6) + cos(p.x * 1.5 + t * 0.4),
      sin(p.x * 1.7 - t * 0.5) + cos(p.y * 1.3 + t * 0.6)
    );
  }

  void main() {
    float m = ease(uMorph);
    vec3 base = mix(aPosA, aPosB, m);

    float phase = aSeed * 6.2831853;
    base += swirl(base * 0.9 + vec3(phase), uTime) * 0.06;
    float pulse = sin(uTime * 0.9 + phase) * 0.03;
    base += normalize(base + 0.0001) * pulse;

    // Cursor shockwave
    vec3 toMouse = base - uMouse;
    float d = length(toMouse);
    float wave = exp(-d * d * 1.4) * uMousePower;
    base += normalize(toMouse + 0.0001) * wave * 0.55;

    vec4 mv = modelViewMatrix * vec4(base, 1.0);
    gl_Position = projectionMatrix * mv;

    float sizeMul = 0.7 + 0.6 * sin(uTime * 0.6 + phase * 1.7);
    float pSize = 14.0 * sizeMul * uPixelRatio * (1.0 / -mv.z);
    gl_PointSize = clamp(pSize, 1.2, 56.0);

    // Brand chromatic palette: cyan → pink → violet → amber
    float hueT = uTime * 0.18 + base.x * 0.18 + base.y * 0.13 + aSeed * 0.6;
    vec3 brandA = vec3(0.20, 0.90, 1.00);
    vec3 brandB = vec3(1.00, 0.24, 0.54);
    vec3 brandC = vec3(0.55, 0.36, 0.96);
    vec3 brandD = vec3(1.00, 0.74, 0.30);

    float k = fract(hueT);
    vec3 brandMix;
    if (k < 0.25)      brandMix = mix(brandA, brandB, k * 4.0);
    else if (k < 0.5)  brandMix = mix(brandB, brandC, (k - 0.25) * 4.0);
    else if (k < 0.75) brandMix = mix(brandC, brandD, (k - 0.5) * 4.0);
    else               brandMix = mix(brandD, brandA, (k - 0.75) * 4.0);

    // Tiny sprinkle of full-spectrum rainbow for variation
    vec3 rainbow = 0.5 + 0.5 * cos(6.2831853 * (vec3(0.0, 0.33, 0.67) + hueT));
    vColor = mix(brandMix, rainbow, 0.30);

    vGlow = 1.0 + wave * 6.0;
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  varying vec3  vColor;
  varying float vGlow;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float dist = length(uv);
    if (dist > 0.5) discard;

    float core = smoothstep(0.5, 0.0, dist);
    float halo = smoothstep(0.5, 0.18, dist) * 0.55;
    float a = pow(core + halo, 1.35);

    vec3 col = vColor * vGlow;
    col = mix(col, vec3(1.0), pow(core, 6.0) * 0.7);

    gl_FragColor = vec4(col, a);
  }
`;

/* ------------------------------------------------------------------ */
/* Morphing point cloud                                                */
/* ------------------------------------------------------------------ */

function MorphingCloud() {
  const pointsRef = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const geomRef = useRef<THREE.BufferGeometry>(null);
  const dpr = useThree((s) => s.viewport.dpr);

  const shapes = useMemo(
    () => [
      makeSphere(PARTICLE_COUNT, 1.65),
      makeTorusKnot(PARTICLE_COUNT),
      makeDNAHelix(PARTICLE_COUNT),
      makeInfinityLoop(PARTICLE_COUNT),
    ],
    [],
  );

  const seeds = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) arr[i] = Math.random();
    return arr;
  }, []);

  const posA = useMemo(() => new Float32Array(shapes[0]), [shapes]);
  const posB = useMemo(() => new Float32Array(shapes[1]), [shapes]);

  const indexRef = useRef({ from: 0, to: 1 });
  const cycleClock = useRef(0);
  const mouseTarget = useRef(new THREE.Vector3(99, 99, 99));
  const mousePower = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: dpr },
      uMorph: { value: 0 },
      uMouse: { value: new THREE.Vector3(99, 99, 99) },
      uMousePower: { value: 0 },
    }),
    [dpr],
  );

  const handlePointer = (e: ThreeEvent<PointerEvent>) => {
    mouseTarget.current.set(e.point.x, e.point.y, 0);
    mousePower.current = Math.min(1, mousePower.current + 0.55);
  };

  useFrame((_state, delta) => {
    if (!matRef.current || !geomRef.current) return;

    matRef.current.uniforms.uTime.value += delta;
    cycleClock.current += delta;

    // Smoothly chase the cursor target in world space
    matRef.current.uniforms.uMouse.value.lerp(mouseTarget.current, 0.18);

    // Decay shockwave power
    mousePower.current = THREE.MathUtils.damp(mousePower.current, 0, 1.6, delta);
    matRef.current.uniforms.uMousePower.value = mousePower.current;

    // Cinematic rotation
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.07;
      pointsRef.current.rotation.x = Math.sin(cycleClock.current * 0.18) * 0.12;
    }

    const period = MORPH_HOLD + MORPH_TRANSITION;
    const tInCycle = cycleClock.current % period;

    matRef.current.uniforms.uMorph.value =
      tInCycle < MORPH_HOLD
        ? 0
        : Math.min((tInCycle - MORPH_HOLD) / MORPH_TRANSITION, 1);

    if (cycleClock.current >= period) {
      cycleClock.current -= period;
      indexRef.current.from = indexRef.current.to;
      indexRef.current.to = (indexRef.current.to + 1) % SHAPE_COUNT;

      posA.set(shapes[indexRef.current.from]);
      posB.set(shapes[indexRef.current.to]);

      const aAttr = geomRef.current.getAttribute("aPosA") as THREE.BufferAttribute;
      const bAttr = geomRef.current.getAttribute("aPosB") as THREE.BufferAttribute;
      aAttr.needsUpdate = true;
      bAttr.needsUpdate = true;
      matRef.current.uniforms.uMorph.value = 0;
    }
  });

  return (
    <>
      {/* Invisible plane that captures pointer-move across the canvas */}
      <mesh position={[0, 0, 0]} onPointerMove={handlePointer}>
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      <points ref={pointsRef} frustumCulled={false}>
        <bufferGeometry ref={geomRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[posA, 3]}
            count={PARTICLE_COUNT}
          />
          <bufferAttribute
            attach="attributes-aPosA"
            args={[posA, 3]}
            count={PARTICLE_COUNT}
          />
          <bufferAttribute
            attach="attributes-aPosB"
            args={[posB, 3]}
            count={PARTICLE_COUNT}
          />
          <bufferAttribute
            attach="attributes-aSeed"
            args={[seeds, 1]}
            count={PARTICLE_COUNT}
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
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Visibility-aware frame loop                                         */
/* ------------------------------------------------------------------ */

function VisibilityGuard() {
  const set = useThree((s) => s.set);
  useEffect(() => {
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

export default function ContactArt() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 4.4], fov: 50 }}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{ background: "transparent" }}
    >
      <VisibilityGuard />
      <MorphingCloud />
    </Canvas>
  );
}
