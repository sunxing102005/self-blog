import request from "@/utils/request";
export function upload(data) {
  return request({
    url: "api/image",
    method: "post",
    headers: { "Content-Type": "multipart/form-data" },
    data
  });
}
