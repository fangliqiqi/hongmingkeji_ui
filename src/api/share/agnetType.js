import request from '@/utils/request'

// 查询商机类型中间列表
export function listAgnetType(query) {
  return request({
    url: '/share/agnetType/list',
    method: 'get',
    params: query
  })
}
//获取代理商查询条件下拉选
export function rzCompanyType(query) {
  return request({
    url: '/share/company/list',
    method: 'get',
    params: query
  })
}

// 查询商机类型中间详细
export function getAgnetType(id) {
  return request({
    url: '/share/agnetType/' + id,
    method: 'get'
  })
}

// 新增商机类型中间
export function addAgnetType(data) {
  return request({
    url: '/share/agnetType',
    method: 'post',
    data: data
  })
}

// 修改商机类型中间
export function updateAgnetType(data) {
  return request({
    url: '/share/agnetType',
    method: 'put',
    data: data
  })
}

// 删除商机类型中间
export function delAgnetType(id) {
  return request({
    url: '/share/agnetType/' + id,
    method: 'delete'
  })
}

// 导出商机类型中间
export function exportAgnetType(query) {
  return request({
    url: '/share/agnetType/export',
    method: 'get',
    params: query
  })
}

//远程查询
export function getCompanyList(query) {
  return request({
    url: '/share/agnetType/companyList',
    method: 'get',
    params: query
  })
}

//查询合作商商机明细
export function listAgnetCompanyType(query) {
  return request({
    url: '/share/agnetType/agnetCompany',
    method: 'get',
    params: query
  })
}
// 查询商机类型中间列表(新)
export function listAgnetTypenew(query) {
  return request({
    url: '/share/agnetType/listByNew',
    method: 'get',
    params: query
  })
}