import request from '@/utils/request'

// 查询用户钱包列表
export function listPayWallet(query) {
  return request({
    url: '/share/payWallet/list',
    method: 'get',
    params: query
  })
}

// 查询用户钱包详细
export function getPayWallet(id) {
  return request({
    url: '/share/payWallet/' + id,
    method: 'get'
  })
}

// 新增用户钱包
export function addPayWallet(data) {
  return request({
    url: '/share/payWallet',
    method: 'post',
    data: data
  })
}

// 修改用户钱包
export function updatePayWallet(data) {
  return request({
    url: '/share/payWallet',
    method: 'put',
    data: data
  })
}

// 删除用户钱包
export function delPayWallet(id) {
  return request({
    url: '/share/payWallet/' + id,
    method: 'delete'
  })
}

// 导出用户钱包
export function exportPayWallet(query) {
  return request({
    url: '/share/payWallet/export',
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
    url: '/share/payWallet/companyList',
    method: 'get',
    params: query
  })
}
