import request from '@/utils/request'



// 巡查代理商管理
export function listAgentUser(query) {
  return request({
    url: '/share/AgentCompany/userList',
    method: 'get',
    params: query
  })
}


// 查询用户信息详细
  export function getAgentUsers(userId) {
    return request({
      url: '/share/AgentCompany/user/' + userId,
      method: 'get'
    })
  }



// 新增用户信息
export function addAgentUsers(data) {
  return request({
    url: '/share/AgentCompany/userAdd',
    method: 'post',
    params: data
  })
}

// 修改用户信息
export function updateAgentUsers(data) {
  return request({
    url: '/share/AgentCompany/userUpdate',
    method: 'put',
    params: data
  })
}



// 删除用户管理
export function delUser(query) {
  return request({
    url: '/share/AgentCompany/del',
    method: 'get',
    params: query
  })
}


// 导出用户信息



// 获取绑定人员
export function byUserList(query) {
  return request({
    url: '/share/AgentCompany/UserListByUserId',
    method: 'get',
    params: query
  })
}
// 提交绑定人员
export function userBindingAdd(data) {
  return request({
    url: '/share/AgentCompany/userBindingAdd',
    method: 'post',
    data: data
  })
}

// 获取绑定人员列表
export function bindList(query) {
  return request({
    url: '/share/binding/list',
    method: 'get',
    params: query
  })
}
//解绑
export function unBinddel(query) {
  return request({
    url: '/share/binding/del',
    method: 'get',
    params: query
  })
}
