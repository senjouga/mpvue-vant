
import Vue from 'vue'
import MpvueRouterPatch from 'mpvue-router-patch'
import Alert from './components/alert'
import Toast from './components/toast'
import Confirm from './components/confirm'
import Loading from './components/loading'
import Http from './http'
import WxApi from './wxapi'
import {HTTP_BASE_URL} from '@/config/url.config'
let plugin = {
  install: function (_Vue, opts) {
    _Vue.prototype.$vux = {
      alert: Alert,
      toast: Toast,
      confirm: Confirm,
      loading: Loading
    }
    _Vue.prototype.$http = Http
    _Vue.prototype.$wx = WxApi
    _Vue.prototype.BASE_URL = HTTP_BASE_URL
    _Vue.prototype.$toast = function (text = '', icon = 'none') {
      wx.showToast({icon: icon, title: text})
    }
  }
}
Vue.use(plugin)
Vue.use(MpvueRouterPatch)
export default plugin
