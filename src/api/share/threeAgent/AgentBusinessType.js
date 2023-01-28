import request from '@/utils/request'

// 查询业务名称指导价设置列表
export function listAgentBusinessType(query) {
  return request({
    url: '/share/AgentBusinessType/list',
    method: 'get',
    params: query
  })
}

// 查询业务名称指导价设置详细
export function getAgentBusinessType(id) {
  return request({
    url: '/share/AgentBusinessType/' + id,
    method: 'get'
  })
}

// 新增业务名称指导价设置
export function addAgentBusinessType(data) {
  return request({
    url: '/share/AgentBusinessType',
    method: 'post',
    data: data
  })
}

// 修改业务名称指导价设置
export function updateAgentBusinessType(data) {
  return request({
    url: '/share/AgentBusinessType',
    method: 'put',
    data: data
  })
}

// 删除业务名称指导价设置
export function delAgentBusinessType(id) {
  return request({
    url: '/share/AgentBusinessType/' + id,
    method: 'delete'
  })
}

// 导出业务名称指导价设置
export function exportAgentBusinessType(query) {
  return request({
    url: '/share/AgentBusinessType/export',
    method: 'get',
    params: query
  })
}
