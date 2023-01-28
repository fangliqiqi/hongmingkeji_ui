import request from '@/utils/request'

// 查询消息下发记录列表
export function listReceiving(query) {
  return request({
    url: '/share/receiving/list',
    method: 'get',
    params: query
  })
}

// 查询消息下发记录详细
export function getReceiving(id) {
  return request({
    url: '/share/receiving/' + id,
    method: 'get'
  })
}

// 新增消息下发记录
export function addReceiving(data) {
  return request({
    url: '/share/receiving',
    method: 'post',
    data: data
  })
}

// 修改消息下发记录
export function updateReceiving(data) {
  return request({
    url: '/share/receiving',
    method: 'put',
    data: data
  })
}

// 删除消息下发记录
export function delReceiving(id) {
  return request({
    url: '/share/receiving/' + id,
    method: 'delete'
  })
}

// 导出消息下发记录
export function exportReceiving(query) {
  return request({
    url: '/share/receiving/export',
    method: 'get',
    params: query
  })
}