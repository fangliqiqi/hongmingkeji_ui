import request from '@/utils/request'

//获取合作商数量
export function mapDataID(query) {
    return request({
      url: '/share/echarts/region',
      method: 'get',
      params: query
    })
  }
//获取轮播信息
export function getRoleCount(query) {
  return request({
    url: '/share/receiving/roleCount',
    method: 'get',
    params: query
  })
}
// 获取对应的区县
export function getCounty(data) {
  return request({
    url: '/share/echarts/getCountyCount',
    method: 'post',
    data: data
  })
}

  //获取合作商公司
  export function countyID(data) {
    return request({
      url: '/share/echarts/getCompany',
      method: 'post',
      data: data
    })
  }
  //判断不同的合作商获取不同的信息

export function getCompanyMessage(query) {
  return request({
    url: '/share/receiving/companyMessage',
    method: 'get',
    params: query
  })
}