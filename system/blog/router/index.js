import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
export const constRout = [
  {
    path: "/",
    component: () => import("../views/content"),
    meta: {
      title: "文章列表"
    }
    // children: [
    //   {
    //     path: "content",
    //     name: "content",
    //     hidden: true
    //   }
    // ]
  },
  {
    path: "/article",
    component: () => import("../views/article"),
    meta: {
      title: "文章内容"
    }
  }
];
// export default new Router({
//   routes: constRout
// });
export default function createRouter() {
  return new Router({
    fallback: false,
    // scrollBehavior: () => ({ y: 0 }),
    routes: constRout
  });
}
