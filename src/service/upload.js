module.exports = class extends think.Service {
  /**
     * 注册HOOK点
     * @return {[type]} [description]
     */
  static registerHook() {
    return {
      cdn: ['upload']
    };
  }
  /**
     * cdn 链接处理
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
  async cdn(data) {
    const config = await think
      .model('config')
      .cache('config')
      .getList();
    if (
      think.isEmpty(config) ||
            think.isEmpty(config.site) ||
            think.isEmpty(config.site.cdn)
    ) {
      return false;
    }
    data.url = config.site.cdn + data.url;
    return true;
  }
};
