const Base = require('./base.js');
module.exports = class extends Base {
  async listAction() {
    const condition = {
      status: 99,
      type: 'post'
    };
    const page = this.get('page') || 1;
    const pageSize = this.get('pageSize') || 5;
    const list = await this.model('content')
      .where(condition)
      .page(page, pageSize)
      .fieldReverse('content,markdown')
      .order('create_time desc')
      .countSelect();
    // think.logger.info('list', list);
    this.assign('contents', list);
    return this.display('list');
  }
  async detailAction() {
    const params = {
      status: '99',
      type: 'post',
      slug: this.get('slug')
    };
    const content = await this.model('content')
      .where(params)
      .find();
    if (think.isEmpty(content)) {
      return this.redirect('/');
    }
    this.assign('content', content);
    this.assign('title', content.title);
    const replyTo = this.get('replyTo') || 0;
    this.assign('replyTo', replyTo);
    // 增加阅读量
    this.model('content')
      .where(params)
      .increment('view');
    return this.display('content');
  }
  async commentAction() {
    const params = {
      status: 99,
      slug: this.get('slug'),
      type: 'post'
    };
    const content = await this.model('content')
      .where(params)
      .find();
    if (think.isEmpty(content)) {
      return this.redirect('/');
    }
    const data = {
      content_id: content.id,
      author: this.post('author'),
      email: this.post('email'),
      url: this.post('url'),
      agent: this.header('User-Agent'),
      text: this.post('text'),
      status: 99,
      parent_id: this.post('parent_id'),
      create_time: new Date().getTime() / 1000
    };
    const insertId = await this.model('comment').add(data);
    if (insertId) {
      this.redirect(
        `/${content.category.slug}/${
          content.slug
        }.html#comment-${insertId}`
      );
    } else {
      this.redirect(`/${content.category.slug}/${content.slug}.html`);
    }
  }
};
