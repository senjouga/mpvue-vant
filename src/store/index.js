import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import {APP_NAME} from '@/config'
import {updateTitle} from '@/adapter'
Vue.use(Vuex)
const storage = {
  getItem: wx.getStorageSync,
  setItem: wx.setStorageSync,
  removeItem: wx.removeStorageSync
}
let _store = {
  modules: {},
  state: {},
  mutations: {},
  plugins: [],
  actions: {},
  getters: {}
}
if (process.env.NODE_ENV !== 'test') {
  _store.plugins.push(createPersistedState({
    storage,
    key: APP_NAME
  }))
}
const store = new Vuex.Store(_store)

export default store
