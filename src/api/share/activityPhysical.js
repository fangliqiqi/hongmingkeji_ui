import request from '@/utils/request'

// 查询财务体检活动列表
export function listActivity(query) {
  return request({
    url: '/share/examinationAgencyActivity/list',
    method: 'get',
    params: query
  })
}

// 查询财务体检活动详细
export function getActivity(id) {
  return request({
    url: '/share/activity/' + id,
    method: 'get'
  })
}

// 新增财务体检活动
export function addActivity(data) {
  return request({
    url: '/share/activity',
    method: 'post',
    data: data
  })
}

// 修改财务体检活动
export function updateActivity(data) {
  return request({
    url: '/share/activity',
    method: 'put',
    data: data
  })
}

// 删除财务体检活动
export function delActivity(id) {
  return request({
    url: '/share/activity/' + id,
    method: 'delete'
  })
}

// 导出财务体检活动
export function exportActivity(query) {
  return request({
    url: '/share/activity/export',
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