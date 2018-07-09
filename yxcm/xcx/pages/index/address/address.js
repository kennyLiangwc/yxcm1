//获取应用实例
const app = getApp()

Page({
  data: {},

  onLoad: function () {
    wx.openLocation({
      latitude: 23.099994,
      longitude: 113.324520,
      scale: 10,
      name: '广州印象传媒',
      address: '广州市天河区晨邮路12号华景里理想地'
    })
  }

})