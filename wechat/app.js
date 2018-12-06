//app.js
const util = require('./utils/util.js')

App({
  onLaunch: function () {
    // wx.showLoading({
    //   title: '登录中',
    //   mask: true
    // });
  },

  //检测是否登录
  checkLogin: function (action) {
    this.globalData.userInfo = wx.getStorageSync('userInfo');
    if (this.globalData.userInfo) {
      wx.hideLoading();
      action();
    }
    else {
      wx.redirectTo({
        url: `/pages/login/login?redirectUrl=${getCurrentPages()[0].route}`,
      })
    }
  },

  //封装wx.request，自动添加token
  request: function (obj) {
    var newObjg = {
      success: obj.success
    }
    var userInfo = wx.getStorageSync('userInfo');
    obj.header = {
      Authorization: userInfo.token
    };
    obj.success = (res) => {
      if (res.statusCode === 401) {
        wx.redirectTo({
          url: `/pages/login/login?redirectUrl=${getCurrentPages()[0].route}`,
        })
      } else {
        newObjg.success(res);
      }
    }
    return wx.request(obj);
  },

  globalData: {
    userInfo: null
  }
})