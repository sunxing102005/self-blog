import request from "../utils/request";

export function getList(params) {
  return request({
    url: "font/content/list",
    method: "get",
    params
  });
}
export function getDetail(params, id) {
  return request({
    url: "font/content/detail",
    method: "post",
    data: params
  });
}
export function comment(params, id) {
  return request({
    url: "font/content/comment",
    method: "post",
    data: params
  });
}
