import request from '@/utils/request'

// 查询商机类型列表
export function listChannelType(query) {
  return request({
    url: '/share/channelType/list',
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


// 查询商机类型详细
export function getChannelType(id) {
  return request({
    url: '/share/channelType/' + id,
    method: 'get'
  })
}

// 新增商机类型
export function addChannelType(data) {
  return request({
    url: '/share/channelType',
    method: 'post',
    data: data
  })
}

// 修改商机类型
export function updateChannelType(data) {
  return request({
    url: '/share/channelType',
    method: 'put',
    data: data
  })
}

// 删除商机类型
export function delChannelType(id) {
  return request({
    url: '/share/channelType/' + id,
    method: 'delete'
  })
}

// 导出商机类型
export function exportChannelType(query) {
  return request({
    url: '/share/channelType/export',
    method: 'get',
    params: query
  })
}