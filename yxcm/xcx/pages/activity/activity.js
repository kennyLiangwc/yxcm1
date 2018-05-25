
Page({

  data: {

  },
  toView() {
    wx.navigateTo({
      url: "/pages/activity/detail/detail?id=1"
    })
  },
  onReady() {
    wx.request({
      url: 'https://qydata.club/yxserver/api/activity/',
      data: {
        "page": 1,
        "page_size": 20
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res)
      }
    })
  }
})