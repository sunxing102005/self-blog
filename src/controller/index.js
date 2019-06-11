const path = require("path");
const { createBundleRenderer } = require("vue-server-renderer");
const fs = require("fs");

const Base = require("./base.js");
const resolve = file => path.resolve(__dirname, file);
let bundlePath = "";
try {
    bundlePath = resolve("../../view/blog/vue-ssr-bundle.json");
} catch (error) {
    think.logger.error(error);
}
const renderer = createRenderer();
function createRenderer() {
    let temp = "";
    try {
        temp = fs.readFileSync(
            resolve("../../view/blog/blog_index.html"),
            "utf-8"
        );
        return createBundleRenderer(bundlePath, {
            template: temp
        });
    } catch (error) {
        think.logger.error(error);
    }
}

module.exports = class extends Base {
    serverRender(partCnxt = {}) {
        const cnxt = {
            url: "/",
            ...partCnxt
        };
        think.logger.info("server render..");
        // local环境需要每次重新创建render 更新文件 注意： 线上环境不会重新生成
        const renderApp =
            think.env === "development" ? createRenderer() : renderer;
        return new Promise((resolve, reject) => {
            renderApp.renderToString(cnxt, (err, html) => {
                if (err) {
                    think.logger.info("server render error", err);
                    reject(err);
                }
                resolve(html);
            });
        });
    }
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
        const html = await this.serverRender({
            // IP: IP,
            // env: think.env,
            // user: JSON.stringify(user).replace(/\"/g, "'"),
            // recent: JSON.stringify(recent)
        });
        // think.logger.info("html", html);
        this.ctx.body = html;

        // return this.display('blog/blog_index');
    }
};
