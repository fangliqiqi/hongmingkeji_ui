import request from '@/utils/request'

// 查询分销意向代理人订单列表
export function listAgentIntentionOrder(query) {
  return request({
    url: '/share/agentIntentionOrder/listNoAgent',
    method: 'get',
    params: query
  })
}

// 查询分销意向订单详细
export function getAgentIntentionOrder(id) {
  return request({
    url: '/share/agentIntentionOrder/' + id,
    method: 'get'
  })
}

// 新增分销意向订单
export function addAgentIntentionOrder(data) {
  return request({
    url: '/share/agentIntentionOrder',
    method: 'post',
    data: data
  })
}

// 修改分销意向订单
export function updateAgentIntentionOrder(data) {
  return request({
    url: '/share/agentIntentionOrder',
    method: 'put',
    data: data
  })
}

// 删除分销意向订单
export function delAgentIntentionOrder(id) {
  return request({
    url: '/share/agentIntentionOrder/' + id,
    method: 'delete'
  })
}

// 导出分销意向订单
export function exportAgentIntentionOrder(query) {
  return request({
    url: '/share/agentIntentionOrder/export',
    method: 'get',
    params: query
  })
}

// 转订单
export function Turnorder(query) {
  return request({
    url: '/share/AgentOrder/agent/add4Api',
    method: 'get',
    params: query
  })
}
// 修改订单状态
export function modifyOrderstatus(query) {
  return request({
    url: '/share/agentIntentionOrder/updateIntentionOrder',
    method: 'get',
    params: query
  })
}
