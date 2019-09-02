/**
 *  title  String  是  提示的标题
    content  String  是  提示的内容
    showCancel  Boolean  否  是否显示取消按钮，默认为 true
    cancelText  String  否  取消按钮的文字，默认为"取消"，最多 4 个字符
    cancelColor  HexColor  否  取消按钮的文字颜色，默认为"#000000"
    confirmText  String  否  确定按钮的文字，默认为"确定"，最多 4 个字符
    confirmColor  HexColor  否  确定按钮的文字颜色，默认为"#3CC51F"
    success  Function  否  接口调用成功的回调函数
    fail  Function  否  接口调用失败的回调函数
    complete  Function  否  接口调用结束的回调函数（调用成功、失败都会执行）
  * @example
  * // 显示
    this.$vux.alert.show({
      title: 'Vux is Cool',
      content: 'Do you agree?',
      onShow () {
        console.log('Plugin: I\'m showing')
      }
    })
 */
let show = wx.showModal
let alert = {
  show (opts) {
    let _opts = {
      showCancel: false,
      confirmText: opts.buttonText || '确定',
      confirmColor: '#FB8F3E',
      success: function (e) {
        if (e.confirm && opts.onHide) {
          opts.onHide()
        }
      }
    }
    Object.assign(opts, _opts)
    show(opts)
  }
}
export default alert
