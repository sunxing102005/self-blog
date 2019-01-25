import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/table/table',
    method: 'post',
    data:params

  })
}

export function getMonth(params) {
  return request({
    url: '/schedule/month',
    method: 'post',
    params
  })
}

export function updateUserManage(data) {
  return request({
    url: '/table/update',
    method: 'post',
    data
  })
}
export function deleteUserManage(data) {
  return request({
    url: '/table/delete',
    method: 'post',
    data
  })
}
export function deleteFile(data){
  return request({
    url:'/table/deleteFile',
    method:'get',
    params:data
  })
}
export function uploadFile(params) {
  return request({
    url: '/table/uploadFile',
    method: 'post',
    data:params

  })
}
export function downloadFile(params) {
  return request({
    url: '/table/downloadFile',
    method: 'post',
    data:params

  })
}
export function confirmUpload(data) {
  return request({
    url: '/table/confirmUpload',
    method: 'post',
    data
  })
}
