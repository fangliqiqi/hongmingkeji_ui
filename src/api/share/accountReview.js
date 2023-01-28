import request from '@/utils/request'

// 查询入账审核列表
export function listAccountReview(query) {
  return request({
    url: '/share/accountReview/list',
    method: 'get',
    params: query
  })
}

// 查询入账审核详细
export function getAccountReview(id) {
  return request({
    url: '/share/accountReview/' + id,
    method: 'get'
  })
}

// 新增入账审核
export function addAccountReview(data) {
  return request({
    url: '/share/accountReview',
    method: 'post',
    data: data
  })
}

// 修改入账审核
export function updateAccountReview(data) {
  return request({
    url: '/share/accountReview',
    method: 'put',
    data: data
  })
}

// 删除入账审核
export function delAccountReview(id) {
  return request({
    url: '/share/accountReview/' + id,
    method: 'delete'
  })
}

// 导出入账审核
export function exportAccountReview(query) {
  return request({
    url: '/share/accountReview/export',
    method: 'get',
    params: query
  })
}
  export function getAgentTypeLv(query) {
    return request({
      url: '/share/sourcetype/listTypeLv',
      method: 'get',
      params: query
    })
}

//获取公司信息

export function getCompanyList(query) {
  return request({
    url: '/share/company/companyList',
    method: 'get',
    params: query
  })
}

// 远程查询
export function getAccountList(query) {
  return request({
    url: '/share/accountReview/companyList',
    method: 'get',
    params: query
  })
}
