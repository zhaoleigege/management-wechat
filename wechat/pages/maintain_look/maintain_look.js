const util = require('../../utils/util.js')
const URL = require('../../utils/url.js')

Page({
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: `${options.title}`,
    })
    var that = this;

    wx.showLoading({
      title: '加载数据中',
    });

    this._loadMsg(`${options.status}`, (data) => {
      that.setData({
        maintains: data
      })
    })
  },

  _loadMsg: function (type, successAction) {
    var that = this;
    getApp().request({
      url: `${URL.equipmentUrl}/${type}/batch/0`,
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

  previewLookUp: function (e) {
    var stuuCheckUrl = `${URL.equipmentUrl}/` + e.currentTarget.dataset.index;
    wx.navigateTo({
      url: `/pages/equipment_look/equipment_look?redirectUrl=${stuuCheckUrl}`
    })
  }
});