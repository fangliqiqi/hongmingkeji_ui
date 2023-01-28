import request from '@/utils/request'

// 查询客服电话列表
export function listCustPhone(query) {
  return request({
    url: '/share/custPhone/list',
    method: 'get',
    params: query
  })
}

// 查询客服电话详细
export function getCustPhone(id) {
  return request({
    url: '/share/custPhone/' + id,
    method: 'get'
  })
}

// 新增客服电话
export function addCustPhone(data) {
  return request({
    url: '/share/custPhone',
    method: 'post',
    data: data
  })
}

// 修改客服电话
export function updateCustPhone(data) {
  return request({
    url: '/share/custPhone',
    method: 'put',
    data: data
  })
}

// 删除客服电话
export function delCustPhone(id) {
  return request({
    url: '/share/custPhone/' + id,
    method: 'delete'
  })
}

// 导出客服电话
export function exportCustPhone(query) {
  return request({
    url: '/share/custPhone/export',
    method: 'get',
    params: query
  })
}