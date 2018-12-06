const util = require('../../utils/util.js')
const URL = require('../../utils/url.js')


Page({
  data: {
    files: []
  },

  onLoad: function (options) {
    var that = this;
    var successAction = data => {
      that.setData({
        repairNumber: data.repairNumber,
        reportNumber: data.reportNumber,
        updateTime: data.updateTime,
        description: data.description,
        classroom: data.classroom,
        status: data.status,
        maintainId: data.maintainId
      });

      JSON.parse(data.images).forEach(item => {
        wx.downloadFile({
          url: `${URL.fileUrl}/${item}`,
          success: function (res) {
            if (res.statusCode === 200) {
              that.setData({
                files: that.data.files.concat(res.tempFilePath)
              });
            }
          }
        });
      });
    };

    getApp().request({
      url: `${options.redirectUrl}`,
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
      }
    });
  },

  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },

  updateMaintain: function () {
    var that = this;
    getApp().request({
      url: `${URL.equipmentUrl}/${that.data.maintainId}`,
      method: 'PUT',
      success: function (res) {
        if (!util.Ok2xx(res.statusCode)) {
          wx.showToast({
            icon: 'none',
            title: '请求出错'
          });
          return;
        } else {
          wx.redirectTo({
            url: '/pages/maintain_look/maintain_look?status=repaired&title=设备维修记录',
          })
        }
      }
    });
  }
})