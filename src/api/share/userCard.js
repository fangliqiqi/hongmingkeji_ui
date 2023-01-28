import request from '@/utils/request'

// 查询用户卡券(未激活)列表
export function listUserCard(query) {
  return request({
    url: '/share/userCard/list',
    method: 'get',
    params: query
  })
}

// 查询用户卡券(未激活)详细
export function getUserCard(id) {
  return request({
    url: '/share/userCard/' + id,
    method: 'get'
  })
}

// 新增用户卡券(未激活)
export function addUserCard(data) {
  return request({
    url: '/share/userCard',
    method: 'post',
    data: data
  })
}

// 修改用户卡券(未激活)
export function updateUserCard(data) {
  return request({
    url: '/share/userCard',
    method: 'put',
    data: data
  })
}

// 删除用户卡券(未激活)
export function delUserCard(id) {
  return request({
    url: '/share/userCard/' + id,
    method: 'delete'
  })
}

// 导出用户卡券(未激活)
export function exportUserCard(query) {
  return request({
    url: '/share/userCard/export',
    method: 'get',
    params: query
  })
}
