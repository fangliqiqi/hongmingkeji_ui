import request from '@/utils/request'

// 查询登录小提示列表
export function listTipsMessage(query) {
  return request({
    url: '/share/tipsMessage/list',
    method: 'get',
    params: query
  })
}

// 查询登录小提示详细
export function getTipsMessage(id) {
  return request({
    url: '/share/tipsMessage/' + id,
    method: 'get'
  })
}

// 新增登录小提示
export function addTipsMessage(data) {
  return request({
    url: '/share/tipsMessage',
    method: 'post',
    data: data
  })
}

// 修改登录小提示
export function updateTipsMessage(data) {
  return request({
    url: '/share/tipsMessage',
    method: 'put',
    data: data
  })
}

// 删除登录小提示
export function delTipsMessage(id) {
  return request({
    url: '/share/tipsMessage/' + id,
    method: 'delete'
  })
}

// 导出登录小提示
export function exportTipsMessage(query) {
  return request({
    url: '/share/tipsMessage/export',
    method: 'get',
    params: query
  })
}