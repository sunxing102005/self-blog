const path = require("path");
const isDev = think.env === "development";
const cors = require("koa2-cors");
// const whiteList = ["http://localhost:8362/", "http://47.97.161.236:8362/"];
const monitor = require("./middleware/monitor.middleware");
module.exports = [
    {
        handle: cors,
        options: {
            origin: ctx => {
                return "*";
            }
        }
    },
    {
        handle: "meta",
        options: {
            logRequest: isDev,
            sendResponseTime: isDev
        }
    },

    {
        handle: "resource",
        enable: true,
        options: {
            root: path.join(think.ROOT_PATH, "www"),
            publicPath: /^\/(static|uploads|favicon\.ico|index\.html|admin\.html)/
        }
    },
    {
        handle: monitor,
        enable: true,
        options: {}
    },
    {
        handle: "trace",
        enable: !think.isCli,
        options: {
            debug: isDev,
            templates: {
                404: path.join(think.ROOT_PATH, "view/error_404.html"),
                500: path.join(think.ROOT_PATH, "view/error_500.html")
            }
        }
    },
    {
        handle: "payload",
        options: {
            uploadDir: path.join(think.ROOT_PATH, "runtime/data")
        }
    },
    {
        handle: "router",
        options: {
            suffix: [".html"]
        }
    },
    "logic",
    "controller"
];
