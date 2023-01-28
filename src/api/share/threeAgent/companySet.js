import request from '@/utils/request'

// 查询合作商统计列表
export function listCompanyCount(query) {
  return request({
    url: '/share/AgentCompany/list',
    method: 'get',
    params: query
  })
}

// 查询合作商统计详细
export function getCompanyCount(id) {
  return request({
    url: '/share/AgentCompany/' + id,
    method: 'get'
  })
}

// 新增合作商统计
export function addCompanyCount(data) {
  return request({
    url: '/share/AgentCompany/addOrUpdate4Web',
    method: 'post',
    data: data
  })
}

// 修改合作商统计
export function updateCompanyCount(data) {
  return request({
    url: '/share/AgentCompany/addOrUpdate4Web',
    method: 'post',
    data: data
  })
}

// 删除合作商统计
export function delCompanyCount(id) {
  return request({
    url: '/share/AgentCompany/' + id,
    method: 'delete'
  })
}

// 导出合作商统计
export function exportCompanyCount(query) {
  return request({
    url: '/share/AgentCompany/export',
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
