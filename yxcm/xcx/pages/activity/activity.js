
Page({
  data: {
    list: []
  },
  toView(event) {
    let index = event.currentTarget.dataset.activityid;
    console.log(event)
    const item = this.data.list[index];
    try {
        wx.setStorageSync('activity', item);
        wx.navigateTo({
          url: `/pages/activity/detail/detail?${index}`
        })
    } catch (e) {

    }
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