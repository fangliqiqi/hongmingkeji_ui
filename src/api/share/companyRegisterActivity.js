import request from '@/utils/request'

// 查询注册公司活动列表
export function listCompanyRegisterActivity(query) {
  return request({
    url: '/share/companyRegisterActivity/list',
    method: 'get',
    params: query
  })
}

// 查询注册公司活动详细
export function getCompanyRegisterActivity(id) {
  return request({
    url: '/share/companyRegisterActivity/' + id,
    method: 'get'
  })
}

// 新增注册公司活动
export function addCompanyRegisterActivity(data) {
  return request({
    url: '/share/companyRegisterActivity',
    method: 'post',
    data: data
  })
}

// 修改注册公司活动
export function updateCompanyRegisterActivity(data) {
  return request({
    url: '/share/companyRegisterActivity',
    method: 'put',
    data: data
  })
}

// 删除注册公司活动
export function delCompanyRegisterActivity(id) {
  return request({
    url: '/share/companyRegisterActivity/' + id,
    method: 'delete'
  })
}

// 导出注册公司活动
export function exportCompanyRegisterActivity(query) {
  return request({
    url: '/share/companyRegisterActivity/export',
    method: 'get',
    params: query
  })
}


export function companyRegisterActivity(id,userId) {
  return request({
    url: '/share/companyRegisterActivity/'+id+'/'+userId,
    method: 'get',
  })
}
