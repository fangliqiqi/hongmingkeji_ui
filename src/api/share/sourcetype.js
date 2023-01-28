import request from '@/utils/request'

// 查询商机类型列表
export function listSourcetype(query) {
  return request({
    url: '/share/sourcetype/list',
    method: 'get',
    params: query
  })
}
//获取代理商查询条件下拉选
export function rzCompanyType(query) {
  return request({
    url: '/share/company/list',
    method: 'get',
    params: query
  })
}

// 查询商机类型详细
export function getSourcetype(id) {
  return request({
    url: '/share/sourcetype/' + id,
    method: 'get'
  })
}

// 新增商机类型
export function addSourcetype(data) {
  return request({
    url: '/share/sourcetype',
    method: 'post',
    data: data
  })
}

// 修改商机类型
export function updateSourcetype(data) {
  return request({
    url: '/share/sourcetype',
    method: 'put',
    data: data
  })
}

// 删除商机类型
export function delSourcetype(id) {
  return request({
    url: '/share/sourcetype/' + id,
    method: 'delete'
  })
}

// 导出商机类型
export function exportSourcetype(query) {
  return request({
    url: '/share/sourcetype/export',
    method: 'get',
    params: query
  })
}
