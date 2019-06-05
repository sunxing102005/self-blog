const client = require('prom-client');
const register = client.register;
module.exports = class extends think.Controller {
    /**
     * prometheus metrics
     */
    indexAction() {
        this.ctx.body = register.metrics();
    }
};
