Page({
  onLoad(options) {
    let item = wx.getStorageSync('activity');
    this.setData({
      whDetail: item
    })
  }
})