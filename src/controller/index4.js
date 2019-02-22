const path = require("path");
const { createBundleRenderer } = require("vue-server-renderer");
const fs = require("fs");
const lru = require("lru-cache");
const serialize = require("serialize-javascript");
const Base = require("./base.js");
const resolve = file => path.resolve(__dirname, file);
let bundlePath = "";
try {
    bundlePath = resolve("../../view/blog/vue-ssr-bundle.json");
} catch (error) {
    think.logger.error(error);
}
const renderer = createRenderer();
const parseHTML = tmpl => {
    const placeholder = '<div id="app"></div>';
    const i = tmpl.indexOf(placeholder);
    return {
        head: tmpl.slice(0, i),
        tail: tmpl.slice(i + placeholder.length)
    };
};
const indexHTML = parseHTML(
    fs.readFileSync(resolve("../../view/blog/blog_index.html"), "utf-8")
);
// let data = "";
// var readerStream = fs.createReadStream(
//     resolve("../../view/blog/blog_index.html")
// );
// readerStream.on("data", function(chunk) {
//     data += chunk;
//     console.log(";PPP");
// });
// console.log(";;;;");

function createRenderer() {
    let bundle = "";
    try {
        bundle = fs.readFileSync(bundlePath, "utf-8");
        return createBundleRenderer(bundlePath, { runInNewContext: false });
    } catch (error) {
        think.logger.error(error);
    }
}
module.exports = class extends Base {
    // serverRender(partCnxt = {}) {
    //     const cnxt = {
    //         url: "/",
    //         ...partCnxt
    //     };
    //     think.logger.info("server render..");
    //     // local环境需要每次重新创建render 更新文件 注意： 线上环境不会重新生成
    //     const renderApp =
    //         think.env === "development" ? createRenderer() : renderer;
    //     return new Promise((resolve, reject) => {
    //         renderApp.renderToString(cnxt, (err, html) => {
    //             if (err) {
    //                 think.logger.info("server render error", err);
    //                 reject(err);
    //             }
    //             resolve(html);
    //         });
    //     });
    // }
    async indexAction() {
        if (!renderer) {
            return this.ctx.res.end(
                "waiting for compilation... refresh in a moment.",
                "utf-8"
            );
        }
        this.header("Cache-Control", "no-store");
        // const IP = this.ctx.ip;
        // think.logger.info("request:ip" + IP);
        // const user = await think.cache("user");
        // const recent = {
        //     content: think.cache("recent_content"),
        //     comment: think.cache("recent_comment")
        // };
        const context = { url: this.ctx.req.url };
        const renderStream = renderer.renderToStream(context);
        let html = "";
        // this.ctx.body = "<html><body>kkkk</body></html>";
        renderStream.once("data", () => {
            // this.ctx.res.write(indexHTML.head);
            html += indexHTML.head;
        });
        renderStream.on("data", chunk => {
            // this.ctx.res.write(chunk);
            html += chunk;
        });
        if (context.state) {
            // this.ctx.res.write(
            //     `<script>window.__INITIAL_STATE__=${serialize(context.state, {
            //         isJSON: true
            //     })}</script>`
            // );
            html += `<script>window.__INITIAL_STATE__=${serialize(
                context.state,
                { isJSON: true }
            )}</script>`;
        }
        renderStream.on("end", () => {
            // this.ctx.res.end(indexHTML.tail);
            html += indexHTML.tail;
            this.ctx.body = html;
        });
        return false;
    }
};
