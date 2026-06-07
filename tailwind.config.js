/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#120f0d",
        smoke: "#f5efe8",
        ember: "#a86a2d",
        bronze: "#d8a66d",
        sand: "#e9dccf",
      },
      boxShadow: {
        haze: "0 30px 90px rgba(18, 15, 13, 0.18)",
      },
      backgroundImage: {
        mesh: "radial-gradient(circle at top left, rgba(216, 166, 109, 0.32), transparent 26%), radial-gradient(circle at 80% 14%, rgba(109, 134, 167, 0.18), transparent 24%), linear-gradient(180deg, #16110e 0%, #120f0d 42%, #0d0a08 100%)",
      },
      fontFamily: {
        display: [
          "var(--font-space-grotesk)",
          "sans-serif"
        ],
        body: [
          "var(--font-manrope)",
          "sans-serif"
        ],
      },
    },
  },
  plugins: [],
};
