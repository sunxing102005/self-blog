/* entry-server.js */
import { createApp } from "../src/main";

export default context => {
  return new Promise((resolve, reject) => {
    const app = createApp();

    // 更改路由
    app.$router.push(context.url);
    console.log("context.url", context.url);
    console.log("app.$router", app.$router);
    // 获取相应路由下的组件
    const matchedComponents = app.$router.getMatchedComponents();

    // 如果没有组件，说明该路由不存在，报错404
    if (!matchedComponents.length) {
      return reject({ code: 404 });
    }

    resolve(app);
  });
};
