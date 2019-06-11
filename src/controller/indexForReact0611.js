const Base = require("./base.js");
const client = require("prom-client");
const register = client.register;
const ipUtil = require("../utils/ip");
module.exports = class extends Base {
    async indexAction() {
        const ip = ipUtil.getIp();
        console.log("curr_ip", ip);
        // think.logger.info("in_curr", ip);
        await this.display("blog-backend-react/backend_index");
    }
    async metricsAction() {
        this.ctx.body = register.metrics();
    }
};
