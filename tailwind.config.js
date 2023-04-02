/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./dist/*.{html,js}",
    "./src/*.html",
    "./src/scripts/*.js",
    "./src/scripts/components/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    {
      tailwindcss: {},
      autoprefixer: {},
    },
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".flip-card": {
          transform: "rotateY(180deg)",
        },

        ".preserve-3d": {
          transformStyle: "preserve-3d",
        },
        ".perspective": {
          perspective: "1000px",
        },
        ".backface-hidden": {
          backfaceVisibility: "hidden",
        },
      });
    }),
  ],
};
