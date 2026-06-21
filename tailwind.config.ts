import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark theme base colors - Softer, easier on the eyes
        background: "#0f0f12",
        surface: "#18181c",
        "surface-hover": "#222228",
        border: "#2e2e35",

        // Text colors - Reduced contrast for comfort
        "text-primary": "#e8e8ed",
        "text-secondary": "#9898a3",
        "text-muted": "#94949e",

        // Pattern category accent colors
        creational: "#22d3ee", // Cyan
        structural: "#a78bfa", // Purple
        behavioral: "#4ade80", // Green
        accent: "#fb923c",     // Orange for highlights
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Consolas", "monospace"],
      },
      animation: {
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.5s ease-out",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
