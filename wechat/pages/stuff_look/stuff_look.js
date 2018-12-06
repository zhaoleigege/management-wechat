const util = require('../../utils/util.js')
const URL = require('../../utils/url.js')
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["失物查看", "失主查看"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0
  },
  onLoad: function () {
    var that = this;

    wx.showLoading({
      title: '加载数据中',
    });

    this._loadMsg('loss', (data) => {
      that.setData({
        losses: data
      })
    })

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex,

        });
      }
    });
  },

  _loadMsg: function (type, successAction) {
    var that = this;
    getApp().request({
      url: `${URL.stuffUrl}/batch/${type}/0`,
      method: 'GET',
      success: function (res) {
        if (!util.Ok2xx(res.statusCode)) {
          wx.showToast({
            icon: 'none',
            title: '请求出错'
          });
          return;
        } else {
          successAction(res.data);
        }
      },
      fail: function () {
        util.errorTips(that, '连接服务器失败');
      },
      complete: function () {
        wx.hideLoading();

      }
    });
  },

  tabClick: function (e) {
    var that = this;
    if (e.currentTarget.id == 1) {
      this._loadMsg('stick', (data) => {
        wx.hideLoading();
        that.setData({
          stickes: data
        });
      })
    }
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  previewLookUp: function (e) {
    var stuuCheckUrl = `${URL.stuffUrl}/` + e.currentTarget.dataset.index;
    wx.navigateTo({
      url: `/pages/message_look/message_look?redirectUrl=${stuuCheckUrl}`
    })
  }
});