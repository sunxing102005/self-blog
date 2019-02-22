/* entry-server.js */
import { createApp } from "../blog/index";

// export default context => {
//   return new Promise((resolve, reject) => {
//     const app = createApp();

//     // 更改路由
//     app.$router.push(context.url);
//     console.log("context.url", context.url);
//     console.log("app.$router", app.$router);
//     // 获取相应路由下的组件
//     const matchedComponents = app.$router.getMatchedComponents();

//     // 如果没有组件，说明该路由不存在，报错404
//     if (!matchedComponents.length) {
//       return reject({ code: 404 });
//     }

//     resolve(app);
//   });
// };
export default context => {
  // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
  // 以便服务器能够等待所有的内容在渲染前，
  // 就已经准备就绪。
  return new Promise((resolve, reject) => {
    // 设置服务器端 router 的位置

    const app = createApp();
    const router = app.$router;
    const store = app.$store;
    router.push(context.url);
    console.log("context1", context);
    // 等到 router 将可能的异步组件和钩子函数解析完
    router.onReady(() => {
      //router.onReady 避免请求404
      const matchedComponents = router.getMatchedComponents();
      // 匹配不到的路由，执行 reject 函数，并返回 404
      if (!matchedComponents.length) {
        return reject({ code: 404 });
      }
      Promise.all(
        matchedComponents.map(item => {
          // console.log("item:", item);
          // console.log("serverRequest:", item["serverRequest"]);
          if (item) {
            const serverRequest = item["serverRequest"];
            if (serverRequest) {
              return serverRequest({
                store,
                route: router.currentRoute
              });
            }
          }
        })
      )
        .then(() => {
          context.state = store.state;
          // console.log("context2", context);
          resolve(app);
        })
        .catch(reject);
    }, reject);
  });
};
