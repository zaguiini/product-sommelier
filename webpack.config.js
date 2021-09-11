const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const rootFolder = path.resolve(__dirname, "frontend");

module.exports = {
  entry: "./frontend/src/index.js",
  output: {
    path: path.resolve(rootFolder, "dist"),
    filename: "main.js",
    clean: true,
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(rootFolder, "public", "index.html"),
      filename: "index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s?css$/i,
        include: path.resolve(rootFolder, "src"),
        use: [
          process.env.NODE_ENV === "production"
            ? MiniCssExtractPlugin.loader
            : "style-loader",
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(rootFolder, "public"),
    },
    compress: true,
    port: 9000,
  },
};
