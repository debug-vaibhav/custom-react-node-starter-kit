const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

var SRC_DIR = path.resolve(__dirname, "src");
var DIST_DIR = path.resolve(__dirname, "dist");

module.exports = {
  entry: SRC_DIR + "/app/index.js",
  output: {
    path: DIST_DIR,
    filename: "bundle.js"
    //publicPath : '/'
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8080
    // hot: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
          // options: {
          //   presets: ["react", "es2015", "stage-2"]
          // }
        }
      },
      {
        test: /\.(scss)$/,
        exclude: /styles\\common/,
        use: [
          {
            loader: "style-loader" // inject CSS to page
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                // sourceMap: true,
                // importLoaders: 1,
                localIdentName: "[path][name]__[local]--[hash:base64:5]"
              }
            } // translates CSS into CommonJS modules
          },
          {
            loader: "postcss-loader", // Run post css actions
            options: {
              plugins: function() {
                // post css plugins, can be exported to postcss.config.js
                return [require("precss"), require("autoprefixer")];
              }
            }
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      },
      {
        test: /\.(scss)$/,
        include: /styles\\common/,
        use: [
          {
            loader: "style-loader" // inject CSS to page
          },
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader", // Run post css actions
            options: {
              plugins: function() {
                // post css plugins, can be exported to postcss.config.js
                return [require("precss"), require("autoprefixer")];
              }
            }
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /(node_modules|styles\\common)/,
        // exclude: /node_modules/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                // importLoaders: 1,
                localIdentName: "[path][name]__[local]--[hash:base64:5]"
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        include: /(node_modules|styles\\common)/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|OTF)$/,
        use: ["file-loader"]
      }
      // {
      //   test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      //   use: [
      //     {
      //       loader: "url-loader",
      //       options: {
      //         limit: 8062
      //       }
      //     }
      //   ]
      // }
    ]
  },
  plugins: [
    // new CleanWebpackPlugin(["dist"]),
    // new CleanWebpackPlugin(),
    new CopyWebpackPlugin(
      [
        { from: "src/index.html", to: "index.html", toType: "file" },
        { from: "src/manifest.json", to: "manifest.json", toType: "file" },
        { from: "src/register-sw.js", to: "register-sw.js", toType: "file" },
        { from: "src/app/assets", to: "assets" }
        // {
        //   from: "src/app/images/icon.png",
        //   to: "icon.png",
        //   toType: "file"
        // }
      ],
      {
        copyUnmodified: false
      }
    )
  ]
};
