const defaultTheme = require("tailwindcss/defaultTheme");
const path = require("path");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,mdx,ts,tsx}", "./index.html"],
  theme: {
    fontSize: {
      xs: ["0.75rem", { lineHeight: "1rem" }],
      sm: ["0.875rem", { lineHeight: "1.5rem" }],
      base: ["1rem", { lineHeight: "1.75rem" }],
      lg: ["1.125rem", { lineHeight: "1.75rem" }],
      xl: ["1.25rem", { lineHeight: "2rem" }],
      "2xl": ["1.5rem", { lineHeight: "2.25rem" }],
      "3xl": ["1.75rem", { lineHeight: "2.25rem" }],
      "4xl": ["2rem", { lineHeight: "2.5rem" }],
      "5xl": ["2.5rem", { lineHeight: "3rem" }],
      "6xl": ["3rem", { lineHeight: "3.5rem" }],
      "7xl": ["4rem", { lineHeight: "4.5rem" }],
    },
    extend: {
      backgroundImage: {
        topography: `url('${path.resolve(
          __dirname,
          "./src/assets/topography.svg"
        )}')`,
        hexagons: `url('${path.resolve(
          __dirname,
          "./src/assets/hexagons.svg"
        )}')`,
      },
      colors: {
        gresini: {
          base: "#9baee4",
          100: "#9eb1e5",
          200: "#a2b3e6",
          300: "#a5b6e7",
          400: "#a8b9e8",
          500: "#acbce9",
          600: "#afbee9",
          700: "#b2c1ea",
          800: "#b6c4eb",
          900: "#b9c6ec",
        },
        ducati: {
          base: "#d40000",
          100: "#d50909",
          200: "#d71111",
          300: "#d81919",
          400: "#da2222",
          500: "#db2b2b",
          600: "#dd3333",
          700: "#de3c3c",
          800: "#df4444",
          900: "#e14d4d",
        },
        ocean: {
          base: "#022135",
          100: "#0a283c",
          200: "#133042",
          300: "#1b3749",
          400: "#243f50",
          500: "#2c4657",
          600: "#354d5d",
          700: "#3d5564",
          800: "#455c6b",
          900: "#4e6472",
        },
        sun: {
          base: "#f8ffe5",
          100: "#f8ffe6",
          200: "#f8ffe7",
          300: "#f9ffe8",
          400: "#f9ffe8",
          500: "#f9ffe9",
          600: "#f9ffea",
          700: "#faffeb",
          800: "#faffec",
          900: "#faffed",
        },
        mint: {
          base: "#d7fdec",
          100: "#d8fded",
          200: "#dafded",
          300: "#dbfdee",
          400: "#dcfdef",
          500: "#defdef",
          600: "#dffdf0",
          700: "#e0fdf0",
          800: "#e2fef1",
          900: "#e3fef2",
        },
      },

      borderRadius: {
        "4xl": "2.5rem",
      },
      fontFamily: {
        sans: ["Mona Sans", ...defaultTheme.fontFamily.sans],
        display: [
          ["Mona Sans", ...defaultTheme.fontFamily.sans],
          { fontVariationSettings: '"wdth" 125' },
        ],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
