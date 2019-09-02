// https://github.com/wendux/fly/blob/master/README-CH.md
import {APP_CLIENT} from '../../config/index'
import store from '@/store'
import vm from '@/main'
import qs from 'querystring'
var Fly = require('flyio/dist/npm/wx')
// Node 入口
// var Fly=require("flyio/src/node")
const FlyRequest = new Fly()
FlyRequest.config.baseURL = APP_CLIENT
FlyRequest.closeWxLoading = false
FlyRequest.config.timeout = 10000
FlyRequest.interceptors.request.use((request) => {
  // 给所有请求添加自定义header
  request.headers['X-Tag'] = 'flyio'
  let {method, body} = request
  let {accesstoken} = store.state
  if (accesstoken) {
    request.headers['Authorization'] = accesstoken
  }
  if (method === 'post' && body) {
    request.body = qs.stringify(body)
  }
  if ((request.body && !request.body.hideLoading) || !request.body) {
    if (!FlyRequest.closeWxLoading) {
      wx.showLoading({
        title: '加载中...',
        mask: true
      })
    }
  }
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
FlyRequest.interceptors.response.use(
  (response) => {
    // 只将请求结果的data字段返回
    let request = response.request
    if ((request.body && !request.body.hideLoading) || !request.body) {
      wx.hideLoading()
      FlyRequest.closeWxLoading = false
    }
    if (request.body && !request.body._getHeader) {
      response.data._header = response.headers
    }
    if (response.data && response.data.returncode && response.data.returncode === '00000000') {
      response.data._req_success = true
    } else {
      response.data._req_success = false
    }
    return response.data
  }, (err) => {
    wx.hideLoading()
    FlyRequest.closeWxLoading = false
    console.log(err)
    // 发生网络错误后会走到这里
    // status code 401  returncode 401 时退出登录
    if (err.status && (err.status === 401) && err.response.data && (+err.response.data.returncode === 401)) {
      console.log('退出登录')
      let that = vm.app
      let path = that.$router ? that.$router.currentRoute.path.substr(1) : ''
      let query = that.$router ? that.$router.currentRoute.query : {}
      wx.showModal({
        title: '提示',
        content: '用户登录信息失效，请重试',
        confirmText: '确认',
        confirmColor: '#F5A623',
        showCancel: false,
        success: function (res) {
          FlyRequest.errorModel = false
          let beforeRoute = {}
          if (path) {
            beforeRoute.path = path
            beforeRoute.query = query
          }
          store.dispatch('logout', beforeRoute).then(() => {
            wx.switchTab({url: '/pages/home/home'})
          })
          // let path = that.$router ? that.$router.currentRoute.path.substr(1) : that.$mp.appOptions.path
          // that.$router.replace({path: '/pages/home/home', query: {beforeUrl: '/' + path, ...that.$mp.appOptions.query}})
        }
      })
      return false
    }
    if (err.status === 0 || err.status === 1) {
      let message = err.status === 0 ? '网络错误' : '请求超时'
      wx.showToast({
        title: `${message}, 请稍后再试`,
        icon: 'none',
        duration: 2000
      })
      return false
    }
    return Promise.resolve(err)
  }
)
export default FlyRequest
