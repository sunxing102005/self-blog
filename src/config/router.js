module.exports = [
    // RESTFUL
    [/metrics\/(.*)/i, "metrics/index"],
    [/\/api\/(\w+)(?:\/(.*))?/, "api/:1?id=:2", "rest"],
    [/\/font\/(\w+)\/(\w+)/, "fontend/:1/:2"],
    ["/:category/:slug", "content/detail"],
    ["/:category/:slug/comment", "content/comment"]
];
