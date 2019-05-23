import axios from "axios";
import { Message, MessageBox } from "element-ui";
import store from "../store";
import { getToken } from "@/utils/auth";
// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers["access_token"] = getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config;
  },
  error => {
    // Do something with request error
    Promise.reject(error);
  }
);
//
// respone拦截器
service.interceptors.response.use(
  data => {
    if (!data || typeof data.data !== "object") {
      Message.error("服务器响应格式错误");
    } else {
      let errmsg = "";
      const errno = data.data.errno;
      switch (errno) {
        case 1001:
          // 数据检验未通过
          for (const i in data.data.data) {
            errmsg += data.data.data[i] + ";";
          }
          break;
        default:
          errmsg = data.data.errmsg;
          break;
      }
      if (errmsg !== "" && errno !== 0) {
        Message.error(errmsg);
      }
      if (errmsg !== "" && errno === 0) {
        Message.success(errmsg);
      }
    }
    return data.data;
  },
  error => {
    let errmsg = "";
    if (error.response) {
      console.log("LLLLLLLL");
      switch (error.response.status) {
        case 401:
          // MessageBox.confirm(
          //   "你已被登出，可以取消继续留在该页面，或者重新登录",
          //   "确定登出",
          //   {
          //     confirmButtonText: "重新登录",
          //     cancelButtonText: "取消",
          //     type: "warning"
          //   }
          // ).then(() => {
          //   store.dispatch("FedLogOut").then(() => {
          //     location.reload(); // 为了重新实例化vue-router对象 避免bug
          //   });
          // });
          Message.error("重新登录").then(() => [
            store.dispatch("FedLogOut").then(() => {
              location.reload(); // 为了重新实例化vue-router对象 避免bug
            })
          ]);
          break;
      }
    }
    Message.error(error.response.data.errmsg);
    // return Promise.reject(error.response.data.errmsg);
  }
);

export default service;
