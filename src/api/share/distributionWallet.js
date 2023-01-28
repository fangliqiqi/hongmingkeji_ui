import request from '@/utils/request'

// 查询广告合作商佣金列表
export function listDistributionWallet(query) {
  return request({
    url: '/share/distributionWallet/list',
    method: 'get',
    params: query
  })
}

// 查询广告合作商佣金详细
export function getDistributionWallet(userId) {
  return request({
    url: '/share/distributionWallet/' + userId,
    method: 'get'
  })
}

// 新增广告合作商佣金
export function addDistributionWallet(data) {
  return request({
    url: '/share/distributionWallet',
    method: 'post',
    data: data
  })
}

// 修改广告合作商佣金
export function updateDistributionWallet(data) {
  return request({
    url: '/share/distributionWallet',
    method: 'put',
    data: data
  })
}

// 删除广告合作商佣金
export function delDistributionWallet(userId) {
  return request({
    url: '/share/distributionWallet/' + userId,
    method: 'delete'
  })
}

// 导出广告合作商佣金
export function exportDistributionWallet(query) {
  return request({
    url: '/share/distributionWallet/export',
    method: 'get',
    params: query
  })
}