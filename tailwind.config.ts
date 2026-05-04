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
        // Dark canvas
        background: "#08080a",
        surface: "#0f0f12",
        "surface-2": "#16161a",
        border: "rgba(255,255,255,0.08)",
        // Brand spectrum: coral → pink → magenta → violet
        primary: {
          DEFAULT: "#ff3d8a",
          50: "#ffe5ee",
          400: "#ff6ba6",
          500: "#ff3d8a",
          600: "#e8286f",
          700: "#c01a57",
        },
        secondary: {
          DEFAULT: "#ff6b6b",
          400: "#ff8a8a",
          500: "#ff6b6b",
          600: "#e44d4d",
        },
        accent: {
          DEFAULT: "#8b5cf6",
          400: "#a684ff",
          500: "#8b5cf6",
          600: "#7341e0",
        },
        magenta: {
          DEFAULT: "#d946ef",
          500: "#d946ef",
          600: "#b829cc",
        },
        muted: "rgba(250,250,250,0.40)",
        fg: "#fafafa",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1.0625rem", { lineHeight: "1.6" }],
        lg: ["1.125rem", { lineHeight: "1.7" }],
        xl: ["1.5rem", { lineHeight: "1.4" }],
        "2xl": ["1.875rem", { lineHeight: "1.3" }],
        "3xl": ["2.25rem", { lineHeight: "1.2" }],
        "4xl": ["3rem", { lineHeight: "1.1" }],
        "5xl": ["3.75rem", { lineHeight: "1.05" }],
        "6xl": ["4.5rem", { lineHeight: "1" }],
        "7xl": ["6rem", { lineHeight: "0.95" }],
      },
      backgroundImage: {
        "gradient-brand":
          "linear-gradient(120deg, #ff6b6b 0%, #ff3d8a 45%, #d946ef 100%)",
        "gradient-brand-soft":
          "linear-gradient(120deg, rgba(255,107,107,0.18) 0%, rgba(255,61,138,0.18) 45%, rgba(217,70,239,0.18) 100%)",
        "gradient-radial":
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,61,138,0.22), transparent 65%)",
        "gradient-glow":
          "radial-gradient(circle, rgba(255,61,138,0.25) 0%, transparent 70%)",
        noise:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        glow: "0 8px 32px rgba(255,61,138,0.40)",
        "glow-lg": "0 12px 48px rgba(255,61,138,0.50)",
        "glow-violet": "0 8px 32px rgba(139,92,246,0.32)",
        "glow-coral": "0 8px 32px rgba(255,107,107,0.32)",
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
        "scroll-cue": {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "20%": { opacity: "1" },
          "80%": { opacity: "1" },
          "100%": { transform: "translateY(120%)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        marquee: {
          "0%": { transform: "translate3d(0,0,0)" },
          "100%": { transform: "translate3d(-50%,0,0)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translate3d(-50%,0,0)" },
          "100%": { transform: "translate3d(0,0,0)" },
        },
        "ambient-drift": {
          "0%,100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(-32px,40px,0)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 9s ease-in-out infinite",
        "gradient-x": "gradient-x 8s ease infinite",
        "gradient-spin": "gradient-spin 14s linear infinite",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        "scroll-cue": "scroll-cue 1.6s cubic-bezier(0.22, 1, 0.36, 1) infinite",
        shimmer: "shimmer 2.5s linear infinite",
        marquee: "marquee 30s linear infinite",
        "marquee-reverse": "marquee-reverse 40s linear infinite",
        "ambient-drift": "ambient-drift 20s ease-in-out infinite",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.22, 1, 0.36, 1)",
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
        "in-out-quad": "cubic-bezier(0.45, 0, 0.55, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
