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
        background: "#0a0a0f",
        surface: "#111118",
        "surface-2": "#16161f",
        border: "rgba(255,255,255,0.08)",
        primary: {
          DEFAULT: "#6366f1",
          50: "#eef2ff",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
        },
        secondary: {
          DEFAULT: "#06b6d4",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
        },
        muted: "#94a3b8",
        fg: "#f8fafc",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-space-grotesk)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Modular scale 1.25
        "xs": ["0.64rem", { lineHeight: "1rem" }],
        "sm": ["0.8rem", { lineHeight: "1.25rem" }],
        "base": ["1rem", { lineHeight: "1.6rem" }],
        "lg": ["1.25rem", { lineHeight: "1.875rem" }],
        "xl": ["1.5625rem", { lineHeight: "2rem" }],
        "2xl": ["1.953rem", { lineHeight: "2.35rem" }],
        "3xl": ["2.441rem", { lineHeight: "2.75rem" }],
        "4xl": ["3.052rem", { lineHeight: "3.25rem" }],
        "5xl": ["3.815rem", { lineHeight: "4rem" }],
        "6xl": ["4.768rem", { lineHeight: "5rem" }],
        "7xl": ["5.96rem", { lineHeight: "6rem" }],
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)",
        "gradient-brand-soft":
          "linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(6,182,212,0.15) 100%)",
        "gradient-radial":
          "radial-gradient(circle at 50% 0%, rgba(99,102,241,0.15), transparent 60%)",
        "noise":
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(99,102,241,0.35)",
        "glow-lg": "0 0 80px -10px rgba(99,102,241,0.45)",
        "glow-cyan": "0 0 40px -10px rgba(6,182,212,0.35)",
        "inner-glow": "inset 0 1px 0 0 rgba(255,255,255,0.05)",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
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
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "gradient-x": "gradient-x 8s ease infinite",
        "gradient-spin": "gradient-spin 8s linear infinite",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        "bounce-slow": "bounce-slow 2.5s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
