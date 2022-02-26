module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    screens: {
      md: "640px",
      lg: "1024px",
      xl: "1500px", // this is the "design resolution"
    },
    extend: {
      typography: {
        lg: {
          css: {
            code: {
              background: "none",
            },
            p: {
              margin: ".8em 0",
            },
            pre: {
              margin: "1.5em 0",
            },
            h2: {
              fontSize: "1.5em",
              fontWeight: "bold",
              margin: "1em 0",
            },
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
