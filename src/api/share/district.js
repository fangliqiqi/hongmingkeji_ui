import request from '@/utils/request'

// 查询省市县数据列表
export function listDistrict(query) {
  return request({
    url: '/share/district/list',
    method: 'get',
    params: query
  })
}

// 查询省市县数据详细
export function getDistrict(id) {
  return request({
    url: '/share/district/' + id,
    method: 'get'
  })
}

// 新增省市县数据
export function addDistrict(data) {
  return request({
    url: '/share/district',
    method: 'post',
    data: data
  })
}

// 修改省市县数据
export function updateDistrict(data) {
  return request({
    url: '/share/district',
    method: 'put',
    data: data
  })
}

// 删除省市县数据
export function delDistrict(id) {
  return request({
    url: '/share/district/' + id,
    method: 'delete'
  })
}

// 导出省市县数据
export function exportDistrict(query) {
  return request({
    url: '/share/district/export',
    method: 'get',
    params: query
  })
}