const BaseRest = require("../rest.js");

module.exports = class extends BaseRest {
    async getAction() {
        let data = {};
        if (this.id) {
            data = this.modelInstance.where({ id: this.id }).find();
            return this.sucess(data);
        }
        const params = {};
        const type = this.get("type");
        type ? (params["type"] = type) : "";
        if (this.get("page")) {
            // 页码
            const page = this.get("page") || 1;
            // 每页显示数量
            const pageSize = this.get("pageSize") || 100;

            data = await this.modelInstance
                .where(params)
                .page(page, pageSize)
                .order("sort desc")
                .countSelect();
            return this.success(data);
        }
        data = await this.modelInstance
            .where(params)
            .order("sort desc")
            .select();
        return this.success(data);
    }
};
