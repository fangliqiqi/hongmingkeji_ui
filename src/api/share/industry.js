import request from '@/utils/request'

// 查询行业分类信息列表
export function listIndustry(query) {
  return request({
    url: '/share/industry/list',
    method: 'get',
    params: query
  })
}

// 查询行业分类信息详细
export function getIndustry(id) {
  return request({
    url: '/share/industry/' + id,
    method: 'get'
  })
}

// 新增行业分类信息
export function addIndustry(data) {
  return request({
    url: '/share/industry',
    method: 'post',
    data: data
  })
}

// 修改行业分类信息
export function updateIndustry(data) {
  return request({
    url: '/share/industry',
    method: 'put',
    data: data
  })
}

// 删除行业分类信息
export function delIndustry(id) {
  return request({
    url: '/share/industry/' + id,
    method: 'delete'
  })
}

// 导出行业分类信息
export function exportIndustry(query) {
  return request({
    url: '/share/industry/export',
    method: 'get',
    params: query
  })
}