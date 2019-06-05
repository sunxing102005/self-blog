const Base = require("./base.js");
const client = require("prom-client");
const register = client.register;
module.exports = class extends Base {
    async indexAction() {
        await this.display("blog-backend-react/backend_index");
    }
    async metricsAction() {
        this.ctx.body = register.metrics();
    }
};
