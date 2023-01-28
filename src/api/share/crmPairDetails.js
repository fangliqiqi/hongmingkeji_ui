import request from '@/utils/request'

// 查询业务流程处理权限配置列表
export function listCrmPairDetails(query) {
  return request({
    url: '/share/crmPairDetails/list',
    method: 'get',
    params: query
  })
}

// 查询业务流程处理权限配置详细
export function getCrmPairDetails(id) {
  return request({
    url: '/share/crmPairDetails/' + id,
    method: 'get'
  })
}

// 新增业务流程处理权限配置
export function addCrmPairDetails(data) {
  return request({
    url: '/share/crmPairDetails',
    method: 'post',
    data: data
  })
}

// 修改业务流程处理权限配置
export function updateCrmPairDetails(data) {
  return request({
    url: '/share/crmPairDetails',
    method: 'put',
    data: data
  })
}

// 删除业务流程处理权限配置
export function delCrmPairDetails(id) {
  return request({
    url: '/share/crmPairDetails/' + id,
    method: 'delete'
  })
}

// 导出业务流程处理权限配置
export function exportCrmPairDetails(query) {
  return request({
    url: '/share/crmPairDetails/export',
    method: 'get',
    params: query
  })
}