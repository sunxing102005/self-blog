const fsUtil = require("../../utils/fsUtil");
const fs = require("fs");
const path = require("path");
const rename = think.promisify(fs.rename, fs);

module.exports = class extends think.Controller {
    async postAction() {
        const file = this.file("image");
        if (!file) {
            return this.fail(1000, "请上传文件");
        }
        const extname = path.extname(file.name);
        const filename = path.basename(file.path);
        const basename = think.md5(filename) + extname;
        const date = new Date();
        const year = date.getFullYear();
        const month =
            date.getMonth() + 1 < 10
                ? "0" + (date.getMonth() + 1)
                : date.getMonth() + 1;
        const savepath = "/uploads/" + year + "/" + month + "/" + basename;
        const filepath = path.join(think.ROOT_PATH, "www" + savepath);
        think.mkdir(path.dirname(filepath));
        rename(file.path, filepath);
        const data = {
            url: savepath,
            basename: basename,
            orgname: file.name,
            filepath: filepath
        };
        await this.hook("upload", data);
        delete data.filepath;
        this.success(data, "上传成功");
    }
    async deleteAction() {
        const relpath = this.post("filepath");
        const filepath = path.join(think.ROOT_PATH, "www" + relpath);
        const ret = await fsUtil.deleteFile(filepath);
        this.success({ msg: ret.msg, type: ret.type });
    }
};
