import request from '@/utils/request'

// 查询活动订单列表
export function listActivityOrder(query) {
  return request({
    url: '/share/activityOrder/list',
    method: 'get',
    params: query
  })
}

// 查询活动订单详细
export function getActivityOrder(id) {
  return request({
    url: '/share/activityOrder/' + id,
    method: 'get'
  })
}

// 新增活动订单
export function addActivityOrder(data) {
  return request({
    url: '/share/activityOrder',
    method: 'post',
    data: data
  })
}

// 修改活动订单
export function updateActivityOrder(data) {
  return request({
    url: '/share/activityOrder',
    method: 'put',
    data: data
  })
}

// 删除活动订单
export function delActivityOrder(id) {
  return request({
    url: '/share/activityOrder/' + id,
    method: 'delete'
  })
}

// 导出活动订单
export function exportActivityOrder(query) {
  return request({
    url: '/share/activityOrder/export',
    method: 'get',
    params: query
  })
}
// 活动订单完成
export function processStateFun(data) {
  return request({
    url: '/share/activityOrder/processState',
    method: 'post',
    data: data
  })
}
