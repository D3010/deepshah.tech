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
        // Antigravity — warm near-black canvas
        background: "#0a0807",
        surface: "#141009",
        "surface-2": "#1c160d",
        border: "rgba(247,230,196,0.08)",
        // Primary = liquid gold
        primary: {
          DEFAULT: "#e8b55a",
          50: "#fbf3dc",
          400: "#f0c876",
          500: "#e8b55a",
          600: "#d4a145",
          700: "#b78435",
        },
        // Secondary = rose gold / peach
        secondary: {
          DEFAULT: "#e8a384",
          400: "#f1b89d",
          500: "#e8a384",
          600: "#d98468",
        },
        // Accent = warm cream highlight
        accent: {
          DEFAULT: "#f7e6c4",
          400: "#fbefd5",
          500: "#f7e6c4",
          600: "#e8d3a3",
        },
        // Copper ember
        ember: {
          DEFAULT: "#c9873f",
          400: "#d89a55",
          500: "#c9873f",
          600: "#a66b2d",
        },
        muted: "#9e8f7a",
        fg: "#f5ead1",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-space-grotesk)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
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
        // Cream → gold → copper — the Antigravity signature
        "gradient-brand":
          "linear-gradient(120deg, #f7e6c4 0%, #e8b55a 45%, #c9873f 100%)",
        "gradient-brand-soft":
          "linear-gradient(120deg, rgba(247,230,196,0.18) 0%, rgba(232,181,90,0.18) 45%, rgba(201,135,63,0.18) 100%)",
        "gradient-radial":
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(232,181,90,0.28), transparent 65%)",
        "noise":
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        glow: "0 0 50px -10px rgba(232,181,90,0.55)",
        "glow-lg": "0 0 100px -10px rgba(232,181,90,0.65)",
        "glow-cyan": "0 0 40px -10px rgba(232,163,132,0.5)",
        "glow-amber": "0 0 60px -10px rgba(247,230,196,0.55)",
        "inner-glow": "inset 0 1px 0 0 rgba(247,230,196,0.08)",
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
        // Slower, dreamier aurora — matches antigravity's meditative feel
        aurora: {
          "0%,100%": {
            transform: "translate3d(-4%, -3%, 0) scale(1)",
            opacity: "0.55",
          },
          "50%": {
            transform: "translate3d(4%, 4%, 0) scale(1.1)",
            opacity: "0.85",
          },
        },
        "aurora-alt": {
          "0%,100%": {
            transform: "translate3d(5%, 3%, 0) scale(1.08)",
            opacity: "0.5",
          },
          "50%": {
            transform: "translate3d(-4%, -5%, 0) scale(0.96)",
            opacity: "0.78",
          },
        },
        // Breathing orb — soft pulse
        "orb-breathe": {
          "0%,100%": { transform: "scale(1)", opacity: "0.85" },
          "50%": { transform: "scale(1.06)", opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translate3d(0,0,0)" },
          "100%": { transform: "translate3d(-50%,0,0)" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(var(--r,180px)) rotate(0deg)" },
          "100%": {
            transform: "rotate(360deg) translateX(var(--r,180px)) rotate(-360deg)",
          },
        },
        "orbit-reverse": {
          "0%": { transform: "rotate(0deg) translateX(var(--r,180px)) rotate(0deg)" },
          "100%": {
            transform: "rotate(-360deg) translateX(var(--r,180px)) rotate(360deg)",
          },
        },
        "text-slide": {
          "0%,18%": { transform: "translateY(0em)" },
          "22%,43%": { transform: "translateY(-1.4em)" },
          "47%,68%": { transform: "translateY(-2.8em)" },
          "72%,93%": { transform: "translateY(-4.2em)" },
          "97%,100%": { transform: "translateY(-5.6em)" },
        },
        sheen: {
          "0%": { transform: "translateX(-120%) skewX(-20deg)" },
          "100%": { transform: "translateX(220%) skewX(-20deg)" },
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
        aurora: "aurora 24s ease-in-out infinite",
        "aurora-alt": "aurora-alt 30s ease-in-out infinite",
        "orb-breathe": "orb-breathe 7s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
        "marquee-slow": "marquee 70s linear infinite",
        orbit: "orbit 28s linear infinite",
        "orbit-reverse": "orbit-reverse 34s linear infinite",
        "text-slide": "text-slide 12s cubic-bezier(0.83, 0, 0.17, 1) infinite",
        sheen: "sheen 3.2s ease-in-out infinite",
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
