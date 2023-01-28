import request from '@/utils/request'

// 查询用户绑定的银行卡列表
export function listBank(query) {
  return request({
    url: '/share/bank/list',
    method: 'get',
    params: query
  })
}

// 查询用户绑定的银行卡详细
export function getBank(id) {
  return request({
    url: '/share/bank/' + id,
    method: 'get'
  })
}

// 新增用户绑定的银行卡
export function addBank(data) {
  return request({
    url: '/share/bank',
    method: 'post',
    data: data
  })
}

// 修改用户绑定的银行卡
export function updateBank(data) {
  return request({
    url: '/share/bank',
    method: 'put',
    data: data
  })
}

// 删除用户绑定的银行卡
export function delBank(id) {
  return request({
    url: '/share/bank/' + id,
    method: 'delete'
  })
}

// 导出用户绑定的银行卡
export function exportBank(query) {
  return request({
    url: '/share/bank/export',
    method: 'get',
    params: query
  })
}