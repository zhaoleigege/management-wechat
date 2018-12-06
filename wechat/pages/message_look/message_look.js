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
        number: data.number,
        type: data.type,
        phone: data.phone,
        time: data.createTime,
        description: data.description,
        classroom: data.classroom
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
  }
})