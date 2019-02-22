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
    //将运行entry.client生成的html，分成两部分，并去掉div#app,因为服务端也会渲染出div#app
    const placeholder = '<div id="app"></div>';
    const i = tmpl.indexOf(placeholder);
    return {
        head: tmpl.slice(0, i),
        tail: tmpl.slice(i)
    };
};
const indexHTMLFun = () => {
    return parseHTML(
        fs.readFileSync(resolve("../../view/blog/blog_index.html"), "utf-8")
    );
};

function createRenderer() {
    try {
        bundle = fs.readFileSync(bundlePath, "utf-8");
        //将ssr生成的vue-ssr-bundle.json渲染成html
        return createBundleRenderer(bundlePath, { runInNewContext: false });
    } catch (error) {
        think.logger.error(error);
    }
}
module.exports = class extends Base {
    serverRender(renderStream, context) {
        const indexHTML = indexHTMLFun();
        return new Promise((resolve, reject) => {
            //包装成promise对象，为了读取文件结束后再返回拼接的html字符串
            let html = "";
            renderStream.once("data", () => {
                html += indexHTML.head;
            });
            renderStream.on("data", chunk => {
                html += chunk;
            });

            renderStream.on("end", () => {
                if (context.state) {
                    html += `<script>window.__INITIAL_STATE__=${serialize(
                        context.state,
                        { isJSON: true }
                    )}</script>`;
                }
                html += indexHTML.tail;
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
        const context = { url: this.ctx.req.url };
        //开发时每次请求重新创建render,生产时不用
        const renderApp =
            think.env === "development" ? createRenderer() : renderer;
        const renderStream = renderApp.renderToStream(context);
        const html = await this.serverRender(renderStream, context);
        console.log("html", html);
        this.ctx.body = html;
        // this.ctx.res.end();
        return;
    }
};
