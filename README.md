#以小程序能支持的语法为基准
## 基础
1. 安装包使用[`yarn`](https://yarnpkg.com/zh-Hans/)

1. 查询是this.$http.get  
2. 变更是this.$http.put  
3. 新增是this.$http.post 
4. 删除是this.$http.delete 

5. state.userInfo          用户登录信息
6. state.wxUserInfo      微信头像昵称


computed: {
    ...mapGetters({
      wxInfo: 'wxInfo/info'
    })
  },

// 微信unionid      openid

//边框显示不全：transform: rotateZ(360deg);
