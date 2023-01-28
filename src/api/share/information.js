import request from '@/utils/request'

// 查询认证信息列表
export function listInformation(query) {
  return request({
    url: '/share/information/list',
    method: 'get',
    params: query
  })
}

// 查询认证信息详细
export function getInformation(id) {
  return request({
    url: '/share/information/' + id,
    method: 'get'
  })
}

// 新增认证信息
export function addInformation(data) {
  return request({
    url: '/share/information',
    method: 'post',
    data: data
  })
}

// 修改认证信息
export function updateInformation(data) {
  return request({
    url: '/share/information',
    method: 'put',
    data: data
  })
}

// 删除认证信息
export function delInformation(id) {
  return request({
    url: '/share/information/' + id,
    method: 'delete'
  })
}

// 导出认证信息
export function exportInformation(query) {
  return request({
    url: '/share/information/export',
    method: 'get',
    params: query
  })
}