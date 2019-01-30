import Vue from "vue";
import Router from "vue-router";
const _import = require("./_import_" + process.env.NODE_ENV);
Vue.use(Router);
export const constRout = [
  {
    path: "/",
    hidden: true,
    redirect: "/content",
    component: _import("content"),
    meta: {
      title: "文章列表"
    },
    children: [
      {
        path: "content",
        name: "content",
        hidden: true
      }
    ]
  },
  {
    path: "/article",
    hidden: true,
    component: _import("article"),
    meta: {
      title: "文章内容"
    }
  }
];
export default new Router({
  routes: constRout
});
