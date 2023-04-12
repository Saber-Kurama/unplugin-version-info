// const MyExampleWebpackPlugin = require("../../src/index.js");
import HtmlWebpackPlugin from "html-webpack-plugin";
import Unplugin from "../../src/webpack";

export default {
  mode: "development",
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
    Unplugin(),
  ],
  resolve: {
    extensions: [".ts"],
  },
};
