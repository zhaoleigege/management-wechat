const util = require('../../utils/util.js')
const URL = require('../../utils/url.js')

Page({
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    getApp().request({
      url: `${URL.courseUrl}`,
      method: 'GET',
      success: function (res) {
        if (!util.Ok2xx(res.statusCode)) {
          wx.showToast({
            icon: 'none',
            title: '请求出错'
          });
          return;
        } else {
          that.setData({
            courses: res.data
          });
        }
      },
      fail: function () {
        util.errorTips(that, '连接服务器失败');
      },
      complete: function(){
        wx.hideLoading();
      }
    });
  }
});