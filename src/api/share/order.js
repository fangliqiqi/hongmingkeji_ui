import request from '@/utils/request'

// 查询订单列表列表
export function listOrder(query) {
  return request({
    url: '/share/order/list',
    method: 'get',
    params: query
  })
}

// 查询订单列表详细
export function getOrder(id) {
  return request({
    url: '/share/order/' + id,
    method: 'get'
  })
}

// 新增订单列表
export function addOrder(data) {
  return request({
    url: '/share/order',
    method: 'post',
    data: data
  })
}

// 修改订单列表
export function updateOrder(data) {
  return request({
    url: '/share/order',
    method: 'put',
    data: data
  })
}

// 删除订单列表
export function delOrder(id) {
  return request({
    url: '/share/order/' + id,
    method: 'delete'
  })
}

// 导出订单列表
export function exportOrder(query) {
  return request({
    url: '/share/order/export',
    method: 'get',
    params: query
  })
}
