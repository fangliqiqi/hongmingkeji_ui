import request from '@/utils/request'

// 查询公共联系电话列表
export function listPhoneSoucre(query) {
  return request({
    url: '/share/phoneSoucre/list',
    method: 'get',
    params: query
  })
}

// 根据招商id查询公共联系电话列表
export function getlistPhoneSoucre(bsId) {
  return request({
    url: '/share/phoneSoucre/listPhone/'+ bsId,
    method: 'get'
  })
}

// 查询公共联系电话详细
export function getPhoneSoucre(id) {
  return request({
    url: '/share/phoneSoucre/' + id,
    method: 'get'
  })
}

// 新增公共联系电话
export function addPhoneSoucre(data) {
  return request({
    url: '/share/phoneSoucre',
    method: 'post',
    data: data
  })
}

// 修改公共联系电话
export function updatePhoneSoucre(data) {
  return request({
    url: '/share/phoneSoucre',
    method: 'put',
    data: data
  })
}

// 删除公共联系电话
export function delPhoneSoucre(id) {
  return request({
    url: '/share/phoneSoucre/' + id,
    method: 'delete'
  })
}

// 导出公共联系电话
export function exportPhoneSoucre(query) {
  return request({
    url: '/share/phoneSoucre/export',
    method: 'get',
    params: query
  })
}
