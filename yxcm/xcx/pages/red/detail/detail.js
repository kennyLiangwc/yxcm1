Page({
  data: {
    whDetail: ""
  },
  onLoad(options) {
    let item = wx.getStorageSync('wh');
    this.setData({
      whDetail: item
    })
  }
})