"use strict";
const utils = require("./utils");
const webpack = require("webpack");
const config = require("../config");
const merge = require("webpack-merge");
const path = require("path");
const baseWebpackConfig = require("./webpack.base.conf");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const portfinder = require("portfinder");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);
const baseFileName = require("../package.json").name;
function resolve(dir) {
  return path.join(__dirname, "..", dir);
}
const devWebpackConfig = merge(baseWebpackConfig, {
  entry: {
    app: "./entry/entry-client-index",
    blog: "./entry/entry-client-blog"
  },
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,
  output: {
    path: resolve(config.dev.assetsRoot),
    filename: "static/" + baseFileName + "/js/[name]-[chunkHash:5].js",
    chunkFilename: "static/" + baseFileName + "/js/[name]-[chunkhash:5].js"
  },

  // these devServer options should be customized in /config/index.js
  // devServer: {
  //   clientLogLevel: "warning",
  //   historyApiFallback: {
  //     rewrites: [
  //       {
  //         from: /.*/,
  //         to: path.posix.join(config.dev.assetsPublicPath, "index.html")
  //       }
  //     ]
  //   },
  //   hot: true,
  //   contentBase: false, // since we use CopyWebpackPlugin.
  //   compress: true,
  //   host: HOST || config.dev.host,
  //   port: PORT || config.dev.port,
  //   open: config.dev.autoOpenBrowser,
  //   disableHostCheck: true,
  //   overlay: config.dev.errorOverlay
  //     ? { warnings: false, errors: true }
  //     : false,
  //   publicPath: config.dev.assetsPublicPath,
  //   proxy: config.dev.proxyTable,
  //   quiet: true, // necessary for FriendlyErrorsPlugin
  //   watchOptions: {
  //     poll: config.dev.poll
  //   }
  // },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": require("../config/dev.env")
    }),
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      minify: {},
      chunksSortMode: "dependency",
      environment: process.env.NODE_ENV,
      filename: resolve(`../view/blog/index_index.html`),
      template: "./view/index.html",
      title: "博客管理系统",
      favicon: resolve("favicon.ico"),
      inject: true,
      chunks: ["manifest", "vendor", "app"]
    }),
    new HtmlWebpackPlugin({
      filename: resolve(`../view/blog/blog_index.html`),
      template: "./view/blog.html",
      title: "博客展示",
      inject: true,
      favicon: resolve("favicon.ico"),
      chunks: ["manifest", "vendor", "blog"]
    }),
    new ExtractTextPlugin({
      filename: utils.assetsPath(
        baseFileName + "/css/[name].[contenthash].css"
      ),
      allChunks: true
    })
  ]
});
module.exports = devWebpackConfig;
// module.exports = new Promise((resolve, reject) => {
//   portfinder.basePort = process.env.PORT || config.dev.port;
//   portfinder.getPort((err, port) => {
//     if (err) {
//       reject(err);
//     } else {
//       // publish the new Port, necessary for e2e tests
//       process.env.PORT = port;
//       // add port to devServer config
//       devWebpackConfig.devServer.port = port;

//       // Add FriendlyErrorsPlugin
//       devWebpackConfig.plugins.push(
//         new FriendlyErrorsPlugin({
//           compilationSuccessInfo: {
//             messages: [
//               `Your application is running here: http://${
//                 devWebpackConfig.devServer.host
//               }:${port}`
//             ]
//           },
//           onErrors: config.dev.notifyOnErrors
//             ? utils.createNotifierCallback()
//             : undefined
//         })
//       );

//       resolve(devWebpackConfig);
//     }
//   });
// });
