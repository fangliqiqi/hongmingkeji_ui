import request from '@/utils/request'

// 查询加盟商信息列表
export function listCompany(query) {
  return request({
    url: '/share/company/list',
    method: 'get',
    params: query
  })
}

// 查询加盟商信息详细
export function getCompany(id) {
  return request({
    url: '/share/company/' + id,
    method: 'get'
  })
}

// 新增加盟商信息
export function addCompany(data) {
  return request({
    url: '/share/company',
    method: 'post',
    data: data
  })
}

// 修改加盟商信息
export function updateCompany(data) {
  let obj = Object.assign({},data)
  delete obj.principal
  delete obj.principalPhone
  delete obj.updateImg
  return request({
    url: '/share/company',
    method: 'put',
    data: obj
  })
}



// 删除加盟商信息
export function delCompany(id) {
  return request({
    url: '/share/company/' + id,
    method: 'delete'
  })
}

// 导出加盟商信息
export function exportCompany(query) {
  return request({
    url: '/share/company/export',
    method: 'get',
    params: query
  })
}

//加盟商 远程搜索查询
export function getCompanyList(query) {
  return request({
    url: '/share/company/companyList',
    method: 'get',
    params: query
  })
}
//表格
export function Llist(query) {
  return request({
    url: '/share/echarts/consume',
    method: 'get',
    params: query
  })
}