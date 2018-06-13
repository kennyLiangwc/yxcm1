
Page({
  data: {
    list: []
  },
  toView(item) {
    console.log(item)
    // wx.navigateTo({
    //   url: "/pages/activity/detail/detail?id=1"
    // })
  },
  queryActivit() {
    const self = this;
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
        self.setData({
          list: res.data.data.activitys
        })
      }
    })
  },
  onLoad() {
    this.queryActivit()
  }
})