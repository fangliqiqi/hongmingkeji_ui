import request from '@/utils/request'

// 查询广告合作商列表
export function listDistributionChannel(query) {
  return request({
    url: '/share/distributionChannel/list',
    method: 'get',
    params: query
  })
}

// 查询广告合作商详细
export function getDistributionChannel(id) {
  return request({
    url: '/share/distributionChannel/' + id,
    method: 'get'
  })
}

// 新增广告合作商
export function addDistributionChannel(data) {
  return request({
    url: '/share/distributionChannel',
    method: 'post',
    data: data
  })
}

// 修改广告合作商
export function updateDistributionChannel(data) {
  return request({
    url: '/share/distributionChannel',
    method: 'put',
    data: data
  })
}

// 删除广告合作商
export function delDistributionChannel(id) {
  return request({
    url: '/share/distributionChannel/' + id,
    method: 'delete'
  })
}

// 导出广告合作商
export function exportDistributionChannel(query) {
  return request({
    url: '/share/distributionChannel/export',
    method: 'get',
    params: query
  })
}
  //渠道商 远程搜索查询
  export function getCompanyList(query) {
    return request({
      url: '/share/distributionChannel/companyList',
      method: 'get',
      params: query
    })
}
