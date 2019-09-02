/**
 * h5桥接层
 */
import {APP_CLIENT} from '@/config/url.config'
import store from '@/store'
const Fly = require('flyio/src/node')
let FlyInstance = new Fly()

FlyInstance.config.baseURL = APP_CLIENT

FlyInstance.interceptors.request.use((request) => {
  // 给所有请求添加自定义header
  request.headers['X-Tag'] = 'flyio'
  let {accesstoken} = store.state
  if (accesstoken) {
    request.headers['Authorization'] = accesstoken
  }
  console.log(request.body)
  console.log(request.url)
  // 打印出请求体
  // console.log(request.body)
  // 终止请求
  // var err=new Error("xxx")
  // err.request=request
  // return Promise.reject(new Error(""))

  // 可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
  return request
})

// 添加响应拦截器，响应拦截器会在then/catch处理之前执行
FlyInstance.interceptors.response.use(
  (response) => {
    // 只将请求结果的data字段返回
    return response.data
  }, (err) => {
    // 发生网络错误后会走到这里
    return Promise.resolve(err)
  }
)
let Http = FlyInstance
export default Http
