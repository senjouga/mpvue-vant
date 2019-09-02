/**
 * title  String  是  提示的内容
icon  String  否  图标，有效值 "success", "loading", "none"
image  String  否  自定义图标的本地路径，image 的优先级高于 icon  1.1.0
duration  Number  否  提示的延迟时间，单位毫秒，默认：1500
mask  Boolean  否  是否显示透明蒙层，防止触摸穿透，默认：false
success  Function  否  接口调用成功的回调函数
fail  Function  否  接口调用失败的回调函数
complete  Function  否  接口调用结束的回调函数（调用成功、失败都会执行）
  * @example
  * // 显示
    this.$vux.toast.show({
    text: 'Loading'
    })

    // 显示文字
    this.$vux.toast.text('hello', 'top')

    // 隐藏
    this.$vux.toast.hide()
 */
let show = wx.showToast
let hide = wx.hideToast
let toast = {
  text (title = '') {
    show({title, icon: 'none'})
  },
  show (opts = {type: 'none', text: '', 'is-show-mask': false, time: 1500}) {
    let _opts = {
      title: opts.text,
      icon: opts.type,
      mask: opts['is-show-mask'],
      duration: opts.time
    }
    Object.assign(opts, _opts)
    console.log(_opts)
    show(_opts)
    return {
      hide: hide
    }
  }
}
export default toast
