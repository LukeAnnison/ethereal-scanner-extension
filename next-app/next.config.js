const path = require('path');

module.exports = (phase, { defaultConfig }) => {
  return {
    ...defaultConfig,
    reactStrictMode: true,

    webpack: (config) => {
      (config.resolve = {
        ...config.resolve,
        extensions: [".tsx", ".ts", ".js"],
        fallback: {
          fs: false,
          path: false,
          os: false,
        },
      }),
        (config.entry = {
          popup: "./next-app/pages/index.tsx",
        //   background: "./src/background/index.tsx",
        //   content: "./src/content/index.tsx",
        }),
        (config.mode = "development"),
        (config.module = {
          rules: [
            {
              use: "ts-loader",
              test: /\.tsx?$/,
              exclude: /node_modules/,
            },
          ],
        }),
        (config.output = {
          filename: "bundle.js",
          path: path.resolve(__dirname, "dist"),
        });
      return config;
    },
  };
};
