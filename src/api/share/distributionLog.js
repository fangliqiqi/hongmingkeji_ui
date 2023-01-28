import request from '@/utils/request'

// 查询分佣记录列表
export function listDistributionLog(query) {
  return request({
    url: '/share/distributionLog/list',
    method: 'get',
    params: query
  })
}

// 查询分佣记录详细
export function getDistributionLog(id) {
  return request({
    url: '/share/distributionLog/' + id,
    method: 'get'
  })
}

// 新增分佣记录
export function addDistributionLog(data) {
  return request({
    url: '/share/distributionLog',
    method: 'post',
    data: data
  })
}

// 修改分佣记录
export function updateDistributionLog(data) {
  return request({
    url: '/share/distributionLog',
    method: 'put',
    data: data
  })
}

// 删除分佣记录
export function delDistributionLog(id) {
  return request({
    url: '/share/distributionLog/' + id,
    method: 'delete'
  })
}

// 导出分佣记录
export function exportDistributionLog(query) {
  return request({
    url: '/share/distributionLog/export',
    method: 'get',
    params: query
  })
}