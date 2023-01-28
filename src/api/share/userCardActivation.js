import request from '@/utils/request'

// 查询用户卡券(已激活)列表
export function listUserCardActivation(query) {
  return request({
    url: '/share/userCardActivationBusiness/list',
    method: 'get',
    params: query
  })
}


// 查询用户卡券(已激活)详细
export function getUserCardActivation(query) {
  return request({
    url: '/share/userCardActivation/',
    method: 'get',
    params: query
  })
}

// 卡券核销
export function cancelUserCardActivation(query) {
  return request({
    url: '/share/userCardActivationBusiness/chargeOff4PC',
    method: 'get',
    params: query
  })
}

// 新增用户卡券(已激活)
export function addUserCardActivation(data) {
  return request({
    url: '/share/userCardActivation',
    method: 'post',
    data: data
  })
}

// 修改用户卡券(已激活)
export function updateUserCardActivation(data) {
  return request({
    url: '/share/userCardActivation',
    method: 'put',
    data: data
  })
}

// 删除用户卡券(已激活)
export function delUserCardActivation(id) {
  return request({
    url: '/share/userCardActivation/' + id,
    method: 'delete'
  })
}

// 导出用户卡券(已激活)
export function exportUserCardActivation(query) {
  return request({
    url: '/share/userCardActivation/export',
    method: 'get',
    params: query
  })
}
