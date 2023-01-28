import request from '@/utils/request'

// 查询独代区域价格列表
export function listMoney(query) {
  return request({
    url: '/share/money/list',
    method: 'get',
    params: query
  })
}

// 查询独代区域价格详细
export function getMoney(id) {
  return request({
    url: '/share/money/' + id,
    method: 'get'
  })
}

// 新增独代区域价格
export function addMoney(data) {
  return request({
    url: '/share/money',
    method: 'post',
    data: data
  })
}

// 修改独代区域价格
export function updateMoney(data) {
  return request({
    url: '/share/money',
    method: 'put',
    data: data
  })
}

// 删除独代区域价格
export function delMoney(id) {
  return request({
    url: '/share/money/' + id,
    method: 'delete'
  })
}

// 导出独代区域价格
export function exportMoney(query) {
  return request({
    url: '/share/money/export',
    method: 'get',
    params: query
  })
}