import request from "../utils/request";
import config from "../config/index";
// const baseUrl = config.baseURL;
export function getList(params) {
  return request({
    url: "font/content/list",
    method: "get",
    params
  });
}
export function getDetail(params) {
  return request({
    url: "font/content/detail",
    method: "get",
    params
  });
}
export function pubComment(params) {
  return request({
    url: "font/content/comment",
    method: "post",
    data: params
  });
}
export function getRecent(params) {
  return request({
    url: "font/content/recent",
    method: "post",
    data: params
  });
}
