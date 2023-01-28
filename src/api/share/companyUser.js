import request from '@/utils/request'

// 查询用户信息列表
export function listCompanyUser(query) {
  return request({
    url: '/share/companyUser/list',
    method: 'get',
    params: query
  })
}

// 查询用户信息详细
export function getCompanyUser(userId) {
  return request({
    url: '/share/companyUser/' + userId,
    method: 'get'
  })
}


// 新增用户信息
export function addCompanyUser(data) {
  return request({
    url: '/share/companyUser',
    method: 'post',
    data: data
  })
}

// 修改用户信息
export function updateCompanyUser(data) {
  return request({
    url: '/share/companyUser',
    method: 'put',
    data: data
  })
}


// 删除用户信息
export function delCompanyUser(userId) {
  return request({
    url: '/share/companyUser/' + userId,
    method: 'delete'
  })
}



// 导出用户信息
export function exportCompanyUser(query) {
  return request({
    url: '/share/companyUser/export',
    method: 'get',
    params: query
  })
}

