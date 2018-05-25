//获取应用实例
const app = getApp()

Page({
  data: {},

  onLoad: function () {
    wx.openLocation({
      latitude: 23.099994,
      longitude: 113.324520,
      scale: 10,
      name: '广州xxx',
      address: '广州xxx大道xxx大厦'
    })
  }

})