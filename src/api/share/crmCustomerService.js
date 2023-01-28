import request from '@/utils/request'

// 查询客服专员列表
export function listCrmCustomerService(query) {
  return request({
    url: '/share/crmCustomerService/list',
    method: 'get',
    params: query
  })
}

// 查询客服专员详细
export function getCrmCustomerService(id) {
  return request({
    url: '/share/crmCustomerService/' + id,
    method: 'get'
  })
}

// 新增客服专员
export function addCrmCustomerService(data) {
  return request({
    url: '/share/crmCustomerService',
    method: 'post',
    data: data
  })
}

// 修改客服专员
export function updateCrmCustomerService(data) {
  return request({
    url: '/share/crmCustomerService',
    method: 'put',
    data: data
  })
}

// 删除客服专员
export function delCrmCustomerService(id) {
  return request({
    url: '/share/crmCustomerService/' + id,
    method: 'delete'
  })
}

// 导出客服专员
export function exportCrmCustomerService(query) {
  return request({
    url: '/share/crmCustomerService/export',
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
