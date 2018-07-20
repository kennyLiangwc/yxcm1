Page({
  onLoad(options) {
    let item = wx.getStorageSync('activity');
    console.log("iem",item)
    this.setData({
      whDetail: item
    })
  }
})