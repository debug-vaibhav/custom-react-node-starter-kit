const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");
const fs = require("fs");
const CopyWebpackPlugin = require("copy-webpack-plugin");

var SRC_DIR = path.resolve(__dirname, "src");
var DIST_DIR = path.resolve(__dirname, "dist");

module.exports = (env) => {
  const currentPath = path.join(__dirname);
  const basePath = `${currentPath}/.env`;
  const envPath = `${basePath}.${env.ENVIRONMENT}`;
  const finalPath = fs.existsSync(envPath) ? envPath : basePath;
  const fileEnv = dotenv.config({ path: finalPath }).parsed;
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});
  return {
    entry: SRC_DIR + "/index.js",
    output: {
      path: DIST_DIR,
      filename: "bundle.js",
    },
    devtool: "inline-source-map",
    devServer: {
      contentBase: DIST_DIR,
      compress: true,
      port: 8085,
      hot: true,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        },
        {
          test: /\.(scss)$/,
          exclude: /styles\\common/,
          use: [
            {
              loader: "style-loader", // inject CSS to page
            },
            {
              loader: "css-loader",
              options: {
                modules: {
                  // sourceMap: true,
                  // importLoaders: 1,
                  localIdentName: "[path][name]__[local]--[hash:base64:5]",
                },
              }, // translates CSS into CommonJS modules
            },
            {
              loader: "postcss-loader", // Run post css actions
              options: {
                plugins: function () {
                  // post css plugins, can be exported to postcss.config.js
                  return [require("precss"), require("autoprefixer")];
                },
              },
            },
            {
              loader: "sass-loader", // compiles Sass to CSS
            },
          ],
        },
        {
          test: /\.(scss)$/,
          include: /styles\\common/,
          use: [
            {
              loader: "style-loader", // inject CSS to page
            },
            {
              loader: "css-loader",
            },
            {
              loader: "postcss-loader", // Run post css actions
              options: {
                plugins: function () {
                  // post css plugins, can be exported to postcss.config.js
                  return [require("precss"), require("autoprefixer")];
                },
              },
            },
            {
              loader: "sass-loader", // compiles Sass to CSS
            },
          ],
        },
        {
          test: /\.css$/,
          exclude: /(node_modules|styles\\common)/,
          // exclude: /node_modules/,
          use: [
            {
              loader: "style-loader",
            },
            {
              loader: "css-loader",
              options: {
                modules: {
                  // importLoaders: 1,
                  localIdentName: "[path][name]__[local]--[hash:base64:5]",
                },
              },
            },
          ],
        },
        {
          test: /\.css$/,
          include: /(node_modules|styles\\common)/,
          use: [
            {
              loader: "style-loader",
            },
            {
              loader: "css-loader",
            },
          ],
        },
        {
          test: /\.(png|svg|jpg|gif|OTF)$/,
          use: ["file-loader"],
        },
        {
          test: /\.(html)$/,
          use: {
            loader: "html-loader",
            options: {
              attrs: [":data-src"],
            },
          },
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 8062,
              },
            },
          ],
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: "svg-url-loader",
              options: {
                limit: 10000,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin(envKeys),
      new CopyWebpackPlugin(
        [
          { from: "src/index.html", to: "index.html", toType: "file" },
          { from: "src/assets", to: "assets" },
        ],
        {
          copyUnmodified: false,
        }
      ),
    ],
  };
};
