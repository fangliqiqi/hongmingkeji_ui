import request from '@/utils/request'

// 查询用户钱包列表
export function listCompanyWallet(query) {
  return request({
    url: '/share/companyWallet/list',
    method: 'get',
    params: query
  })
}

// 查询用户钱包详细
export function getCompanyWallet(id) {
  return request({
    url: '/share/companyWallet/' + id,
    method: 'get'
  })
}

// 新增用户钱包
export function addCompanyWallet(data) {
  return request({
    url: '/share/companyWallet',
    method: 'post',
    data: data
  })
}

// 修改用户钱包
export function updateCompanyWallet(data) {
  return request({
    url: '/share/companyWallet',
    method: 'put',
    data: data
  })
}

// 删除用户钱包
export function delCompanyWallet(id) {
  return request({
    url: '/share/companyWallet/' + id,
    method: 'delete'
  })
}

// 导出用户钱包
export function exportCompanyWallet(query) {
  return request({
    url: '/share/companyWallet/export',
    method: 'get',
    params: query
  })
}