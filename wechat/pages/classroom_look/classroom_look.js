const util = require('../../utils/util.js')
const URL = require('../../utils/url.js')

Page({
  onLoad: function (options) {
    var that = this;

    wx.showLoading({
      title: '加载数据中',
    });

    var title = '';
    var apply = false;
    var url = `${URL.ClassroomUrl}/`;
    if (options.type === 'check') {
      url = url + `me/applies?page=0`;
      apply = true;
      title = '申请的教室';
    }
    else {
      url = url + `applies?page=0&status=applying`;
      title = '审批教室申请';
    }

    wx.setNavigationBarTitle({
      title: title,
    })

    this._loadMsg(url, (data) => {
      data.forEach(item => {
        item.apply = apply;
      });
      that.setData({
        classrooms: data
      })
    })
  },

  _loadMsg: function (restUrl, successAction) {
    var that = this;
    getApp().request({
      url: restUrl,
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

  _applyUpdate: function (data, successAction) {
    var that = this;
    getApp().request({
      url: `${URL.ClassroomUrl}/applies`,
      method: 'PUT',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        applyId: data.applyId,
        status: data.status
      },
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

  refuseAction: function (e) {
    this._applyUpdate({
      applyId: e.currentTarget.dataset.index,
      status: 'refuse'
    }, () => {
      wx.redirectTo({
        url: '/pages/profile/profile',
      });
    });
  },

  acceptAction: function (e) {
    this._applyUpdate({
      applyId: e.currentTarget.dataset.index,
      status: 'applied'
    }, () => {
      wx.redirectTo({
        url: '/pages/profile/profile',
      });
    });
  }
});