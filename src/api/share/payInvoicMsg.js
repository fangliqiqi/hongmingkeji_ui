import request from '@/utils/request'

// 查询开票信息列表
export function listPayInvoicMsg(query) {
  return request({
    url: '/share/payInvoicMsg/list',
    method: 'get',
    params: query
  })
}

// 查询开票信息详细
export function getPayInvoicMsg(id) {
  return request({
    url: '/share/payInvoicMsg/' + id,
    method: 'get'
  })
}

// 新增开票信息
export function addPayInvoicMsg(data) {
  return request({
    url: '/share/payInvoicMsg',
    method: 'post',
    data: data
  })
}

// 修改开票信息
export function updatePayInvoicMsg(data) {
  return request({
    url: '/share/payInvoicMsg',
    method: 'put',
    data: data
  })
}

// 删除开票信息
export function delPayInvoicMsg(id) {
  return request({
    url: '/share/payInvoicMsg/' + id,
    method: 'delete'
  })
}

// 导出开票信息
export function exportPayInvoicMsg(query) {
  return request({
    url: '/share/payInvoicMsg/export',
    method: 'get',
    params: query
  })
}