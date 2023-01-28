import request from '@/utils/request'

// 查询订阅消息推送日志列表
export function listWxMessageLog(query) {
  return request({
    url: '/share/wxMessageLog/list',
    method: 'get',
    params: query
  })
}

// 查询订阅消息推送日志详细
export function getWxMessageLog(id) {
  return request({
    url: '/share/wxMessageLog/' + id,
    method: 'get'
  })
}

// 新增订阅消息推送日志
export function addWxMessageLog(data) {
  return request({
    url: '/share/wxMessageLog',
    method: 'post',
    data: data
  })
}

// 修改订阅消息推送日志
export function updateWxMessageLog(data) {
  return request({
    url: '/share/wxMessageLog',
    method: 'put',
    data: data
  })
}

// 删除订阅消息推送日志
export function delWxMessageLog(id) {
  return request({
    url: '/share/wxMessageLog/' + id,
    method: 'delete'
  })
}

// 导出订阅消息推送日志
export function exportWxMessageLog(query) {
  return request({
    url: '/share/wxMessageLog/export',
    method: 'get',
    params: query
  })
}