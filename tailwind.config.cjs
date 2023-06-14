/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,vue,js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#E6F1EC",
          200: "#B8DBBF",
          300: "#8AC59F",
          400: "#5DBB85",
          500: "#3AAE6F",
          600: "#2D8E5A",
          700: "#1F6E45",
          800: "#114F30",
          900: "#08301C",
        },
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