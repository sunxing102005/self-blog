const fs = require("fs");
module.exports = {
    deleteFile(filepath) {
        return new Promise((resolve, reject) => {
            fs.unlink(filepath, err => {
                if (err) {
                    reject({ msg: err, type: "failure" });
                }
                resolve({ msg: "删除成功", type: "success" });
            });
        });
    }
};
