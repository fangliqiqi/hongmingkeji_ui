import request from '@/utils/request'

// 查询官网留言列表
export function listVoicemessage(query) {
  return request({
    url: '/share/voicemessage/list',
    method: 'get',
    params: query
  })
}

// 查询官网留言详细
export function getVoicemessage(id) {
  return request({
    url: '/share/voicemessage/' + id,
    method: 'get'
  })
}

// 新增官网留言
export function addVoicemessage(data) {
  return request({
    url: '/share/voicemessage',
    method: 'post',
    data: data
  })
}

// 修改官网留言
export function updateVoicemessage(data) {
  return request({
    url: '/share/voicemessage',
    method: 'put',
    data: data
  })
}

// 删除官网留言
export function delVoicemessage(id) {
  return request({
    url: '/share/voicemessage/' + id,
    method: 'delete'
  })
}

// 导出官网留言
export function exportVoicemessage(query) {
  return request({
    url: '/share/voicemessage/export',
    method: 'get',
    params: query
  })
}