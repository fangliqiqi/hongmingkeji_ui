import request from '@/utils/request'

// 查询商机类型中间列表
export function listChannelSourceType(query) {
  return request({
    url: '/share/channelSourceType/list',
    method: 'get',
    params: query
  })
}

//获取代理商查询条件下拉选
export function rzCompanyType(query) {
  return request({
    url: '/share/company/list',
    method: 'get',
    params: query
  })
}

// 查询商机类型中间详细
export function getChannelSourceType(id) {
  return request({
    url: '/share/channelSourceType/' + id,
    method: 'get'
  })
}

// 新增商机类型中间
export function addChannelSourceType(data) {
  return request({
    url: '/share/channelSourceType',
    method: 'post',
    data: data
  })
}

// 修改商机类型中间
export function updateChannelSourceType(data) {
  return request({
    url: '/share/channelSourceType',
    method: 'put',
    data: data
  })
}

// 删除商机类型中间
export function delChannelSourceType(id) {
  return request({
    url: '/share/channelSourceType/' + id,
    method: 'delete'
  })
}

// 导出商机类型中间
export function exportChannelSourceType(query) {
  return request({
    url: '/share/channelSourceType/export',
    method: 'get',
    params: query
  })
}
//远程查询
export function getCompanyList(query) {
  return request({
    url: '/share/channelSourceType/companyList',
    method: 'get',
    params: query
  })
}