import Vue from 'vue'
import HttpRequest from '@/libs/httpRequest'
export default function (App) {
  Vue.prototype.$http = HttpRequest
  const app = new Vue({
    render: () => App
  })
  app.$mount()
}
