const fsUtil = require("../../utils/fsUtil");
const fs = require("fs");
const path = require("path");
const qiniuUtil = require("../../utils/qiniu2");
const rename = think.promisify(fs.rename, fs);
const cdnDomain = think.config("cdn_domain");
module.exports = class extends think.Controller {
    // async postAction() {
    //     const file = this.file("image");
    //     if (!file) {
    //         return this.fail(1000, "请上传文件");
    //     }
    //     const extname = path.extname(file.name);
    //     const filename = path.basename(file.path);
    //     const basename = think.md5(filename) + extname;
    //     const date = new Date();
    //     const year = date.getFullYear();
    //     const month =
    //         date.getMonth() + 1 < 10
    //             ? "0" + (date.getMonth() + 1)
    //             : date.getMonth() + 1;
    //     const savepath = "/uploads/" + year + "/" + month + "/" + basename;
    //     const filepath = path.join(think.ROOT_PATH, "www" + savepath);
    //     think.mkdir(path.dirname(filepath));
    //     rename(file.path, filepath);
    //     const data = {
    //         url: savepath,
    //         basename: basename,
    //         orgname: file.name,
    //         filepath: filepath
    //     };
    //     await this.hook("upload", data);
    //     delete data.filepath;
    //     this.success(data, "上传成功");
    // }
    async postAction() {
        const file = this.file("image");
        if (!file) {
            return this.fail(1000, "请上传文件");
        }
        const extname = path.extname(file.name);
        const filename = path.basename(file.path);
        const basename = think.md5(filename) + extname;
        const res = await qiniuUtil.uploadFile(basename, file.path);
        if (res.key && res.hash) {
            const url = `http://${cdnDomain}/${res.key}`;
            console.log("url", url);
            const data = {
                url,
                basename: basename,
                orgname: file.name
            };
            this.success(data, "上传成功");
        } else {
            return this.fail(1000, "上传失败");
        }
    }
    async deleteAction() {
        // const relpath = this.post("filepath");
        // const filepath = path.join(think.ROOT_PATH, "www" + relpath);
        // const ret = await fsUtil.deleteFile(filepath);
        // this.success({ msg: ret.msg, type: ret.type });
        const filepath = this.post("filepath");
        const filenameArr = filepath.split("/");
        if (
            filenameArr &&
            filenameArr.length &&
            filenameArr[filenameArr.length - 1]
        ) {
            const filename = filenameArr[filenameArr.length - 1];
            console.log("filename", filename);
            const res = await qiniuUtil.deleteFile(filename);
            if (res && res.error) {
                console.log(res);
                this.fail(1000, res.error);
            } else {
                this.success();
            }
        } else {
            return this.fail(1000, "删除失败,传入文件名路径！");
        }
    }
};
