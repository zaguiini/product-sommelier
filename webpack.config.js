const path = require("path");

const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const rootFolder = path.resolve(__dirname, "frontend");

module.exports = {
  entry: {
    main: "./frontend/src/index.js",
  },
  output: {
    path: path.resolve(rootFolder, "dist"),
    filename: "[name].bundle.js",
    chunkFilename: "[id].bundle_[chunkhash].js",
    clean: true,
  },
  plugins: [
    new Dotenv({
      file: ".env",
    }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(rootFolder, "public", "index.html"),
      filename: "index.html",
      chunks: ["main"],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node-modules/,
        use: {
          loader: "babel-loader",
        },
      },
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
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  devServer: {
    static: {
      directory: path.join(rootFolder, "public"),
    },
    compress: true,
    port: process.env.FRONTEND_PORT,
    historyApiFallback: {
      main: "index.html",
      disableDotRule: true,
    },
  },
};
