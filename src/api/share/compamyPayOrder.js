import request from '@/utils/request'

// 查询出入账记录列表
export function listCompamyPayOrder(query) {
  return request({
    url: '/share/company/payEpetCompanyOrder/list',
    method: 'get',
    params: query
  })
}

// 查询出入账记录详细
export function getCompamyPayOrder(id) {
  return request({
    url: '/share/company/payEpetCompanyOrder/' + id,
    method: 'get'
  })
}

// 新增出入账记录
export function addCompamyPayOrder(data) {
  return request({
    url: '/share/company/payEpetCompanyOrder',
    method: 'post',
    data: data
  })
}

// 修改出入账记录
export function updateCompamyPayOrder(data) {
  return request({
    url: '/share/company//compamyPayOrder',
    method: 'put',
    data: data
  })
}

// 删除出入账记录
export function delCompamyPayOrder(id) {
  return request({
    url: '/share/company//compamyPayOrder/' + id,
    method: 'delete'
  })
}

// 导出出入账记录
export function exportCompamyPayOrder(query) {
  return request({
    url: '/share/company/compamyPayOrder/export',
    method: 'get',
    params: query
  })


}
// 导出出入账记录
export function getCategoryTypeAmount(query) {
  return request({
    url: '/share/company/payEpetCompanyOrder/getCategoryTypeAmount',
    method: 'get',
    params: query
  })

}

//业务下发
export function exportBookkeepingAgencyActivity(query) {
  return request({
    url: '/share/activityOrder/netSalesmanList',
    method: 'get',
    params: query
  })
}
