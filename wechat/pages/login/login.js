const app = getApp()
const util = require('../../utils/util.js')
const URL = require('../../utils/url.js')

Page({
  data: {
    username: '',
    password: '',
    redirectUrl: ''
  },

  onLoad: function(options){
    this.setData({
      redirectUrl: "/" + options.redirectUrl
    })
  },

  setUsername: function (e) {
    this.setData({
      username: e.detail.value
    })
  },

  setPassword: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  login: function () {
    var that = this;
    wx.showNavigationBarLoading();

    wx.login({
      success: res => {
        wx.request({
          url: `${URL.accountUrl}/session`,
          method: 'POST',
          header: {
            'content-type': 'application/json' // 默认值
          },
          data: {
            code: res.code,
            number: that.data.username,
            password: that.data.password
          },
          success: function (res) {
            if (util.Ok2xx(res.statusCode)) {
              console.log('登录成功');
              app.globalData.userInfo = res.data;
              wx.setStorageSync('userInfo', app.globalData.userInfo);
              wx.redirectTo({
                url: `${that.data.redirectUrl}`,
              })
            }
            else {
              util.errorTips(that, '账号或密码错误', 1500);
            }
          },
          fail: () => {
            util.errorTips(that, '连接服务器失败');
          },

          complete: () => {
            wx.hideNavigationBarLoading();
          }
        })
      }
    })
  }
})