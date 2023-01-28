import request from '@/utils/request'

// 查询加盟商信息列表
export function listChannelCompany(query) {
  return request({
    url: '/share/channelCompany/list',
    method: 'get',
    params: query
  })
}



//查询当前资源页面加盟商信息列表
export function listChannelCompanyfinAll(query) {
  return request({
    url: '/share/channelSource/finAll',
    method: 'get',
    params: query
  })
}
// 查询具体资源分配列表
export function listChannelCompanyType(query) {
  return request({
    url: '/share/channelSource/customerSource/list',
    method: 'get',
    params:query
  })
}
// 查询加盟商信息详细
export function getChannelCompany(id) {
  return request({
    url: '/share/channelCompany/' + id,
    method: 'get'
  })
}

// 新增加盟商信息
export function addChannelCompany(data) {
  return request({
    url: '/share/channelCompany',
    method: 'post',
    data: data
  })
}

// 修改加盟商信息
export function updateChannelCompany(data) {
  return request({
    url: '/share/channelCompany',
    method: 'put',
    data: data
  })
}



// 删除加盟商信息
export function delChannelCompany(id) {
  return request({
    url: '/share/channelCompany/' + id,
    method: 'delete'
  })
}

// 导出加盟商信息
export function exportChannelCompany(query) {
  return request({
    url: '/share/channelCompany/export',
    method: 'get',
    params: query
  })
}

//加盟商 远程搜索查询
export function getChannelCompanyList(query) {
  return request({
    url: '/share/channelCompany/companyList',
    method: 'get',
    params: query
  })
}
//合作商状态
export function updateStatus(query) {
  return request({
    url: '/share/channelCompany/updateStatus',
    method: 'get',
    params: query
  })
}

//测试商机按钮获得业务员
export function getUserList(query) {
  return request({
    url: '/share/company/getUserList',
    method: 'get',
    params: query
  })
}

//下发测试商机
export function issueTest(query) {
  return request({
    url: '/share/company/issueTest',
    method: 'get',
    params: query
  })
}