import request from '@/utils/request'

// 查询代理记账活动列表
export function listBookkeepingAgencyActivity(query) {
  return request({
    url: '/share/bookkeepingAgencyActivity/list',
    method: 'get',
    params: query
  })
}

// 查询代理记账活动详细
export function getBookkeepingAgencyActivity(id) {
  return request({
    url: '/share/bookkeepingAgencyActivity/' + id,
    method: 'get'
  })
}

// 新增代理记账活动
export function addBookkeepingAgencyActivity(data) {
  return request({
    url: '/share/bookkeepingAgencyActivity',
    method: 'post',
    data: data
  })
}

// 修改代理记账活动
export function updateBookkeepingAgencyActivity(data) {
  return request({
    url: '/share/bookkeepingAgencyActivity',
    method: 'put',
    data: data
  })
}

// 导出代理记账活动
export function exportBookkeepingAgencyActivity(query) {
  return request({
    url: '/share/bookkeepingAgencyActivity/export',
    method: 'get',
    params: query
  })
}

//业务列表
export function netSalesmanList(query) {
  return request({
    url: '/share/activityOrder/netSalesmanList',
    method: 'get',
    params: query
  })
}

//业务下发
export function upfouprBookkeepingAgency(id,userId) {
  return request({
    url: '/share/bookkeepingAgencyActivity/'+id+'/'+userId,
    method: 'get'
  })
}

//业务跟进
export function getFollowList(query) {
  return request({
    url: '/share/followOrder/list',
    method: 'get',
    params: query
  })
}
//添加根据记录
export  function addFollowOrder(date) {
  return request({
    url: '/share/followOrder',
    method: 'post',
    data: date
  })
}
