import request from '@/utils/request'

// 查询卡券业务项列表
export function listCardBusiness(query) {
  return request({
    url: '/share/cardBusiness/list',
    method: 'get',
    params: query
  })
}

// 查询卡券业务项详细
export function getCardBusiness(query) {
  return request({
    url: 'share/cardBusiness/getInfo',
    method: 'get',
    params:query
  })
}

// 新增卡券业务项
export function addCardBusiness(data) {
  return request({
    url: '/share/cardBusiness',
    method: 'post',
    data: data
  })
}

// 修改卡券业务项
export function updateCardBusiness(data) {
  return request({
    url: '/share/cardBusiness',
    method: 'put',
    data: data
  })
}

// 删除卡券业务项
export function delCardBusiness(id) {
  return request({
    url: '/share/cardBusiness/' + id,
    method: 'delete'
  })
}

// 导出卡券业务项
export function exportCardBusiness(query) {
  return request({
    url: '/share/cardBusiness/export',
    method: 'get',
    params: query
  })
}

// 获取 套餐类型
export function getCardList(query) {
  return request({
    url: '/share/cardBusiness/getCardList',
    method: 'get',
    params: query
  })
}
