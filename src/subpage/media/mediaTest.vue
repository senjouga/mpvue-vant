<template>
    <div class="login">
        <video id="Video" style="height: 50px" @ended="playEnded($event)" @timeupdate="timeupdateaction($event)" vslide-gesture :src="mediaSrc"></video>
        <h2 @click="test">2333</h2>
        <SInput></SInput>
    </div>
</template>

<script>
  import SInput from '../../../src/components/field/s-input'
  export default {
    config: {
      navigationBarTitleText: '课程',
      navigationBarTextStyle: 'black',
      navigationBarBackgroundColor: 'white',
      usingComponents: {
      }
    },
    components: {
      SInput
    },
    data () {
      return {
        thirdSessionId: '',
        step: 1,
        isPhone: false,
        isMember: false,
        videoContext: null,
        videoTime: '',
        mediaSrc: 'http://hc.yinyuetai.com/uploads/videos/common/5B4801535ED18F67ECCBA4EF50B0BA2D.flv?sc=8e489fe925c173aa&br=785&vid=2517042&aid=3895&area=KR&vst=3',
        nodes: [{
          name: 'div',
          attrs: {
            class: 'div_class',
            style: 'line-height: 60px; color: red;'
          },
          children: [{
            type: 'text',
            text: 'Hello&nbsp;World!'
          }]
        }]
      }
    },
    onReady: function () {
      console.log('videoTime1')
      this.videoContext = wx.createVideoContext('Video')
      let vm = this
      wx.getStorage({
        key: 'videoTime',
        success (res) {
          console.log('videoTime')
          console.log(res.data)
          vm.videoTime = res.data
          vm.videoContext.seek(res.data)
        },
        fail (res) {
          console.warn(res)
        }
      })
    },
    onUnload () {
      console.log('onUnload')
      try {
        wx.setStorage({key: 'videoTime', data: this.videoTime})
      } catch (e) {
        console.log(e)
      }
    },
    onHide () {
      console.log('onHide')
      try {
        wx.setStorage({key: 'videoTime', data: this.videoTime})
      } catch (e) {
        console.log(e)
      }
    },
    computed: {
      msgInfo () {
        return this.$store.state.msgInfo
      }
    },
    mounted () {
      // if (!this.isPhone) {
      //   this.login()
      // }
      // this.$store.commit('stockConnect', true)
    },
    methods: {
      test () {
        // this.videoContext.seek(2.921687)
        this.$router.push({
          path: '/pages/personal/set/setting'
        })
      },
      timeupdateaction (event) {
      },
      playEnded (e) {
        this.$toast('播放完成')
      }
    },
    watch: {
      videoTime: throttle(async function (val) {
        val = val.replace(/^\s+|\s+$/g, '')
        if (val !== '') {
          console.log('搜索请求')
        } else {
          this.items = []
          this.empty = false
        }
      }, 300)
    }
  }
</script>

<style lang="less">
  #Video {
    width: 100%;
    height: 170px;
  }
</style>

