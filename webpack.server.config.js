const path = require("path");
const nodeExternals = require("webpack-node-externals");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  mode: isDevelopment ? "development" : "production",
  entry: "./server/server.ts",
  target: "node",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "server.bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.jsx?|tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
    ],
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", "json"],
  },
};
