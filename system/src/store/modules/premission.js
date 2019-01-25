import { constRout, asyncRouteMap } from "@/router";

/**
 * roles当前用户权限，route 判断该路径用户是否有权访问
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) != -1);
  } else {
    return true;
  }
}

/**
 * 递归调用异步路由表，返回有权访问的路径
 * @param asyncRouteMap
 * @param roles
 */
function filterAsyncRouter(asyncRouteMap, roles) {
  const availableRoutes = asyncRouteMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length > 0) {
        filterAsyncRouter(route.children, roles);
      } else {
        return true;
      }
    } else {
      return false;
    }
  });
  return availableRoutes;
}
const permission = {
  state: {
    routers: constRout,
    addRouters: []
  },
  mutations: {
    setRoutes(state, routes) {
      state.addRouters = routes;
      state.routers = constRout.concat(routes);
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data;
        let availableRoute;
        if (roles.indexOf("admin") != -1) {
          availableRoute = asyncRouteMap;
        } else {
          availableRoute = filterAsyncRouter(asyncRouteMap, roles);
        }
        commit("setRoutes", availableRoute);
        resolve();
      });
    }
  }
};

export default permission;
