import request from '@/utils/request'

// 查询我的下级列表
export function agentUserList(query) {
  return request({
    url: '/system/user/agentUserList',
    method: 'get',
    params: query
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



