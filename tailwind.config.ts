import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light canvas — pure white with warm off-white surfaces
        background: "#ffffff",
        surface: "#fafaf8",
        "surface-2": "#f5f3ee",
        border: "rgba(10,10,10,0.08)",
        // Coral / magenta / violet — the signature accent spectrum
        primary: {
          DEFAULT: "#ff3d7f",
          50: "#ffe5ee",
          400: "#ff6ba0",
          500: "#ff3d7f",
          600: "#e8286b",
          700: "#c01a57",
        },
        secondary: {
          DEFAULT: "#ff6b4a",
          400: "#ff8a70",
          500: "#ff6b4a",
          600: "#e4532f",
        },
        accent: {
          DEFAULT: "#7c5cff",
          400: "#9580ff",
          500: "#7c5cff",
          600: "#5f3fe0",
        },
        muted: "rgba(10,10,10,0.48)",
        fg: "#0a0a0a",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "xs": ["0.64rem", { lineHeight: "1rem" }],
        "sm": ["0.8rem", { lineHeight: "1.25rem" }],
        "base": ["1rem", { lineHeight: "1.6rem" }],
        "lg": ["1.125rem", { lineHeight: "1.72rem" }],
        "xl": ["1.5625rem", { lineHeight: "2rem" }],
        "2xl": ["1.953rem", { lineHeight: "2.35rem" }],
        "3xl": ["2.441rem", { lineHeight: "2.75rem" }],
        "4xl": ["3.052rem", { lineHeight: "3.25rem" }],
        "5xl": ["3.815rem", { lineHeight: "4rem" }],
        "6xl": ["4.768rem", { lineHeight: "5rem" }],
        "7xl": ["5.96rem", { lineHeight: "6rem" }],
      },
      backgroundImage: {
        "gradient-brand":
          "linear-gradient(135deg, #ff6b4a 0%, #ff3d7f 50%, #7c5cff 100%)",
        "gradient-brand-soft":
          "linear-gradient(135deg, rgba(255,107,74,0.18) 0%, rgba(255,61,127,0.18) 50%, rgba(124,92,255,0.18) 100%)",
        "gradient-radial":
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,61,127,0.22), transparent 65%)",
        "noise":
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        glow: "0 8px 32px rgba(255,61,127,0.22), 0 2px 6px rgba(255,61,127,0.18)",
        "glow-lg": "0 16px 56px rgba(255,61,127,0.28), 0 4px 10px rgba(255,61,127,0.22)",
        "glow-cyan": "0 8px 32px rgba(124,92,255,0.22)",
        "glow-amber": "0 8px 32px rgba(255,107,74,0.22)",
        "inner-glow": "inset 0 1px 0 0 rgba(255,255,255,0.6)",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "float-slow": {
          "0%,100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-18px,0)" },
        },
        "gradient-x": {
          "0%,100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        "gradient-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "pulse-dot": {
          "0%,100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(1.3)" },
        },
        "bounce-slow": {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        marquee: {
          "0%": { transform: "translate3d(0,0,0)" },
          "100%": { transform: "translate3d(-50%,0,0)" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 9s ease-in-out infinite",
        "gradient-x": "gradient-x 8s ease infinite",
        "gradient-spin": "gradient-spin 14s linear infinite",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        "bounce-slow": "bounce-slow 2.5s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        marquee: "marquee 40s linear infinite",
        "marquee-slow": "marquee 70s linear infinite",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
        "in-out-quad": "cubic-bezier(0.45, 0, 0.55, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
