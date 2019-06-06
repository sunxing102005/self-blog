const fs = require("fs");
think.beforeStartServer(async () => {
    // 压缩模板
    // think.logger.info("think.env", think.env);
    if (think.env === "production") {
        if (!fs.existsSync(think.ROOT_PATH + "/runtime/view/")) {
            fs.mkdirSync(think.ROOT_PATH + "/runtime/view/");
        }
        var minify = require("html-minifier").minify;
        const views = fs.readdirSync(think.ROOT_PATH + "/view");

        views.forEach((val, index) => {
            if (val.indexOf(".") > 0) {
                const data = fs.readFileSync(
                    think.ROOT_PATH + "/view/" + val,
                    "utf8"
                );
                const minifyData = minify(data, {
                    removeComments: true,
                    collapseWhitespace: true,
                    minifyJS: true,
                    minifyCSS: true
                });
                fs.writeFileSync(
                    think.ROOT_PATH + "/runtime/view/" + val,
                    minifyData
                );
            }
        });
    }
});

//设置prometheus metric
const client = require("prom-client");
const AggregatorRegistry = client.AggregatorRegistry;
const aggregatorRegistry = new AggregatorRegistry();

var Koa = require("koa");
var Router = require("koa-router");

var app = new Koa();
var router = new Router();

router.get("/prometheus", async (ctx, next) => {
    const metrics = await aggregatorRegistry.clusterMetrics();
    ctx.type = aggregatorRegistry.contentType;
    ctx.body = metrics;
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3002);
