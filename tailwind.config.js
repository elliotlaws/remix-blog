module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    container: {
      center: true,
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
