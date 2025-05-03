import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        background: {
          DEFAULT: "var(--background)",
          light: "#FFFFFF",
          dark: "#0A0A0A",
        },
        foreground: {
          DEFAULT: "var(--foreground)",
          light: "#0A0A0A",
          dark: "#FFFFFF",
        },
        primary: {
          DEFAULT: "var(--primary)",
          dark: "#00D68A",
          light: "#00FFB9",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          dark: "#9900CC",
          light: "#D200FF",
        },
        accent: {
          DEFAULT: "var(--accent)",
          dark: "#0099CC",
          light: "#33D6FF",
        },
        border: "var(--border)",
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        float: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        glow: {
          '0%': {
            boxShadow: '0 0 5px rgba(0, 245, 160, 0.3), 0 0 10px rgba(0, 245, 160, 0.2)',
          },
          '100%': {
            boxShadow: '0 0 10px rgba(0, 245, 160, 0.5), 0 0 20px rgba(0, 245, 160, 0.3)',
          }
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 1.5s ease-in-out infinite alternate',
        fadeInUp: 'fadeInUp 0.5s ease-out',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': 'linear-gradient(135deg, rgba(0, 245, 160, 0.15) 0%, rgba(189, 0, 255, 0.15) 100%)',
      },
      boxShadow: {
        'neon': '0 0 10px rgba(0, 245, 160, 0.5), 0 0 20px rgba(0, 245, 160, 0.3)',
        'neon-purple': '0 0 10px rgba(189, 0, 255, 0.5), 0 0 20px rgba(189, 0, 255, 0.3)',
        'neon-blue': '0 0 10px rgba(0, 191, 255, 0.5), 0 0 20px rgba(0, 191, 255, 0.3)',
      },
    },
  },
  plugins: [],
};

export default config; 