const app = getApp()

Page({
  data: {

  },

  onLoad: function (options) {
    var that = this;
    getApp().checkLogin(() => {
      that.load();
    })
  },

  load: function () {
    var userInfo = app.globalData.userInfo;
    var repairCondition = true;
    
    if(userInfo.authorities.indexOf('accendant') !== -1)
      repairCondition = true;

    this.setData({
      name: userInfo.name,
      number: userInfo.number,
      identity: userInfo.identity,
      xy: userInfo.lbl_xy,
      xzb: userInfo.lbl_xzb,
      repairCondition: repairCondition
    })
  }
})