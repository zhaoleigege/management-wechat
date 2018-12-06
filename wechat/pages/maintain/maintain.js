const util = require('../../utils/util.js')
const URL = require('../../utils/url.js')

Page({
  _uploadMaintain: function (data) {
    wx.showLoading({
      title: '上传中',
      mask: true
    });

    getApp().request({
      url: `${URL.equipmentUrl}`,
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

  onLoad: function(options){
    this.setData({
      type: options.type
    });

    wx.setNavigationBarTitle({
      title: `${options.title}`,
    })
  },

  maintainSubmit: function (e) {
    var that = this;
    this._uploadMaintain({
      classroom: e.detail.classroom,
      description: e.detail.description,
      images: e.detail.images,
      type: that.data.type
    });
  }
})