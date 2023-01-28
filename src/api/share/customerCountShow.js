import request from '@/utils/request'

// 查询客户资源分配列表
export function listCustomerCountShow(query) {
  return request({
    url: '/share/customerCountShow/list',
    method: 'get',
    params: query
  })
}

//首行资源数
export function customerCount(query) {
  return request({
    url: '/share/administrative/customerCount',
    method: 'get',
    params: query
  })
}

//网络资源数据展示
export function resourceShow(query) {
  return request({
    url: '/share/administrative/resourceShow',
    method: 'get',
    params: query
  })
}

//资源数据明细
export function resourceDetail(query) {
  return request({
    url: '/share/administrative/resourceDetail',
    method: 'get',
    params: query
  })
}

//网络资源日数据折线图展示
export function everydayResource(query) {
  return request({
    url: '/share/administrative/everydayResource',
    method: 'get',
    params: query
  })
}
//获取后台传过来的年份
export function getYears(query) {
  return request({
    url: '/share/administrative/getYears',
    method: 'get',
    params: query
  })
}
//资源数据明细日折线图
export function DetailResource(query) {
  return request({
    url: '/share/administrative/everydayDetailResource',
    method: 'get',
    params: query
  })
}



