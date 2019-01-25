import router from "./router";
import store from "./store";
import NProgress from "nprogress"; // Progress 进度条
import "nprogress/nprogress.css"; // Progress 进度条样式
import { Message } from "element-ui";
import { getToken, getName } from "@/utils/auth"; // 验权
/**
 * roles 当前登录人权限，permittedRoles 页面可见所需要的权限
 * @param roles
 * @param permittedRoles
 */
function hasPermission(roles, permittedRoles) {
  if (!permittedRoles) return true;
  if (roles.indexOf("admin") != -1) {
    return true;
  } else {
    return roles.some(role => permittedRoles.indexOf(role) != -1);
  }
}

const whiteList = ["/login", "/authredirect"]; // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start();
  const tt = getToken();
  if (getToken()) {
    if (to.path == "/login") {
      next({ path: "/" });
      NProgress.done();
    } else {
      console.log("from", from);
      console.log("to", to);
      if (store.getters.roles.length == 0) {
        const tt = getName();
        store.dispatch("GetInfo", getName()).then(res => {
          console.log("roles", store.getters);
          let currRoles = store.getters.roles;
          store
            .dispatch("GenerateRoutes", { roles: currRoles })
            .then(() => {
              let addRoutes = store.getters.addRouters;
              router.addRoutes(addRoutes);
              next({ ...to });
            })
            .catch(error => {
              console.error(error);
              store.dispatch("FedLogOut").then(() => {
                Message.error("login failed");
                next({ path: "/login" });
              });
            });
        });
      } else {
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next();
        } else {
          next({ path: "/401", query: { noGoBack: true } });
          NProgress.done();
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) != -1) {
      next();
    } else {
      next("/login");
      NProgress.done();
    }
  }
});
router.afterEach(() => {
  NProgress.done();
});
