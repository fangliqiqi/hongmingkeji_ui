import request from '@/utils/request'

// 查询卡券订单列表
export function listCardOrder(query) {
  return request({
    url: '/share/cardOrder/list',
    method: 'get',
    params: query
  })
}

// 查询卡券订单详细
export function getCardOrder(query) {
  return request({
    url: '/share/cardOrder/getInfo',
    method: 'get',
    params: query
  })
}

// 新增卡券订单
export function addCardOrder(data) {
  return request({
    url: 'share/cardOrder/add4PC',
    method: 'post',
    data: data
  })
}

// 修改卡券订单
export function updateCardOrder(data) {
  return request({
    url: '/share/cardOrder/edit',
    method: 'post',
    data: data
  })
}

// 删除卡券订单
export function delCardOrder(data) {
  return request({
    url: '/share/cardOrder/removeOrder',
    method: 'post',
    data:data
  })
}

// 导出卡券订单
export function exportCardOrder(query) {
  return request({
    url: '/share/cardOrder/export',
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

// 图片单张删除
export function removeFile(query) {
  return request({
    url: '/share/cardOrder/cardPayVoucher/removeFile',
    method: 'get',
    params: query
  })
}
// 校验手机号码
export function queryUserByPhone(query) {
  return request({
    url: '/share/cardOrder/queryUserByPhone',
    method: 'get',
    params: query
  })
}

// 审核订单

export function check4Order(query) {
  return request({
    url: 'share/cardOrder/check4Order',
    method: 'get',
    params: query
  })
}
