// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from "vue";
// import ElementUI from "element-ui";
// import "@/styles/index.scss"; // global css
// Vue.use(ElementUI);

Vue.config.productionTip = false;

import { createApp } from "../blog/index";
const app = createApp();

// 绑定app根元素
window.onload = function() {
  app.$mount("#app");
};
