import request from '@/utils/request'

// 查询订单补款记录列表
export function listFillingmoney(query) {
  return request({
    url: '/share/fillingmoney/list',
    method: 'get',
    params: query
  })
}

// 查询订单补款记录详细
export function getFillingmoney(id) {
  return request({
    url: '/share/fillingmoney/' + id,
    method: 'get'
  })
}

// 新增订单补款记录
export function addFillingmoney(data) {
  return request({
    url: '/share/fillingmoney',
    method: 'post',
    data: data
  })
}

// 修改订单补款记录
export function updateFillingmoney(data) {
  return request({
    url: '/share/fillingmoney',
    method: 'put',
    data: data
  })
}

// 删除订单补款记录
export function delFillingmoney(id) {
  return request({
    url: '/share/fillingmoney/' + id,
    method: 'delete'
  })
}

// 导出订单补款记录
export function exportFillingmoney(query) {
  return request({
    url: '/share/fillingmoney/export',
    method: 'get',
    params: query
  })
}