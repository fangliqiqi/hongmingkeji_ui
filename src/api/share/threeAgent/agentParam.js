import request from '@/utils/request'
// 代理商参数获取
// export function getAgentList() {
//   return request({
//     url: '/share/AgentSubProportionSettings/agent/cost/list',
//     method: 'get'
//   })
// }

// 代理商参数修改
export function updateAgentList(data) {
  return request({
    url: '/share/AgentSubProportionSettings/editAgentAndCost',
    method: 'post',
    data:data
  })
}
// 代理人参数获取
export function getAgentArr() {
  return request({
    url: '/share/ClientProportionSettings/list',
    method: 'get'
  })
}

// 代理人参数修改
export function updateAgentArr(data) {
  return request({
    url: '/share/ClientProportionSettings/edit',
    method: 'post',
    data:data
  })
}

// 根据神省市区查询省市代理商分成比例
export function getAgentlist(query) {
  return request({
    url: '/share/agentProportionSettings/list',
    method: 'get',
    params: query
  })
}

// 根据神省市区 修改 省市代理商分成比例
export function postAgentlist(query) {
  return request({
    url: '/share/agentProportionSettings/updatePropSettings',
    method: 'post',
    data: query
  })
}
