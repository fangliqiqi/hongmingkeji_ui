import request from '@/utils/request'

// 登录方法
export function login(username, password, code, uuid) {
  const data = {
    username,
    password,
    code,
    uuid
  }
  return request({
    url: '/login',
    method: 'post',
    data: data
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/getInfo',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

// 获取验证码
export function getCodeImg() {
  return request({
    url: '/captchaImage',
    method: 'get'
  })
}

//获取短信验证码
export function getMsgCode(data) {
  return request({
    url: '/share/user/authCode',
    method: 'post',
    data:data
  })
}
//获取短信验证码
export function msgLogin(data) {
  return request({
    url: '/share/user/smsLogin',
    method: 'post',
    data:data
  })
}



//获取短信验证码
export function getTips(data) {
  return request({
    url: '/share/tipsMessage/tips',
    method: 'get',
    params:data
  })
}
