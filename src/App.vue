<script>
export default {
  globalConfig: {
  },
  created () {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // eslint-disable-next-line
      console.log('app created and cache logs by setStorageSync')
  },
  onLaunch () {
    let vm = this
    this.$wx.getSystemInfo().then(systemInfo => {
      console.log(systemInfo)
      vm.$store.commit('updateSystemInfo', systemInfo)
    })
  },
  methods: {
  }
}
</script>

<style>
    @import "~mpvue-wxparse/src/wxParse.css";
    @import '~@/styles/iconfont/iconfont.css';
</style>
<style lang="less">
    @import '~@/themes/font-size/default.less';
    @import '~@/styles/index.less';
</style>
<style lang="less">
    /* this rule will be remove */
    page{
      background: @place;
    }
    * {
        transition: width 2s;
        -moz-transition: width 2s;
        -webkit-transition: width 2s;
        -o-transition: width 2s;
    }
    .scroll-down {
        color: grey;
        text-align: center;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
    }
</style>
