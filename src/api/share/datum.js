import request from '@/utils/request'

// 查询购买活动单填写资料信息列表
export function listDatum(query) {
  return request({
    url: '/share/datum/list',
    method: 'get',
    params: query
  })
}

// 查询购买活动单填写资料信息详细
export function getDatum(id) {
  return request({
    url: '/share/datum/' + id,
    method: 'get'
  })
}

// 新增购买活动单填写资料信息
export function addDatum(data) {
  return request({
    url: '/share/datum',
    method: 'post',
    data: data
  })
}

// 修改购买活动单填写资料信息
export function updateDatum(data) {
  return request({
    url: '/share/datum',
    method: 'put',
    data: data
  })
}

// 删除购买活动单填写资料信息
export function delDatum(id) {
  return request({
    url: '/share/datum/' + id,
    method: 'delete'
  })
}

// 导出购买活动单填写资料信息
export function exportDatum(query) {
  return request({
    url: '/share/datum/export',
    method: 'get',
    params: query
  })
}