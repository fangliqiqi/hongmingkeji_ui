import request from '@/utils/request'

// 查询流程操作详情列表
export function listCrmUserPair(query) {
  return request({
    url: '/share/crmUserPair/list',
    method: 'get',
    params: query
  })
}

// 查询流程操作详情详细
export function getCrmUserPair(id) {
  return request({
    url: '/share/crmUserPair/' + id,
    method: 'get'
  })
}

// 新增流程操作详情
export function addCrmUserPair(data) {
  return request({
    url: '/share/crmUserPair',
    method: 'post',
    data: data
  })
}

// 修改流程操作详情
export function updateCrmUserPair(data) {
  return request({
    url: '/share/crmUserPair',
    method: 'put',
    data: data
  })
}

// 删除流程操作详情
export function delCrmUserPair(id) {
  return request({
    url: '/share/crmUserPair/' + id,
    method: 'delete'
  })
}

// 导出流程操作详情
export function exportCrmUserPair(query) {
  return request({
    url: '/share/crmUserPair/export',
    method: 'get',
    params: query
  })
}