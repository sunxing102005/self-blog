// "use strict";
// const utils = require("./utils");
// const config = require("../config");
// const isProduction = process.env.NODE_ENV === "production";
// const sourceMapEnabled = isProduction
//   ? config.build.productionSourceMap
//   : config.dev.cssSourceMap;

// module.exports = {
//   loaders: utils.cssLoaders({
//     sourceMap: sourceMapEnabled,
//     extract: true //改为无论生产还是开发环境，都使用extractTextPlugin来提取css
//   }),
//   cssSourceMap: sourceMapEnabled,
//   cacheBusting: config.dev.cacheBusting,
//   transformToRequire: {
//     video: ["src", "poster"],
//     source: "src",
//     img: "src",
//     image: "xlink:href"
//   }
// };
module.exports = {
  preserveWhitespace: false,
  postcss: [
    require("autoprefixer")({
      browsers: ["last 3 versions"]
    })
  ]
};
