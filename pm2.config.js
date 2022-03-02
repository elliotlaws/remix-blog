module.exports = {
  apps: [
    {
      name: "Remix",
      script: "remix watch",
      autorestart: false,
      ignore_watch: ["."],
      env: {
        NODE_ENV: "development",
      },
    },
    {
      name: "Postcss",
      script: "postcss styles/**/*.css --base styles --dir app/styles",
      autorestart: false,
      watch: [
        "./tailwind.config.js",
        "./app/**/*.ts",
        "./app/**/*.tsx",
        "./styles/**/*.css",
      ],
      env: {
        NODE_ENV: process.env.NODE_ENV || "development",
      },
    },
    {
      name: "Wrangler",
      script: "wrangler pages dev ./public --watch  --kv BLOG ./build",
      ignore_watch: ["."],
      env: {
        NODE_ENV: process.env.NODE_ENV || "development",
      },
    },
    {
      name: "Content",
      script: "npm run content:watch",
      ignore_watch: ["."],
      env: {
        NODE_ENV: "development",
      },
    },
  ],
};
