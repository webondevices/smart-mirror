const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const devMode = process.env.NODE_ENV !== "production";
const SRC_DIR = __dirname + "/src";
const DIST_DIR = __dirname + "/dist";

module.exports = () => {
  return {
    entry: [SRC_DIR + "/application/index.jsx"],
    output: {
      path: DIST_DIR,
      publicPath: "/",
      filename: "bundle.js",
    },
    devServer: {
      contentBase: DIST_DIR,
      hot: true,
      port: 9000,
      historyApiFallback: true,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.(css)$/,
          exclude: /node_modules/,
          loaders: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: true,
                sourceMap: true,
                importLoaders: 1,
                localIdentName: "[local]___[hash:base64:5]",
              },
            },
          ],
        },
        {
          test: /\.(html)$/,
          exclude: /node_modules/,
          use: {
            loader: "html-loader",
            options: { minimize: true },
          },
        },
        {
          test: /\.(jpe?g|png|gif|svg|otf|mp4)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                esModule: false,
              },
            },
          ],
        },
      ],
    },
    node: {
      fs: "empty",
    },
    resolve: {
      extensions: ["*", ".js", ".jsx"],
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: SRC_DIR + "/index.html",
        filename: "./index.html",
      }),
      new MiniCssExtractPlugin({
        filename: devMode ? "[name].css" : "[name].[hash].css",
        chunkFilename: devMode ? "[id].css" : "[id].[hash].css",
      }),
      new CopyPlugin({
        patterns: [{ from: SRC_DIR + "/faceid/**/*", to: DIST_DIR }],
      }),
    ],
  };
};
