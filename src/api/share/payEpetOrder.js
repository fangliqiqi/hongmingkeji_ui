import request from '@/utils/request'

// 查询出入账记录列表
export function listPayEpetOrder(query) {
  return request({
    url: '/share/payEpetOrder/list',
    method: 'get',
    params: query
  })
}

// 查询出入账记录详细
export function getPayEpetOrder(id) {
  return request({
    url: '/share/payEpetOrder/' + id,
    method: 'get'
  })
}

// 新增出入账记录
export function addPayEpetOrder(data) {
  return request({
    url: '/share/payEpetOrder',
    method: 'post',
    data: data
  })
}

// 修改出入账记录
export function updatePayEpetOrder(data) {
  return request({
    url: '/share/payEpetOrder',
    method: 'put',
    data: data
  })
}

// 删除出入账记录
export function delPayEpetOrder(id) {
  return request({
    url: '/share/payEpetOrder/' + id,
    method: 'delete'
  })
}

// 导出出入账记录
export function exportPayEpetOrder(query) {
  return request({
    url: '/share/payEpetOrder/export',
    method: 'get',
    params: query
  })
}


export function getAgentTypeLv(query) {
  return request({
    url: '/share/sourcetype/listTypeLv',
    method: 'get',
    params: query
  })
}

// 远程查询
export function getEpetOrderList(query) {
  return request({
    url: '/share/payEpetOrder/companyList',
    method: 'get',
    params: query
  })
}
