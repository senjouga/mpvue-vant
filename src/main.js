import Vue from 'vue'
import App from '@/App'
import '@/adapter/mp/install'
import store from '@/store'

Vue.config.productionTip = false

const app = new Vue({
  mpType: 'app',
  store,
  ...App
})
app.$mount()
export default {
  app,
  config: {
    // pages: ['pages/logon/logon']
  }
}
