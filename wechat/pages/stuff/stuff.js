const util = require('../../utils/util.js')
const URL = require('../../utils/url.js')
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["失物找寻", "找寻失主"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  _uploadStuff: function (data) {
    wx.showLoading({
      title: '上传中',
      mask: true
    });
    getApp().request({
      url: `${URL.stuffUrl}/`,
      method: 'POST',
      data: data,
      success: function (res) {
        if (!util.Ok2xx(res.statusCode)) {
          wx.showToast({
            icon: 'none',
            title: '请求出错'
          });
          return;
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '上传成功'
          });
          setTimeout(() => {
            wx.navigateBack({

            });
          }, 2000);
        }
      }
    });
  },

  lossSubmit: function (e) {
    this._uploadStuff({
      type: 'loss',
      phone: e.detail.phone,
      description: e.detail.description,
      images: e.detail.images
    });
  },

  stickSubmit: function (e) {
    this._uploadStuff({
      type: 'stick',
      phone: e.detail.phone,
      description: e.detail.description,
      images: e.detail.images
    });
  }
});