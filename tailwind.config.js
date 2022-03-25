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
        sans: ["DM Sans"],
      },
      typography: (theme) => {
        // some fontSizes return [size, props], others just size :/
        const fontSize = (size) => {
          const result = theme(`fontSize.${size}`);
          return Array.isArray(result) ? result[0] : result;
        };

        return {
          DEFAULT: {
            css: [
              {
                "> *": {
                  marginLeft: "1rem",
                  marginRight: "1rem",
                },
                p: {
                  fontSize: fontSize("lg"),
                },
                ul: {
                  fontSize: fontSize("lg"),
                },
                pre: {
                  borderRadius: "0%",
                },
                code: {
                  padding: "2em 1em",
                  fontSize: "1em",
                },
              },
            ],
          },
          lg: {
            css: {
              "> *": {
                marginLeft: "2rem",
                marginRight: "2rem",
              },
              code: {
                background: "none",
                padding: 0,
                fontSize: "1em",
              },
              pre: {
                margin: "2em 0",
                borderRadius: "0.5rem",
              },
              h2: {
                fontSize: "1.5em",
                fontWeight: "bold",
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
