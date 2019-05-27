const Base = require("./base.js");

module.exports = class extends Base {
    indexAction() {
        // return this.action('content', 'list');
        return this.display("blog/index_index");
    }
    reactAction() {
        return this.display("react/backend_index");
    }
};
