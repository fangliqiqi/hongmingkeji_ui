import request from '@/utils/request'

// 查询提现信息列表
export function listDraw(query) {
  return request({
    url: '/share/draw/list',
    method: 'get',
    params: query
  })
}

// 查询提现信息详细
export function getDraw(id) {
  return request({
    url: '/share/draw/' + id,
    method: 'get'
  })
}

// 新增提现信息
export function addDraw(data) {
  return request({
    url: '/share/draw',
    method: 'post',
    data: data
  })
}

// 修改提现信息
export function updateDraw(data) {
  return request({
    url: '/share/draw',
    method: 'put',
    data: data
  })
}

// 删除提现信息
export function delDraw(id) {
  return request({
    url: '/share/draw/' + id,
    method: 'delete'
  })
}

// 导出提现信息
export function exportDraw(query) {
  return request({
    url: '/share/draw/export',
    method: 'get',
    params: query
  })
}

// 修改提现信息
export function examine(data) {
  return request({
    url: '/share/draw/examine',
    method: 'put',
    data: data
  })
}


// 查询提现信息列表
export function getUser(id) {
  return request({
    url: '/share/AgentProportionLog/commission/description',
    method: 'get',
    headers: {'X-Auth-UseId':id}

  })
}
