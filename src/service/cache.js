module.exports = class extends think.Service {
    static registerHook() {
        return {
            content: ["contentCreate", "contentUpdate", "contentDelete"]
        };
    }
    /**
     * 更新内容缓存
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    content(data) {
        think.cache("recent_content", null);
    }
};
