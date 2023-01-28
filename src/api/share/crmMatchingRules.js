import request from '@/utils/request'

// 查询业务流程规则列表
export function listCrmMatchingRules(query) {
  return request({
    url: '/share/crmMatchingRules/list',
    method: 'get',
    params: query
  })
}

// 查询业务流程规则详细
export function getCrmMatchingRules(id) {
  return request({
    url: '/share/crmMatchingRules/' + id,
    method: 'get'
  })
}

// 新增业务流程规则
export function addCrmMatchingRules(data) {
  return request({
    url: '/share/crmMatchingRules',
    method: 'post',
    data: data
  })
}

// 修改业务流程规则
export function updateCrmMatchingRules(data) {
  return request({
    url: '/share/crmMatchingRules',
    method: 'put',
    data: data
  })
}

// 删除业务流程规则
export function delCrmMatchingRules(id) {
  return request({
    url: '/share/crmMatchingRules/' + id,
    method: 'delete'
  })
}

// 导出业务流程规则
export function exportCrmMatchingRules(query) {
  return request({
    url: '/share/crmMatchingRules/export',
    method: 'get',
    params: query
  })
}