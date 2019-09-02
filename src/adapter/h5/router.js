
/**
 * https://developers.weixin.qq.com/miniprogram/dev/api/ui-navigate.html#wxnavigatetoobject
*/
export default {
  /**
   * 保留当前页面，跳转到应用内的某个页面，使用wx.navigateBack可以返回到原页面。
   * @param (Object) [opts = ]
   * url需要跳转的应用内非 tabBar 的页面的路径 , 路径后可以带参数。参数与路径之间使用?分隔，参数键与参数值用=相连，不同参数用&分隔；如 'path?key=value&key2=value2'
   * success接口调用成功的回调函数
   * fail接口调用失败的回调函数
   * complete接口调用结束的回调函数（调用成功、失败都会执行）
   */
  push (opts) {
    wx.navigateTo(opts)
  },
  /**
   * 关闭当前页面，跳转到应用内的某个页面。
   * @param (Object) [opts = ]
   * url需要跳转的应用内非 tabBar 的页面的路径 , 路径后可以带参数。参数与路径之间使用?分隔，参数键与参数值用=相连，不同参数用&分隔；如 'path?key=value&key2=value2'
   * success接口调用成功的回调函数
   * fail接口调用失败的回调函数
   * complete接口调用结束的回调函数（调用成功、失败都会执行）
   */
  redirect (opts) {
    wx.redirectTo(opts)
  },
  back () {
    wx.navigateBack()
  }
}
