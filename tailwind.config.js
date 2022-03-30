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
              },
            ],
          },
          lg: {
            css: {
              "> *": {
                marginLeft: "2rem",
                marginRight: "2rem",
              },
              h2: {
                fontSize: "1.5em",
                fontWeight: "bold",
              },
              pre: {
                borderRadius: "0.5rem",
              },
            },
          },
          light: {
            css: [
              {
                color: "#3a3d4a",
                "h1, h2, h3, h4, h5, h6": {
                  color: "#111827",
                },
                code: {
                  color: "#111827",
                },
              },
            ],
          },
          dark: {
            css: [
              {
                color: "#A1A1AA",
                "h1, h2, h3, h4, h5, h6": {
                  color: "#F1F1F1",
                },
                code: {
                  color: "#F1F1F1",
                },
              },
            ],
          },
        };
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    require("tailwind-scrollbar"),
  ],
};
