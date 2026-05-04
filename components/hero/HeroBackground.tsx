/**
 * Ambient pink + violet glows that sit behind the orb canvas.
 * Pure CSS — cheap, GPU-friendly.
 */
export function HeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Massive offset pink glow — slow drift */}
      <div
        className="absolute left-1/2 top-1/2 h-[120vh] w-[120vw] -translate-x-1/2 -translate-y-1/2 animate-ambient-drift"
        style={{
          background:
            "radial-gradient(circle at 42% 48%, rgba(255,61,138,0.22), transparent 60%)",
          filter: "blur(80px)",
          opacity: 0.7,
        }}
      />
      {/* Violet companion */}
      <div
        className="absolute left-1/2 top-1/2 h-[100vh] w-[100vw] -translate-x-1/2 -translate-y-1/2 animate-float-slow"
        style={{
          background:
            "radial-gradient(circle at 60% 55%, rgba(139,92,246,0.18), transparent 65%)",
          filter: "blur(100px)",
          opacity: 0.6,
        }}
      />
      {/* Tight central bloom directly behind the orb */}
      <div
        className="absolute left-1/2 top-1/2 h-[55vh] w-[55vh] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,61,138,0.25) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      {/* Top-down vignette for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(8,8,10,0.6), transparent 60%)",
        }}
      />
    </div>
  );
}
