/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0b1d2a",
        sand: "#f4ecdf",
        paper: "#fbf7f0",
        sea: { DEFAULT: "#06b6d4", deep: "#0e7490" },
        coral: "#ff6b4a",
        dusk: "#7079ca",
      },
      fontFamily: {
        display: ['"Syne"', "system-ui", "sans-serif"],
        body: ['"Figtree"', "system-ui", "sans-serif"],
        mono: ['"DM Mono"', "ui-monospace", "monospace"],
        hand: ['"Caveat"', "cursive"],
      },
    },
  },
  plugins: [],
};
