import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./content/**/*.{mdx,md}"
  ],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: {
        "2xl": "1280px"
      }
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-body)", ...fontFamily.sans],
        display: ["var(--font-display)", ...fontFamily.serif]
      },
      colors: {
        brand: {
          50: "#f8f5ff",
          100: "#efe9ff",
          200: "#d8cafe",
          300: "#c3acf1",
          400: "#a47cdd",
          500: "#8b5dc4",
          600: "#7449a6",
          700: "#5f3c85",
          800: "#4d306a",
          900: "#3b2550"
        }
      },
      boxShadow: {
        smooth: "0 10px 40px rgba(0,0,0,0.08)",
        elevated: "0 14px 45px rgba(0,0,0,0.14)"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;
