module.exports = class extends think.Model {
  get relation() {
    return {
      parent: {
        model: 'comment',
        fKey: 'id',
        key: 'parent_id',
        type: think.Model.BELONG_TO
      }
    };
  }
};
