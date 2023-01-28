


import request from '@/utils/request'

// 查询分销订单列表
export function listOrder(query) {
  return request({
    url: '/share/AgentOrder/historyOrderlist',
    method: 'get',
    params: query
  })
}

// 查询分销订单详细
export function getOrder(id) {
  return request({
    url: '/share/AgentOrder/' + id,
    method: 'get'
  })
}

// 新增分销订单
export function addOrder(data) {
  return request({
    url: '/share/AgentOrder',
    method: 'post',
    data: data
  })
}

// 修改分销订单
export function updateOrder(data) {
  return request({
    url: '/share/AgentOrder',
    method: 'put',
    data: data
  })
}

// 删除分销订单
export function delOrder(id) {
  return request({
    url: '/share/AgentOrder/' + id,
    method: 'delete'
  })
}



// 导出分销订单
export function exportOrder(query) {
  return request({
    url: '/share/AgentOrder/export',
    method: 'get',
    params: query
  })
}

export function list4Order(query) {
  return request({
    url:'/share/AgentBusinessType/list4Order',
    method: 'post',
    data: query
  })
}

export function allocationAgent (query) {
return request({
  url:'/share/AgentOrder/allocationAgent',
  method: 'post',
  data: query
})
}

export function checkStatusChange (query) {
  return request({
    url:'/share/AgentOrder/checkStatusChange',
    method: 'post',
    data: query
  })
}

export function companyListByAddr (query) {
  return request({
    url:'/share/company/companyListByAddr',
    method: 'get',
    params: query
  })
}


export function AgentCustomerFollowAdd (query) {
  return request({
    url:'/share/AgentCustomerFollow/add',
    method: 'post',
    data: query
  })
}

export function AgentCustomerFollowList (query) {
  return request({
    url:'/share/AgentCustomerFollow/list',
    method: 'get',
    params: query
  })
}

//查询按钮  查询务流程配置
export function BusinessprocessList (query) {
  return request({
    url:'/share/crmMatchingRules/getList',
    method: 'get',
    params: query
  })
}
//查询按钮  提交
export function BusinessprocessPost (data) {
  return request({
    url:'/share/AgentOrder/allocationAgent',
    method: 'post',
    data: data
  })
}

// 业务员业务完成按钮操作
export function examineSuccess (data) {
  return request({
    url: '/share/crmMatchingRules/examineSuccess',
    method: 'get',
    params: data
  })
}

// 获取当前流程记录
export function flowList (data) {
  return request({
    url: '/share/crmUserPair/flowList',
    method: 'get',
    params: data
  })
}

//提交 内核审核
export function ExaminePost (data) {
  return request({
    url: '/share/crmUserPair/examine',
    method: 'get',
    params: data
  })
}

//客服专员列表
export function ServiceList (data) {
  return request({
    url: '/share/crmCustomerService/list ',
    method: 'get',
    params: data
  })
}

//外勤专员列表
export function  OutworkerList (data) {
  return request({
    url: '/share/crmUserPair/getWqUser',
    method: 'get',
    params: data
  })
}

// 业务调度确认
export function dispatchPost (data) {
  return request({
    url: '/share/crmUserPair/dispatch',
    method: 'get',
    params: data
  })
}

// 获取外账指派人员列表
export function  ExternalList (data) {
  return request({
    url: '/share/crmExternalAccount/list',
    method: 'get',
    params: data
  })
}

// 提交外账指派人员
export function  ExternalPost (data) {
  return request({
    url: '/share/crmUserPair/assignCustomer',
    method: 'get',
    params: data
  })
}

// 外账完结
export function  orderOverPost (data) {
  return request({
    url: '/share/crmUserPair/orderOver',
    method: 'get',
    params: data
  })
}

// 获取外勤办事员列表
export function  outworkerList (data) {
  return request({
    url: '/share/crmClerk/list',
    method: 'get',
    params: data
  })
}


// 获取审批业务全流程记录
export function flowLogList (data) {
  return request({
    url: '/share/crmUserPair/flowLogList',
    method: 'get',
    params: data
  })
}

// 流转
export function  circulationPost (data) {
  return request({
    url: '/share/crmUserPair/circulation',
    method: 'get',
    params: data
  })
}

//提交  跟进记录
export function followsPost (data) {
  return request({
    url: '/share/crmOperationRecord/add',
    method: 'post',
    data: data
  })
}

//提交 外勤审核
export function legworkPost (data) {
  return request({
    url: '/share/crmUserPair/processEnd',
    method: 'get',
    params: data
  })
}

//根据部门id 查相关人员
export function getCrmrelatedList(query) {
  return request({
    url: '/crm/user/userList',
    method: 'get',
    params: query
  })
}

//修改订单状态
export function updateStatePost(query) {
  return request({
    url: '/share/crmUserPair/updateState',
    method: 'get',
    params: query
  })
}
