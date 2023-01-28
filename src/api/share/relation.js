import request from '@/utils/request'

// 查询推荐人关系信息列表
export function listRelation(query) {
  return request({
    url: '/share/relation/list',
    method: 'get',
    params: query
  })
}

// 查询推荐人关系信息详细
export function getRelation(recommendId) {
  return request({
    url: '/share/relation/' + recommendId,
    method: 'get'
  })
}

// 新增推荐人关系信息
export function addRelation(data) {
  return request({
    url: '/share/relation',
    method: 'post',
    data: data
  })
}

// 修改推荐人关系信息
export function updateRelation(data) {
  return request({
    url: '/share/relation',
    method: 'put',
    data: data
  })
}

// 删除推荐人关系信息
export function delRelation(recommendId) {
  return request({
    url: '/share/relation/' + recommendId,
    method: 'delete'
  })
}

// 导出推荐人关系信息
export function exportRelation(query) {
  return request({
    url: '/share/relation/export',
    method: 'get',
    params: query
  })
}