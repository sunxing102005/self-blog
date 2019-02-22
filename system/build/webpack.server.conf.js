const webpack = require("webpack");
const base = require("./webpack.base.conf");
const VueSSRPlugin = require("vue-ssr-webpack-plugin");
const utils = require("./utils");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const baseFileName = require("../package.json").name;
var path = require("path");
const plugins = [
  new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(
      process.env.NODE_ENV || "production"
    ),
    "process.env.VUE_ENV": '"server"',
    "process.BROWSER": false
  }),
  new ExtractTextPlugin({
    filename: utils.assetsPath(baseFileName + "/css/[name].[contenthash].css"),
    allChunks: true
  })
];

if (process.env.NODE_ENV === "production") {
  plugins.push(new VueSSRPlugin());
}

module.exports = Object.assign({}, base, {
  target: "node",
  devtool: "#source-map",
  entry: {
    app: "./entry/entry-server-blog"
  },
  output: Object.assign(
    {},
    {
      path: path.resolve(__dirname, "../../view/blog"),
      filename: "server-bundle.js",
      libraryTarget: "commonjs2",
      publicPath: "/"
      // filename: "server-bundle-[name].js",
      // libraryTarget: "commonjs2"
    }
  ),
  externals: Object.keys(require("../package.json").dependencies),
  plugins: plugins
});
