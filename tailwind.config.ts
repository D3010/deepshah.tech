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
        background: "#030a14",
        surface: "#071422",
        "surface-2": "#0c1e2f",
        border: "rgba(255,255,255,0.08)",
        primary: {
          DEFAULT: "#10b981",
          50: "#ecfdf5",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
        },
        secondary: {
          DEFAULT: "#f43f5e",
          400: "#fb7185",
          500: "#f43f5e",
          600: "#e11d48",
        },
        accent: {
          DEFAULT: "#f59e0b",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
        },
        muted: "#93a1b8",
        fg: "#f1f5f9",
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
        "gradient-brand":
          "linear-gradient(120deg, #10b981 0%, #f43f5e 55%, #fbbf24 100%)",
        "gradient-brand-soft":
          "linear-gradient(120deg, rgba(16,185,129,0.15) 0%, rgba(244,63,94,0.15) 55%, rgba(251,191,36,0.15) 100%)",
        "gradient-radial":
          "radial-gradient(circle at 50% 0%, rgba(16,185,129,0.22), transparent 60%)",
        "noise":
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(16,185,129,0.55)",
        "glow-lg": "0 0 90px -10px rgba(244,63,94,0.55)",
        "glow-cyan": "0 0 40px -10px rgba(244,63,94,0.5)",
        "glow-amber": "0 0 40px -10px rgba(251,191,36,0.5)",
        "inner-glow": "inset 0 1px 0 0 rgba(255,255,255,0.06)",
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
        aurora: {
          "0%,100%": {
            transform: "translate3d(-6%, -4%, 0) scale(1)",
            opacity: "0.55",
          },
          "50%": {
            transform: "translate3d(6%, 6%, 0) scale(1.15)",
            opacity: "0.8",
          },
        },
        "aurora-alt": {
          "0%,100%": {
            transform: "translate3d(6%, 4%, 0) scale(1.1)",
            opacity: "0.5",
          },
          "50%": {
            transform: "translate3d(-5%, -6%, 0) scale(0.95)",
            opacity: "0.75",
          },
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
        "gradient-spin": "gradient-spin 8s linear infinite",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        "bounce-slow": "bounce-slow 2.5s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        aurora: "aurora 18s ease-in-out infinite",
        "aurora-alt": "aurora-alt 22s ease-in-out infinite",
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
