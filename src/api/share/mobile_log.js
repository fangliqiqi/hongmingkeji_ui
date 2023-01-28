import request from '@/utils/request'

// 查询短信日志列表
export function listMobile_log(query) {
  return request({
    url: '/share/mobile_log/list',
    method: 'get',
    params: query
  })
}

// 查询短信日志详细
export function getMobile_log(id) {
  return request({
    url: '/share/mobile_log/' + id,
    method: 'get'
  })
}

// 新增短信日志
export function addMobile_log(data) {
  return request({
    url: '/share/mobile_log',
    method: 'post',
    data: data
  })
}

// 修改短信日志
export function updateMobile_log(data) {
  return request({
    url: '/share/mobile_log',
    method: 'put',
    data: data
  })
}

// 删除短信日志
export function delMobile_log(id) {
  return request({
    url: '/share/mobile_log/' + id,
    method: 'delete'
  })
}

// 导出短信日志
export function exportMobile_log(query) {
  return request({
    url: '/share/mobile_log/export',
    method: 'get',
    params: query
  })
}