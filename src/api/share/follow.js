import request from '@/utils/request'

// 查询资源回馈列表

export function listFollow(query) {
  return request({
    url: '/share/follow/list',
    method: 'get',
    params: query
  })
}

// 查询资源回馈详细
export function getFollow(id) {
  return request({
    url: '/share/follow/' + id,
    method: 'get'
  })
}
// 查询资源回馈详细
export function getFollowlist(query) {
  return request({
    url: '/share/follow/followlist',
    method: 'get',
    params: query
  })
}

// 招商渠道跟踪目录
export function getChannelCompanyFollowlist(query) {
  return request({
    url: '/share/channelCompany/followlist',
    method: 'get',
    params: query
  })
}

// 资源跟进跟踪目录

export function getChannelCompanyMulv(query) {
  return request({
    url: '/share/channelSource/customer/followlist',
    method: 'get',
    params: query
  })
}

// 渠道合作新增资源回馈
export function addChannelCompanyFollow(data) {
  return request({
    url: '/share/channelCompany',
    method: 'post',
    data: data
  })
}

// 新增资源回馈
export function addFollow(data) {
  return request({
    url: '/share/follow',
    method: 'post',
    data: data
  })
}

// 修改资源回馈
export function updateFollow(data) {
  return request({
    url: '/share/follow',
    method: 'put',
    data: data
  })
}

// 删除资源回馈
export function delFollow(id) {
  return request({
    url: '/share/follow/' + id,
    method: 'delete'
  })
}

// 导出资源回馈
export function exportFollow(query) {
  return request({
    url: '/share/follow/export',
    method: 'get',
    params: query
  })
}
