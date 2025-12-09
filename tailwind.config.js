/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./content/**/*.{md}", 
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
