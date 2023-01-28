import request from '@/utils/request'

// 查询用户钱包列表
export function listChannelWallet(query) {
  return request({
    url: '/share/channelWallet/list',
    method: 'get',
    params: query
  })
}

// 查询用户钱包详细
export function getChannelWallet(id) {
  return request({
    url: '/share/channelWallet/' + id,
    method: 'get'
  })
}

// 新增用户钱包
export function addChannelWallet(data) {
  return request({
    url: '/share/channelWallet',
    method: 'post',
    data: data
  })
}

// 修改用户钱包
export function updateChannelWallet(data) {
  return request({
    url: '/share/channelWallet',
    method: 'put',
    data: data
  })
}

// 删除用户钱包
export function delChannelWallet(id) {
  return request({
    url: '/share/channelWallet/' + id,
    method: 'delete'
  })
}

// 导出用户钱包
export function exportChannelWallet(query) {
  return request({
    url: '/share/channelWallet/export',
    method: 'get',
    params: query
  })
}
//最近金额预警
export function addFundWarning(data) {
  return request({
    url: '/share/companyFundWarning/editwarningAmount',
    method:'put',
    data: data
  })
}

//远程搜索
export function getCompanyList(query) {
  return request({
    url: '/share/channelWallet/companyList',
    method: 'get',
    params: query
  })
}