// socket功能
// import SockJS from 'sockjs-client'
let env = process.env.VUE_APP_BASE_API;

let wsUrl = 'ws://www.gongxiangkuaiji.cn:8080/websocket'
if(env == '/dev-api'){
  wsUrl = 'ws://192.168.1.249:8080/websocket'
}
export function connectionSocket(url, cb) {
  console.info('请求')
  try {
    const ws = new WebSocket(wsUrl+url)
    ws.onopen = function() {
      // ws.send('发送数据')
      console.info('数据发送中...')
    }
    ws.onmessage = function(evt) {
      // console.info(evt)

      cb(evt)
      console.info('数据已接收...')
    }

    ws.onclose = function() {
      // 关闭 websocket
      console.info('连接已关闭...')
    }
    return ws
  } catch (e) {
    // console.info(e)
  }

}

// export function connSockJS(url, cb) {
//   url = url ? url : '/ws-url'
//   try {
//     const sock = new SockJS(url)
//     sock.onopen = function() {
//       console.log('open')
//     }
//     sock.onmessage = function(e) {
//       cb(e)
//       console.log('message', e.data)
//     }
//     sock.onclose = function() {
//       console.log('close')
//     }
//     // sock.send('test');
//     // sock.close();
//     return sock
//   } catch (e) {
//     console.info(e)
//   }
// }
