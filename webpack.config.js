require('dotenv').config();

const webpack = require("webpack");
const path = require('path');
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebappWebpackPlugin = require("webapp-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");


const NODE_ENV = process.env.NODE_ENV || "development";
const DEV_MODE = NODE_ENV !== "production";
const PORT = process.env.PORT || 3000;
// const API_HOST = DEV_MODE ? "http://localhost:9010" : "https://api.grubgrab.io"
const API_HOST = "https://api.grubgrab.io";

const FAVICON_DIR = "./src/assets/favicon/favicon.png";
const TITLE = "Grub Grab - Your Local Grub Guru";

module.exports = {
  entry: ["./src/index.tsx"],
  mode: DEV_MODE ? "development" : "production",
  devtool: DEV_MODE ? "source-map" : "",
  module: {
    rules: [
      {
        test: /\.(tsx|ts)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: DEV_MODE ? "tsconfig.json" : "tsconfig.deploy.json"
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {}
          }
        ]
      },
      {
        test: /\.(ttf|eot|woff)(\?v=[0-9].[0-9].[0-9])?$/,
        use: [
          {
            loader: "file-loader",
            options: {}
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
    alias: {
      "icons": path.resolve(__dirname, "src/icons"),
      "views": path.resolve(__dirname, "src/views"),
      "ui": path.resolve(__dirname, "src/components"),
      "assets": path.resolve(__dirname, "src/assets"),
      "consts": path.resolve(__dirname, "src/consts"),
      "api": path.resolve(__dirname, "src/api"),
      "@util": path.resolve(__dirname, "src/util"),
    }
  },
  output: {
    path: __dirname + "/dist",
    publicPath: "/",
    filename: "bundle.[hash].js",
  },
  devServer: {
    contentBase: "./dist",
    compress: true,
    port: PORT,
    historyApiFallback: true,
    open: true
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(NODE_ENV),
      "process.env.PORT": JSON.stringify(PORT),
      "process.env.MAPS_API_KEY": JSON.stringify(process.env.MAPS_API_KEY),
      "process.env.API_HOST": JSON.stringify(API_HOST),
    }),
    new CopyWebpackPlugin([{
      from: "./src/assets/css",
      to: "css"
    }]),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      title: TITLE,
      environment: NODE_ENV,
      zoom: NODE_ENV === "production" ? 1.1 : 1.1,
      filename: "index.html"
    }),
    ...(FAVICON_DIR ? [new WebappWebpackPlugin(FAVICON_DIR)] : []),
    new ImageminPlugin({
      disable: DEV_MODE,
      pngquant: {
        quality: "95-100"
      },
      test: /\.(jpe?g|png|gif|svg)$/i
    })
  ],
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  }
};
