import request from "../utils/request";

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
