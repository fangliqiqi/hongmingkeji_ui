import request from '@/utils/request'

// 查询招商意向资源列表
export function listBusinessSource(query) {
  return request({
    url: '/share/businessSource/list',
    method: 'get',
    params: query
  })
}

// 查询招商意向资源详细
export function getBusinessSource(id) {
  return request({
    url: '/share/businessSource/' + id,
    method: 'get'
  })
}

// 新增招商意向资源
export function addBusinessSource(data) {
  return request({
    url: '/share/businessSource',
    method: 'post',
    data: data
  })
}

// 修改招商意向资源
export function updateBusinessSource(data) {
  return request({
    url: '/share/businessSource',
    method: 'put',
    data: data
  })
}

// 删除招商意向资源
export function delBusinessSource(id) {
  return request({
    url: '/share/businessSource/' + id,
    method: 'delete'
  })
}

// 导出招商意向资源
export function exportBusinessSource(query) {
  return request({
    url: '/share/businessSource/export',
    method: 'get',
    params: query
  })
}

// 远程模糊查询 
export function getBusinessnameList(query) {
  return request({
    url: '/share/businessSource/businessSourceList',
    method: 'get',
    params: query
  })
}

//查询跟进记录
export function getFollowupList(id) {
  return request({
    url: '/share/businessSource/followList/'+id,
    method: 'get'
  })
}

//新增跟进记录
export function addFollowup(data) {
  return request({
    url: '/share/businessSource/business',
    method: 'post',
    data: data
  })
}
