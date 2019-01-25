import request from "@/utils/request";

export function getList(params) {
  return request({
    url: "api/meta",
    method: "get",
    params
  });
}
