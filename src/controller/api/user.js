const BaseRest = require('../rest.js');

module.exports = class extends BaseRest {
  // 查询用户信息
  async getAction() {
    const userInfo = this.userInfo;
    if (think.isEmpty(userInfo)) {
      this.ctx.status = 401;
      return this.fail(-1, '请登录后操作');
    }
    let data;
    if (this.id) {
      data = await this.modelInstance
        .where({ username: this.id })
        .fieldReverse('id,password,encrypt')
        .find();
      data.avator =
                'https://secure.gravatar.com/avatar/' + think.md5(data.email);
      //   console.log('user:', data);
      return this.success(data);
    } else {
      data = await this.modelInstance.select();
      return this.success(data);
    }
  }
};
