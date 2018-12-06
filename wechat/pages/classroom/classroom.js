const util = require('../../utils/util.js')
const URL = require('../../utils/url.js')

Page({
  data: {
    showTopTips: false,

    dayTime: [],
    dates: [],
    dateIndex: 0,

    times: ["1-2", "3-4", "5-6", "7-8", "9", "10-11", "12-13"],
    timeIndex: 0,

    day: 0,
    time: '1-2',

    names: [],
    nameIndex: 0,

    cDay: '',
    cTime: ''
  },

  onLoad: function () {
    var dayTime = [];
    var dates = [];
    var day = new Date();
    for (var i = 0; i < 7; i++) {
      dayTime.push(`${day.getFullYear()}-${util.monthMM(day.getMonth() + 1)}-${day.getDate()}`);
      dates.push(`${day.getFullYear()}-${util.monthMM(day.getMonth() + 1)}-${day.getDate()} ${util.dayNum2Str(day.getDay())}`);
      day.setDate(day.getDate() + 1);
    }

    this.setData({
      day: dayTime[this.data.dateIndex],
      dates: dates,
      dayTime: dayTime
    });
  },

  bindDateChange: function (e) {
    var that = this;
    this.setData({
      dateIndex: e.detail.value,
      day: that.data.dayTime[e.detail.value]
    })
  },

  bindTimeChange: function (e) {
    var that = this;
    this.setData({
      timeIndex: e.detail.value,
      time: that.data.times[e.detail.value]
    })
  },

  checkupClassroom: function () {
    var that = this;
    wx.showLoading({
      title: '数据加载中',
    })

    that.setData({
      names: [],
      showApply: false,
      nameIndex: 0
    });

    getApp().request({
      url: `${URL.ClassroomUrl}/${this.data.day}/${this.data.time}`,
      method: 'GET',
      success: function (res) {
        if (!util.Ok2xx(res.statusCode)) {
          wx.showToast({
            icon: 'none',
            title: '请求出错'
          });
          return;
        } else {
          var names = [];

          if (res.data.length < 1) {
            util.errorTips(that, '没有可借的教室');
            return;
          }

          res.data.forEach((item) => {
            names.push(item.classroom);
          });
          that.setData({
            names: names,
            showApply: true,
            cDay: that.data.day,
            cTime: that.data.time
          });
        }
      },
      complete: function () {
        wx.hideLoading();
      }
    });
  },

  bindClassroomChange: function (e) {
    this.setData({
      nameIndex: e.detail.value,
    })
  },

  reasonInput: function (e) {
    this.setData({
      reason: e.detail.value
    })
  },

  applySubmit: function () {
    var that = this;

    getApp().request({
      url: `${URL.ClassroomUrl}/applies`,
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        day: that.data.cDay,
        time: that.data.cTime,
        classroom: that.data.names[that.data.nameIndex],
        reason: that.data.reason
      },
      success: function (res) {
        if (!util.Ok2xx(res.statusCode)) {
          wx.showToast({
            icon: 'none',
            title: '请求出错'
          });
          return;
        } else {
          wx.redirectTo({
            url: '/pages/classroom_look/classroom_look?type=check',
          });
        }
      },
      complete: function () {
        wx.hideLoading();
      }
    });
  }
});