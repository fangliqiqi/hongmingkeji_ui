import request from '@/utils/request'

// 查询资源分配列表
export function listSource(query) {
  return request({
    url: '/share/source/list',
    method: 'get',
    params: query
  })
}

// 查询所有申诉商机（待审核商机）
export function listAuditSource(query) {
  return request({
    url: '/share/source/listAudit',
    method: 'get',
    params: query
  })
}


// 查询商机类型列表
export function listSourceType(query) {
  return request({
    url: '/share/comment/listSourceType',
    method: 'get',
    params: query
  })
}

//获取代理商查询条件下拉选
export function rzCompanyType(query) {
  return request({
    url: '/share/company/list',
    method: 'get',
    params: query
  })
}

// 查询资源分配详细
export function getSource(id) {
  return request({
    url: '/share/source/' + id,
    method: 'get'
  })
}

// 新增资源分配
export function addSource(data) {
  return request({
    url: '/share/source',
    method: 'post',
    data: data
  })
}

// 修改资源分配
export function updateSource(data) {
  return request({
    url: '/share/source',
    method: 'put',
    data: data
  })
}

// 删除资源分配
export function delSource(id) {
  return request({
    url: '/share/source/' + id,
    method: 'delete'
  })
}

// 导出资源分配
export function exportSource(query) {
  return request({
    url: '/share/source/export',
    method: 'get',
    params: query
  })
}
export function exportNowSource(query) {
  return request({
    url: '/share/source/nowExport',
    method: 'get',
    params: query
  })
}
// 查询资源分配详细
// export function getSourceAgent(query) {
//   return request({
//     url: '/share/source/agent',
//     method: 'get',
//     params: query
//   })
// }

//查询商机信息 和 代理商信息
export function getSourceAgent(query) {
  return request({
    url: '/share/source/agent',
    method: 'get',
    params: query
  })
}

//查询业务员详情
export function getUserlist(query) {
  return request({
    url: '/share/source/getCompUserlist',
    method: 'get',
    params: query
  })
}

//客户名称和手机号码 远程查询
export function getCustomerList(query) {
  return request({
    url: '/share/source/customerList',
    method: 'get',
    params: query
  })
}

// 远程查询
export function getCompanyList(query) {
  return request({
    url: '/share/source/companyList',
    method: 'get',
    params: query
  })
}

// 申述列表
export function listAudit(data) {
  return request({
    url: '/share/source/listAudit',
    method: 'get',
    params: data
  })
}

// 审核修改
export function updateAppeal(data) {
  return request({
    url: '/share/source/updateAppeal',
    method: 'get',
    params: data
  })
}
export function listAuditByUser(data){
  return request({
    url: '/share/source/listAuditByUser',
    method: 'get',
    params: data
  })
}


// 新增资源分配(安庆专用)
export function addSourceBusiness(data) {
  return request({
    url: '/share/source/businessAdd',
    method: 'post',
    data: data
  })
}

// 新增资源分配(新)
export function addSourcenew(data) {
  return request({
    url: '/share/source/addNew',
    method: 'post',
    data: data
  })
}
// 修改资源分配(新)
export function updateSourcenew(data) {
  return request({
    url: '/share/source/editNew',
    method: 'post',
    data: data
  })
}

//查询商机信息 和 代理商信息(新)
export function getSourceAgentnew(query) {
  return request({
    url: '/share/source/agentNew',
    method: 'get',
    params: query
  })
}