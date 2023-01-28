import request from '@/utils/request'

// 查询列表
export function upSettingsList(query) {
  return request({
    url: '/share/AgentLevelUpSettings/list',
    method: 'get',
    params: query
  })
}
// 获取设置
export function getUpSettings(id) {
  return request({
    url: '/share/AgentLevelUpSettings/'+ id,
    method: 'get',
  })
}
// 修改设置
export function editUpSettings(data) {
  return request({
    url: '/share/AgentLevelUpSettings',
    method: 'put',
    data: data
  })
}



