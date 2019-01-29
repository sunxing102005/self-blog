const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    this.assign({ time: 'fsdaFFF' });
    await this.display('blog_index');
  }
};
