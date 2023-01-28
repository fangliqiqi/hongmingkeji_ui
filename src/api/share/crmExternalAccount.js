import request from '@/utils/request'

// 查询外账会计列表
export function listCrmExternalAccount(query) {
  return request({
    url: '/share/crmExternalAccount/list',
    method: 'get',
    params: query
  })
}

// 查询外账会计详细
export function getCrmExternalAccount(id) {
  return request({
    url: '/share/crmExternalAccount/' + id,
    method: 'get'
  })
}

// 新增外账会计
export function addCrmExternalAccount(data) {
  return request({
    url: '/share/crmExternalAccount',
    method: 'post',
    data: data
  })
}

// 修改外账会计
export function updateCrmExternalAccount(data) {
  return request({
    url: '/share/crmExternalAccount',
    method: 'put',
    data: data
  })
}

// 删除外账会计
export function delCrmExternalAccount(id) {
  return request({
    url: '/share/crmExternalAccount/' + id,
    method: 'delete'
  })
}

// 导出外账会计
export function exportCrmExternalAccount(query) {
  return request({
    url: '/share/crmExternalAccount/export',
    method: 'get',
    params: query
  })
}

//根据部门id 查相关人员
export function getCrmrelatedList(query) {
  return request({
    url: '/crm/user/userList',
    method: 'get',
    params: query
  })
}