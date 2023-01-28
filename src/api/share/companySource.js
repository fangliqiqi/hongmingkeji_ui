import request from '@/utils/request'

// 查询分配资源列表
export function listCompanySource(query) {
  let params = JSON.parse(JSON.stringify(query));
  let mTime = query.messageTime;
  if(mTime!=null&&typeof mTime == 'object'){
    params.messageTime = mTime.join(',');
  }
  return request({
    url: '/share/companySource/list',
    method: 'get',
    params: params
  })
}

// 查询分配资源详细
export function getCompanySource(id) {
  return request({
    url: '/share/companySource/' + id,
    method: 'get'
  })
}
//预约接单
export function getAppointment(query) {
  return request({
    url: '/share/companySource/appointment',
    method: 'get',
    params: query
  })
}
//停止接单
export function getSuspendAppointment(query) {
  return request({
    url: '/share/companySource/suspendAppointment',
    method: 'get',
    params: query
  })
}
//商机信息回显接口
export function getAppointmentList(query) {
  return request({
    url: '/share/companySource/appointmentList',
    method: 'get',
    params: query
  })
}


// 新增分配资源
export function addCompanySource(data) {
  return request({
    url: '/share/companySource',
    method: 'post',
    data: data
  })
}

// 修改分配资源
export function updateCompanySource(data) {
  return request({
    url: '/share/companySource',
    method: 'put',
    data: data
  })
}

// 删除分配资源
export function delCompanySource(id) {
  return request({
    url: '/share/companySource/' + id,
    method: 'delete'
  })
}

// 导出分配资源
export function exportCompanySource(query) {
  return request({
    url: '/share/companySource/export',
    method: 'get',
    params: query
  })
}
