import request from '@/utils/request'

// 查询直销分成比例列表
export function listDistributionProportion(query) {
  return request({
    url: '/share/distributionProportion/list',
    method: 'get',
    params: query
  })
}

// 查询直销分成比例详细
export function getDistributionProportion(id) {
  return request({
    url: '/share/distributionProportion/' + id,
    method: 'get'
  })
}

// 新增直销分成比例
export function addDistributionProportion(data) {
  return request({
    url: '/share/distributionProportion',
    method: 'post',
    data: data
  })
}

// 修改直销分成比例
export function updateDistributionProportion(data) {
  return request({
    url: '/share/distributionProportion',
    method: 'put',
    data: data
  })
}

// 删除直销分成比例
export function delDistributionProportion(id) {
  return request({
    url: '/share/distributionProportion/' + id,
    method: 'delete'
  })
}

// 导出直销分成比例
export function exportDistributionProportion(query) {
  return request({
    url: '/share/distributionProportion/export',
    method: 'get',
    params: query
  })
}