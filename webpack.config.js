const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const rootFolder = path.resolve(__dirname, "frontend");

module.exports = {
  entry: "./frontend/src/index.js",
  output: {
    path: path.resolve(rootFolder, "dist"),
    filename: "main.js",
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(rootFolder, "public", "index.html"),
      filename: "index.html",
    }),
  ],
  devServer: {
    static: {
      directory: path.join(rootFolder, "public"),
    },
    compress: true,
    port: 9000,
  },
};
