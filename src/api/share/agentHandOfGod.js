import request from '@/utils/request'

// 查询特殊价格设置列表
export function listAgentHandOfGod(query) {
  return request({
    url: '/share/agentHandOfGod/list',
    method: 'get',
    params: query
  })
}

// 查询特殊价格设置详细
export function getAgentHandOfGod(id) {
  return request({
    url: '/share/agentHandOfGod/' + id,
    method: 'get'
  })
}

// 新增特殊价格设置
export function addAgentHandOfGod(data) {
  return request({
    url: '/share/agentHandOfGod',
    method: 'post',
    data: data
  })
}

// 修改特殊价格设置
export function updateAgentHandOfGod(data) {
  return request({
    url: '/share/agentHandOfGod',
    method: 'put',
    data: data
  })
}

// 删除特殊价格设置
export function delAgentHandOfGod(id) {
  return request({
    url: '/share/agentHandOfGod/' + id,
    method: 'delete'
  })
}

// 导出特殊价格设置
export function exportAgentHandOfGod(query) {
  return request({
    url: '/share/agentHandOfGod/export',
    method: 'get',
    params: query
  })
}

//查询用户列表 远程搜索
export function getUserList(query) {
  return request({
    url: '/share/agentHandOfGod/queryUserList',
    method: 'get',
    params: query
  })
}

// 查询角色列表  远程搜索：
export function getRoleList(query) {
  return request({
    url: '/share/agentHandOfGod/queryRoleList',
    method: 'get',
    params: query
  })
}

// 特殊价格 立即生效：
export function getImmediate(query) {
  return request({
    url: '/share/agentHandOfGod/immediatelyDispose',
    method: 'get',
    params: query
  })
}
