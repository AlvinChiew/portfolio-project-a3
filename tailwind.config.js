/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        a3Navy: "#061931",
        a3Accent: "#61e692",
      },
    },
    colors: {
      ...colors,
      primary: colors.blue,
      secondary: colors.green,
      backdrop: "#121212",
      secondaryBackdrop: "#181818",
      borderline: "#33353F",
      secondaryText: "#ADB7BE",
      formInput: "#18191E",
      formPlaceholder: "#9CA2A9",
    },
  },
  plugins: [],
};
