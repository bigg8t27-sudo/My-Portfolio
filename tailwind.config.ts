import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      colors: {
        bg: "#000000",
        midnight: "#0a0a1a",
        navy: "#0d0d2e",
        "electric-blue": "#3b82f6",
        purple: "#8b5cf6",
        cyan: "#06b6d4",
      },
      animation: {
        "float": "float 4s ease-in-out infinite",
        "float-slow": "float 6s ease-in-out infinite",
        "float-fast": "float 3s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "scroll-bounce": "scrollBounce 1.5s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        scrollBounce: {
          "0%, 100%": { transform: "translateY(0px)", opacity: "1" },
          "50%": { transform: "translateY(6px)", opacity: "0.5" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

