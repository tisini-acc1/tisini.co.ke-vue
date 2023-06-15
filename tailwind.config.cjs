/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,vue,js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        primary: {
          lightest: "#8AB6D6",
          lighter: "#418FB9",
          DEFAULT: "#05233D",
          darker: "#031B29",
          darkest: "#010E15"
        },
        secondary: {
          lightest: "#FFE7AA",
          lighter: "#FFD166",
          DEFAULT: "#EF6F00",
          darker: "#BF5400",
          darkest: "#8F3F00"
        },
        light: {
          DEFAULT: "#FDFDFD",
          darker: "#F1F1F1"
        },
        black: {
          lighter: "#1C1C1C",
          DEFAULT: "#121212"
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        rubik: ["Rubik", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        "system-ui": ["system-ui", "sans-serif"],
        Asset: ["Asset", "cursive", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        "Rubik-Mono-One": ["Rubik Mono One", "sans-serif"],
        rubik: ["Rubik", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};