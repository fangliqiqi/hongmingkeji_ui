import request from '@/utils/request'

// 查询代理人订单列表
export function listAgentOrderPermissionUser(query) {
  return request({
    url: '/share/agentOrderPermissionUser/list',
    method: 'get',
    params: query
  })
}

// 查询代理人订单详细
export function getAgentOrderPermissionUser(userId) {
  return request({
    url: '/share/agentOrderPermissionUser/' + userId,
    method: 'get'
  })
}

// 新增代理人订单
export function addAgentOrderPermissionUser(data) {
  return request({
    url: '/share/agentOrderPermissionUser',
    method: 'post',
    data: data
  })
}

// 修改代理人订单
export function updateAgentOrderPermissionUser(data) {
  return request({
    url: '/share/agentOrderPermissionUser',
    method: 'put',
    data: data
  })
}

// 删除代理人订单
export function delAgentOrderPermissionUser(userId) {
  return request({
    url: '/share/agentOrderPermissionUser/' + userId,
    method: 'delete'
  })
}

// 导出代理人订单
export function exportAgentOrderPermissionUser(query) {
  return request({
    url: '/share/agentOrderPermissionUser/export',
    method: 'get',
    params: query
  })
}
// 模糊查询 代理人信息
export function queryUserList(query) {
  return request({
    url: '/share/agentHandOfGod/queryUserList',
    method: 'get',
    params: query
  })
}
