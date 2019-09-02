<template>
    <div class="s-scroll">
        <scroll-view @scrolltolower="_nextPage()"
                     @scrolltoupper="_refreshPage()"
                     upper-threshold="20"
                     :scroll-y="scrollY"
                     :scroll-top="scrollTop"
                     :scroll-with-animation="true"
                     class="scroll-view"
                     :style="{height: height ? height : ''}">
            <div v-if="animationIng" :animation="animation" class="scroll-down refresh-wrap">
                加载中...
            </div>
            <slot></slot>
            <div v-if="isUp&&isLoading"
                 class="scroll-down">加载中...</div>
            <div v-if="hasNext"
                 class="scroll-down">没有更多数据了 </div>
            <div class="empty" v-if="empty&&!isDown">
                <div class="noResult"><img :src="src" alt=""></div>
                <p class="tip fs-12">没有数据可以显示</p>
            </div>
        </scroll-view>
    </div>
</template>

<script>
  export default {
    props: {
      height: String | Number,
      param: Object, // 请求参数
      api: String, // 请求api
      needRefresh: {
        type: Boolean,
        default: true
      },
      scrollY: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        src: require(`@/assets/no-result.png`),
        isDown: false,
        isLoading: false,
        isUp: false,
        hasNext: false,
        empty: false,
        scrollTop: -1,
        reqParam: null,
        _dataList: [],
        testData: 1,
        isPageUp: false,
        canRefresh: true,
        refreshTimeOut: null,
        animation: null,
        animationTimeOut: null,
        animationIng: false,
        animationIngTimeOut: null
      }
    },
    onLoad () {
      this.reqParam = Object.assign({}, this.param)
      // this.loadData()
      if (this.needRefresh) {
        this.isDown = true
        this.loadData()
      }
    },
    onPullDownRefresh () {
      if (this.isLoading) {
        return false
      } else {
        if (this.canRefresh) {
          this.canRefresh = false
          let vm = this
          clearTimeout(this.refreshTimeOut)
          this.refreshTimeOut = setTimeout(function () {
            vm.canRefresh = true
          }, 1500)
          this.showDownAnimation()
          this.refresh()
        }
      }
    },
    methods: {
      loadData () {
        // setTimeout(function () {
        //   let arr = []
        //   for (let i = 0; i < 10; i++) {
        //     vm.testData++
        //     arr.push({acttitle: `你的名字: ${vm.testData}-${i}`})
        //   }
        //   let res = {
        //     page: vm.reqParam.page,
        //     data: arr,
        //     param: vm.reqParam
        //   }
        //   if (vm.isPageUp) {
        //     vm.isPageUp = false
        //     wx.stopPullDownRefresh()
        //     vm.scrollTop = 0
        //   }
        //   vm.$emit('upDateScrollArr', res)
        // }, 500)
        let vm = this
        if (this.isLoading) {
          return false
        }
        this.isLoading = true
        // vm.$http.closeWxLoading = true
        vm.$http.get(vm.api, vm.reqParam).then(res => {
          if (res._req_success) {
            if (res.resultlist === null) res.resultlist = []
            let upDataResult = {
              page: vm.reqParam.page,
              data: res.resultlist
            }
            if (vm.isPageUp) {
              vm.isPageUp = false
              wx.stopPullDownRefresh()
            }
            vm.scrollTop = 0
            vm.endSuccess(res.resultlist.length)
            vm.$emit('upDateScrollArr', upDataResult)
          } else {
            vm.$emit('upDateScrollArr', [])
            vm.empty = true
          }
          vm.isLoading = false
          vm.isDown = false
          vm.isUp = false
          vm.hideDownAnimation()
        }).catch(e => {
          vm.isLoading = false
          vm.isDown = false
          vm.isUp = false
          vm.hideDownAnimation()
        })
      },
      showDownAnimation () {
        this.animationIng = true
        this.animation = null
        let vm = this
        clearTimeout(this.animationTimeOut)
        this.animationTimeOut = setTimeout(function () {
          let animation = wx.createAnimation()
          animation.height('60rpx').step({timingFunction: 'ease-in-out'})
          vm.animation = animation.export()
        }, 200)
      },
      hideDownAnimation () {
        let vm = this
        this.animationTimeOut = setTimeout(function () {
          vm.animation = null
          let animation = wx.createAnimation()
          animation.height('0rpx').step()
          vm.animation = animation.export()
        }, 1000)
        clearTimeout(this.animationIngTimeOut)
        this.animationIngTimeOut = setTimeout(function () {
          vm.animationIng = false
        }, 1500)
      },
      _refreshPage () {
        console.log('refresh')
        if (this.isLoading) {
          return false
        } else {
          if (this.canRefresh) {
            this.canRefresh = false
            let vm = this
            clearTimeout(this.refreshTimeOut)
            this.refreshTimeOut = setTimeout(function () {
              vm.canRefresh = true
            }, 1500)
            this.showDownAnimation()
            this.refresh()
          }
        }
      },
      _nextPage () {
        if (this.hasNext) return
        ++this.reqParam.page
        this.isUp = true
        this.loadData()
      },
      endSuccess (currentCount, hasNext = true) {
        if (this.reqParam.page === 1 && currentCount === 0) {
          this.empty = true
        } else {
          this.empty = false
        }
        if ((currentCount < this.reqParam.limit || hasNext === false) && !this.empty) {
          this.hasNext = true
        } else {
          this.hasNext = false
        }
      },
      refresh () {
        this.$nextTick(function () {
          this.scrollTop = -1
        })
        this.isPageUp = true
        this.isDown = true
        this.testData = 1
        this.reqParam.page = 1
        this.loadData()
      }
    },
    watch: {
      param: function (val, oldval) {
        console.log('param 变更')
        console.log(val)
        this.reqParam = Object.assign({}, this.param)
        this.reqParam.page = 1
        this.isPageUp = true
        this.$nextTick(function () {
          this.scrollTop = -1
        })
        this.loadData()
      },
      deep: true // 对象内部的属性监听，也叫深度监听
    }
  }
</script>

<style lang="less">
.s-scroll{
    height: 100%;
    .scroll-view{
        height: 100%;
        overflow-y: auto;
        position: relative;
        .empty{
            text-align: center;
            .noResult{
                img{
                    width:110px;
                    height: 86px;
                }
            }
            .tip{
                color: @default-p;
                margin-top: 5px;
                box-sizing: border-box;
            }
        }
        // .scroll-down {
        //     color: @subject-color;
        // }

        .refresh-wrap {
            color: white;
            background: @subject-color;
            height: 0;
        }
    }

}
</style>
