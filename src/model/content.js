module.exports = class extends think.Model {
    // 模型关联
    get relation() {
        return {
            category: {
                type: think.Model.BELONG_TO,
                model: "meta",
                key: "category_id",
                fKey: "id",
                field: "id,name,slug,description,count"
            },
            tag: {
                type: think.Model.MANY_TO_MANY,
                model: "meta",
                rModel: "relationship",
                rfKey: "meta_id",
                key: "id",
                fKey: "content_id",
                field: "id,name,slug,description,count"
            },
            comment: {
                type: think.Model.HAS_MANY,
                key: "id",
                fKey: "content_id",
                where: "status=99",
                order: "create_time desc"
            },
            user: {
                type: think.Model.BELONG_TO,
                model: "user",
                key: "user_id",
                fKey: "id",
                field: "id,username,email,qq,github,weibo,zhihu"
            }
        };
    }

    // 添加文章
    async insert(data) {
        const tags = Array.from(data.tag);
        data = this.parseContent(data);
        delete data.tag;
        const id = await this.add(data);
        const relation = [];
        tags.forEach(val => {
            relation.push({
                content_id: id,
                meta_id: val
            });
        });
        think.model("relationship").addMany(relation);
        // 更新文章数量
        this.updateCount(data.category_id, tags);
        return id;
    }
    async save(data) {
        const tags = data.tag;
        data = this.parseContent(data);
        delete data.tag;
        const relation = [];

        const oldContent = await this.where({ id: data.id }).find();
        if (oldContent.category_id != data.category_id) {
            // 修改文章分类
            think
                .model("meta")
                .where({ id: oldContent.category_id })
                .decrement("count");
        }
        const oldTags = oldContent.tag;
        oldTags.forEach(val => {
            if (tags.indexOf(val.id) == -1) {
                think
                    .model("meta")
                    .where({ id: val.id })
                    .decrement("count");
            }
        });
        tags.forEach(val => {
            relation.push({
                content_id: data.id,
                meta_id: val
            });
        });
        await think
            .model("relationship")
            .where({ content_id: data.id })
            .delete();
        if (relation.length > 0) think.model("relationship").addMany(relation);
        const res = await this.where({ id: data.id }).update(data);
        if (res) {
            this.updateCount(data.category_id, tags);
        }
        return res;
    }
    // 处理内容，生成文章简介
    parseContent(data) {
        // 描述处理
        if (data.content.indexOf("<!--more-->") > -1) {
            data.description = data.content.split("<!--more-->")[0]; // 写文章内容时，description部分是<!--more-->前面的部分,要自己写
        } else {
            data.description = "";
        }
        // 唯一标识处理
        if (!data.slug) {
            data.slug = think.md5(new Date());
        }
        return data;
    }
    async updateCount(categoryId, tagIds) {
        const cateCount = await this.where({ category_id: categoryId }).count();
        think
            .model("meta")
            .where({ id: categoryId })
            .update({ count: cateCount });
        for (const id of tagIds) {
            const count = await think
                .model("relationship")
                .where({ meta_id: id })
                .count();
            think
                .model("meta")
                .where({ id })
                .update({ count });
        }
    }
};
