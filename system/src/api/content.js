import request from "@/utils/request";

export function getContent(params) {
  return request({
    url: "api/content",
    method: "get",
    params
  });
}
export function addArticle(params, id) {
  return request({
    url: id ? "api/content/" + id : "api/content",
    method: "post",
    data: params
  });
}
export function delArticle({ id }) {
  return request({
    url: "api/content/" + id,
    method: "delete"
  });
}
