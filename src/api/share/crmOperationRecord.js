import request from '@/utils/request'

// 查询业务订单处理操作记录列表
export function listCrmOperationRecord(query) {
  return request({
    url: '/share/crmOperationRecord/list',
    method: 'get',
    params: query
  })
}

// 查询业务订单处理操作记录详细
export function getCrmOperationRecord(id) {
  return request({
    url: '/share/crmOperationRecord/' + id,
    method: 'get'
  })
}

// 新增业务订单处理操作记录
export function addCrmOperationRecord(data) {
  return request({
    url: '/share/crmOperationRecord',
    method: 'post',
    data: data
  })
}

// 修改业务订单处理操作记录
export function updateCrmOperationRecord(data) {
  return request({
    url: '/share/crmOperationRecord',
    method: 'put',
    data: data
  })
}

// 删除业务订单处理操作记录
export function delCrmOperationRecord(id) {
  return request({
    url: '/share/crmOperationRecord/' + id,
    method: 'delete'
  })
}

// 导出业务订单处理操作记录
export function exportCrmOperationRecord(query) {
  return request({
    url: '/share/crmOperationRecord/export',
    method: 'get',
    params: query
  })
}