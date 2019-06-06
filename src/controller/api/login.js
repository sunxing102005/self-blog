const BaseRest = require("../rest.js");
module.exports = class extends BaseRest {
    async postAction() {
        // think.logger.info("ppppPPP");
        const username = this.post("username");
        const pwd = this.post("password");
        const user = this.model("user");
        const userInfo = await user.where({ username: username }).find();
        if (think.isEmpty(userInfo)) {
            return this.fail("用户不存在");
        }
        const result = user.verifyPassword(userInfo, pwd);
        if (think.isEmpty(result)) {
            return this.fail("密码不正确");
        }
        delete userInfo.password;
        delete userInfo.encrypt;
        user.where({ username: username }).update({
            last_login_time: new Date().getTime() / 1000
        });
        console.log("XXXLLL");
        // think.logger.info("XXXLLLKKK");
        console.log("userInfo", userInfo);
        // think.logger.info("userInfo", userInfo);
        // think.logger.info("token", token);
        const token = await this.session("userInfo", userInfo);
        // think.logger.info("login login");
        // think.logger.info("userInfo", userInfo);
        // think.logger.info("token", token);
        console.log("token", token);
        return this.success({ token: token });
    }
};
