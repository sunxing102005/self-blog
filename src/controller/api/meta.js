const BaseRest = require("../rest.js");

module.exports = class extends BaseRest {
    async getAction() {
        let data = {};
        if (this.id) {
            data = this.modelInstance.where({ id: this.id }).find();
            return this.sucess(data);
        }
        const type = this.get("type") || "category";
        data = await this.modelInstance
            .where({ type })
            .order("sort desc")
            .select();
        return this.success(data);
    }
};
