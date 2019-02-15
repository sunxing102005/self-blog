import axios from "axios";
// import { Message } from "element-ui";
// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
});
service.interceptors.response.use(
  data => {
    if (!data || typeof data.data !== "object") {
      console.error("服务器响应格式错误");
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
        console.error(errmsg);
      }
      if (errmsg !== "" && errno === 0) {
        console.log(errmsg);
      }
    }
    return data.data;
  },
  error => {
    let errmsg = "";
    // debugger;
    if (error.response) {
      switch (error.response.status) {
        case 401:
          break;
      }
    }
    console.error(error.response.data.errmsg);
    // return Promise.reject(error.response.data.errmsg);
  }
);
export default service;
