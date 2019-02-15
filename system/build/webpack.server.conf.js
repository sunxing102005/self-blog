const webpack = require("webpack");
const base = require("./webpack.base.conf");
const VueSSRPlugin = require("vue-ssr-webpack-plugin");
var path = require("path");
const plugins = [
  new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(
      process.env.NODE_ENV || "development"
    ),
    "process.env.VUE_ENV": '"server"',
    "process.BROWSER": false
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
    // blog: "./entry/entry-server-blog"
  },
  output: Object.assign(
    {},
    {
      path: path.resolve(__dirname, "../dist"),
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
