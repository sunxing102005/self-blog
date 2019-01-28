import Vue from "vue";
import Router from "vue-router";
const _import = require("./_import_" + process.env.NODE_ENV);
Vue.use(Router);
export const constRout = [
  {
    path: "/login",
    hidden: true
    // component: _import("login/index")
  },
  {
    path: "/",
    hidden: true,
    redirect: "/content",
    component: _import("content"),
    meta: {
      title: "首頁"
    },
    children: [
      {
        path: "content",
        name: "content",
        hidden: true
      }
    ]
  }
];
export default new Router({
  routes: constRout
});
