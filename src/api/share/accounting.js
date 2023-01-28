import request from '@/utils/request'

// 查询会计信息列表
export function listAccounting(query) {
  return request({
    url: '/share/accounting/list',
    method: 'get',
    params: query
  })
}

// 查询会计信息详细
export function getAccounting(id) {
  return request({
    url: '/share/accounting/' + id,
    method: 'get'
  })
}

// 新增会计信息
export function addAccounting(data) {
  return request({
    url: '/share/accounting',
    method: 'post',
    data: data
  })
}

// 修改会计信息
export function updateAccounting(data) {
  return request({
    url: '/share/accounting',
    method: 'put',
    data: data
  })
}

// 删除会计信息
export function delAccounting(id) {
  return request({
    url: '/share/accounting/' + id,
    method: 'delete'
  })
}

// 导出会计信息
export function exportAccounting(query) {
  return request({
    url: '/share/accounting/export',
    method: 'get',
    params: query
  })
}