const BaseRest = require("../rest.js");

module.exports = class extends BaseRest {
    async getAction() {
        let data;
        const params = {};
        if (this.id) {
            params["id"] = this.id;
            data = await this.modelInstance.where(params).find();
            if (!this.userInfo) {
                this.modelInstance.where(params).increament("view");
            }
            return this.success(data);
        }
        const type = this.get("type") || "default";
        // 归档
        if (type === "archives") {
            data = await this.modelInstance
                .where({ status: 99 })
                .order("create_time desc")
                .fieldReverse("content,markdown")
                .select();
            return this.success(data);
        }
        // 热门文章
        if (type === "hot") {
            data = await this.modelInstance
                .where({ status: 99 })
                .order("view desc")
                .limit(10)
                .field("title,slug,view")
                .select();
            return this.success(data);
        }
        // 总览数据
        if (type === "summary") {
            data = {};
            data["view"] = await this.modelInstance
                .where({ status: 99 })
                .sum("view");
            data["count"] = await this.modelInstance
                .where({ status: 99 })
                .count();
            data["comments"] = await this.model("comment")
                .where({ status: 99 })
                .count();
            return this.success(data);
        }
        if (type === "recent") {
            const recent = {
                content: think.cache("recent_content"),
                comment: think.cache("recent_comment")
            };
            return { recent };
        }
        // 是否获取全部
        const all = this.get("all");
        // if (!all || think.isEmpty(this.userInfo)) {
        if (!all) {
            params.status = 99;
        }
        // 关键词
        const key = this.get("key");
        if (key) {
            params["title|description"] = ["like", `%${key}%`];
        }
        const status = this.get("status");
        if (status) {
            params.status = status;
        }
        // 内容类型
        const contentType = this.get("contentType") || "post";
        params["type"] = contentType;
        // 页码
        const page = this.get("page") || 1;
        // 每页显示数量
        const pageSize = this.get("pageSize") || 5;
        data = await this.modelInstance
            .where(params)
            .page(page, pageSize)
            .order("create_time desc")
            .fieldReverse("content,markdown")
            .countSelect();
        return this.success(data);
    }
    async putAction() {
        if (!this.id) {
            return this.fail(1001, "文章不存在");
        }
    }
    async postAction() {
        const userInfo = this.userInfo;
        const createTime = this.post("date");
        let publishTime = null;
        if (this.post("status") != 1) {
            publishTime = createTime;
        }
        const data = {
            user_id: userInfo.id,
            title: this.post("title"),
            category_id: this.post("category_id"),
            slug: this.post("slug"),
            status: this.post("status"),
            markdown: this.post("markdown"),
            content: this.post("content"),
            tag: this.post("tag"),
            type: this.post("type"),
            thumb: this.post("thumb") || "",
            publish_time: publishTime,
            view: 0,
            like: 0,
            recommend: this.post("recommend"),
            // create_time: createTime,
            modify_time: createTime
        };
        if (this.id) {
            data.id = this.post("id");
            Object.keys(data).forEach(val => {
                if (!data[val]) {
                    delete data[val];
                }
            });
            const res = await this.modelInstance.save(data);
            await this.hook("contentUpdate", data);
            if (res) {
                this.success({ id: this.id }, "修改成功!");
            } else {
                return this.fail(1000, "修改失败");
            }
        } else {
            data["create_time"] = createTime;
            const id = await this.modelInstance.insert(data);
            if (id) {
                data.id = id;
                this.hook("contentCreate", data);
                this.success({ id }, "添加成功!");
            } else {
                return this.fail(1000, "添加失败");
            }
        }
    }
    async deleteAction() {
        if (!this.id) {
            return this.fail(1001, "文章不存在");
        }
        const oldContent = await this.modelInstance
            .where({ id: this.id })
            .find();
        // oldContent.tag.forEach(val => {});
        for (const item of oldContent.tag) {
            await think
                .model("meta")
                .where({ id: item.id })
                .decrement("count");
        }
        const affectedRows = await this.modelInstance
            .where({ id: this.id })
            .delete();
        if (affectedRows) {
            this.hook("contentDelete", { id: this.id });
            return this.success(affectedRows);
        } else {
            this.fail(1000, "删除失败");
        }
    }
};
