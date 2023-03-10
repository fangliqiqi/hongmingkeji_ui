import request from '@/utils/request'

// 查询用户信息列表
export function listUser(query) {
  return request({
    url: '/share/user/list',
    method: 'get',
    params: query
  })
}

// 查询用户信息详细1
export function getUser(userId) {
  return request({
    url: '/share/user/' + userId,
    method: 'get'
  })
}

// 新增用户信息
export function addUser(data) {
  return request({
    url: '/share/user',
    method: 'post',
    data: data
  })
}

// 修改用户信息
export function updateUser(data) {
  return request({
    url: '/share/user',
    method: 'put',
    data: data
  })
}

// 删除用户信息
export function delUser(userId) {
  return request({
    url: '/share/user/' + userId,
    method: 'delete'
  })
}

// 导出用户信息
export function exportUser(query) {
  return request({
    url: '/share/user/export',
    method: 'get',
    params: query
  })
}

// 导出用户信息
export function getWxCode(query) {
  return request({
    url: '/share/user/wxcode',
    method: 'get',
    params: query
  })
}
