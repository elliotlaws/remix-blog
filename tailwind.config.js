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
              h2: {
                fontSize: "1.75rem",
                fontWeight: "normal",
              },
              pre: {
                borderRadius: "0.5rem",
              },
            },
          },
          light: {
            css: [
              {
                color: theme("colors.zinc.600"),
                "h1, h2, h3, h4, h5, h6": {
                  color: theme("colors.zinc.800"),
                },
                code: {
                  color: theme("colors.zinc.800"),
                },
              },
            ],
          },
          dark: {
            css: [
              {
                color: theme("colors.zinc.400"),
                "h1, h2, h3, h4, h5, h6": {
                  color: theme("colors.zinc.100"),
                },
                "strong, a": {
                  color: theme("colors.zinc.600"),
                },
                code: {
                  color: theme("colors.zinc.100"),
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
  ],
};
