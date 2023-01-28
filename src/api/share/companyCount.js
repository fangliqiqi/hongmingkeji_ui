import request from '@/utils/request'

// 查询合作商统计列表
export function listCompanyCount(query) {
  return request({
    url: '/share/administrative/companyCount',
    method: 'get',
    params: query
  })
}

//首行数据展示
export function monthConsumption(query) {
  return request({
    url: '/share/administrative/monthConsumption',
    method: 'get',
    params: query
  })
}

//2020年资源数据统计柱状图
export function monthlyCount(query) {
  return request({
    url: '/share/administrative/monthlyCount',
    method: 'get',
    params: query
  })
}
//2020年资源月消费额饼状图
export function resourceConsumption(query) {
  return request({
    url: '/share/administrative/resourceConsumption',
    method: 'get',
    params: query
  })
}

//2020年月均费用
export function monthlyCost(query) {
  return request({
    url: '/share/administrative/monthlyCost',
    method: 'get',
    params: query
  })
}