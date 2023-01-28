import request from '@/utils/request'

// 查询外勤办事员列表
export function listCrmClerk(query) {
  return request({
    url: '/share/crmClerk/list',
    method: 'get',
    params: query
  })
}

// 查询外勤办事员详细
export function getCrmClerk(id) {
  return request({
    url: '/share/crmClerk/' + id,
    method: 'get'
  })
}

// 新增外勤办事员
export function addCrmClerk(data) {
  return request({
    url: '/share/crmClerk',
    method: 'post',
    data: data
  })
}

// 修改外勤办事员
export function updateCrmClerk(data) {
  return request({
    url: '/share/crmClerk',
    method: 'put',
    data: data
  })
}

// 删除外勤办事员
export function delCrmClerk(id) {
  return request({
    url: '/share/crmClerk/' + id,
    method: 'delete'
  })
}

// 导出外勤办事员
export function exportCrmClerk(query) {
  return request({
    url: '/share/crmClerk/export',
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
