import request from '@/utils/request'

// 查询商机类型中间列表
export function listAgnetType(query) {
  return request({
    url: '/share/companyAgeSouType/list',
    method: 'get',
    params: query
  })
}
// 查询商机类型中间详细
export function getAgnetType(id) {
  return request({
    url: '/share/companyAgeSouType/' + id,
    method: 'get'
  })
}

// 查询商机类型中间详细
export function sourceTypeList() {
  return request({
    url: '/share/companyAgeSouType/sourceTypeList',
    method: 'get'
  })
}

// 修改商机类型中间
export function updateAgnetType(data) {
  return request({
    url: '/share/companyAgeSouType',
    method: 'put',
    data: data
  })
}


