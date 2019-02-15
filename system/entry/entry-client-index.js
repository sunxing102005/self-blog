// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import ElementUI from "element-ui";
// import 'element-ui/lib/theme-chalk/index.css'
import "@/styles/index.scss"; // global css
import "@/icons"; // icon
import "@/permission";
Vue.use(ElementUI);

Vue.config.productionTip = false;
import { createApp } from "../src/main";
const app = createApp();

// 绑定app根元素
window.onload = function() {
  app.$mount("#app");
};
/* eslint-disable no-new */
// new Vue({
//   el: "#app",
//   router,
//   store,
//   components: { App },
//   template: "<App/>"
// });
