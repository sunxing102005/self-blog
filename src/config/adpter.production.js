// 生产环境配置
const path = require("path");
exports.model = {
    mysql: {
        database: "blog",
        host: "127.0.0.1",
        port: "",
        user: "root",
        password: "mx102005"
    }
};

exports.view = {
    common: {
        viewPath: path.join(think.ROOT_PATH, "/view")
    }
};
