import request from "@/utils/request";

export function login(username, password) {
  return request({
    url: "api/login",
    data: { username, password },
    method: "post"
  });
}

export function getInfo(token) {
  return request({
    url: "api/user",
    params: { id: token },
    method: "get"
  });
}

export function logout() {
  return request({
    url: "/user/logout",
    method: "post"
  });
}
