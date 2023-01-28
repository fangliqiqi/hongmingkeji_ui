import request from '@/utils/request'

// 查询充值赠送规则列表
export function listAgentRechargePresentedRule(query) {
  return request({
    url: '/share/agentRechargePresentedRule/list',
    method: 'get',
    params: query
  })
}

// 查询充值赠送规则详细
export function getAgentRechargePresentedRule(id) {
  return request({
    url: '/share/agentRechargePresentedRule/' + id,
    method: 'get'
  })
}

// 新增充值赠送规则
export function addAgentRechargePresentedRule(data) {
  return request({
    url: '/share/agentRechargePresentedRule',
    method: 'post',
    data: data
  })
}

// 修改充值赠送规则
export function updateAgentRechargePresentedRule(data) {
  return request({
    url: '/share/agentRechargePresentedRule',
    method: 'put',
    data: data
  })
}

// 删除充值赠送规则
export function delAgentRechargePresentedRule(id) {
  return request({
    url: '/share/agentRechargePresentedRule/' + id,
    method: 'delete'
  })
}

// 导出充值赠送规则
export function exportAgentRechargePresentedRule(query) {
  return request({
    url: '/share/agentRechargePresentedRule/export',
    method: 'get',
    params: query
  })
}
