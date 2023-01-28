import request from '@/utils/request'

// 查询商机类型（6.7新的）列表
export function listNew(query) {
  return request({
    url: '/share/new/list',
    method: 'get',
    params: query
  })
}

// 查询商机类型（6.7新的）详细
export function getNew(id) {
  return request({
    url: '/share/new/' + id,
    method: 'get'
  })
}

// 新增商机类型（6.7新的）
export function addNew(data) {
  return request({
    url: '/share/new',
    method: 'post',
    data: data
  })
}

// 修改商机类型（6.7新的）
export function updateNew(data) {
  return request({
    url: '/share/new',
    method: 'put',
    data: data
  })
}

// 删除商机类型（6.7新的）
export function delNew(id) {
  return request({
    url: '/share/new/' + id,
    method: 'delete'
  })
}

// 导出商机类型（6.7新的）
export function exportNew(query) {
  return request({
    url: '/share/new/export',
    method: 'get',
    params: query
  })
}