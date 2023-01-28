import request from '@/utils/request'

// 查询客户资源分配列表
export function listCustomerCount(query) {
  return request({
    url: '/share/administrative/customerCount',
    method: 'get',
    params: query
  })
}

//查询合作商总数、月新增总数、总成交额、本月续费总额

export function CustomerCountNumber(query) {
  return request({
    url: '/share/administrative/companyCount',
    method: 'get',
    params: query
  })
}



//合作商续费与消费
export function Consumption(query) {
  return request({
    url: '/share/administrative/consumption',
    method: 'get',
    params: query
  })
}


//招商业绩数据展示

export function investmentCount(query) {
  return request({
    url: '/share/administrative/investmentCount',
    method: 'get',
    params: query
  })
}


