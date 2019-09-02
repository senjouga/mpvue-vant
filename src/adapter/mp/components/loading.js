/**
 *  title  String  是  提示的内容
    mask  Boolean  否  是否显示透明蒙层，防止触摸穿透，默认：false
    success  Function  否  接口调用成功的回调函数
    fail  Function  否  接口调用失败的回调函数
    complete  Function  否  接口调用结束的回调函数（调用成功、失败都会执行）
  * @example
  * // 显示
    this.$vux.loading.show({
    text: 'Loading'
    })

    // 隐藏
    this.$vux.loading.hide()
 */
let show = wx.showLoading
let hide = wx.hideLoading
let loading = {
  show (opts = {text: '', mask: false}) {
    let _opts = {
      title: opts.text,
      mask: opts.mask
    }
    show(_opts)
    return {
      hide
    }
  }
}
export default loading
