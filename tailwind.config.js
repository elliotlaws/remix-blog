const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  important: true,
  theme: {
    screens: {
      md: "640px",
      lg: "1024px",
      xl: "1500px", // this is the "design resolution"
    },
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      typography: (theme) => {
        return {
          DEFAULT: {
            css: [{}],
          },
          lg: {
            css: {
              code: {
                background: "none",
                padding: 0,
              },
              p: {},
              pre: {
                margin: "2em 0",
              },
              h1: {
                padding: "16px",
              },
              h2: {
                fontSize: "1.5em",
                fontWeight: "bold",
                margin: "1em 0",
              },
            },
          },
        };
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
