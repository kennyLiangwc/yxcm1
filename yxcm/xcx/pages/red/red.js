// pages/logs/logs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selIndex: 0,
    fanIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  toDetail() {
    wx.navigateTo({
      url: "/pages/red/detail/detail?id=1"
    })
  },
  selBor(event) {
    let index = event.currentTarget.dataset.testid;
    this.setData({
      selIndex: index,
      list: []
    })
  },
  selFan(event) {
    let index = event.currentTarget.dataset.fanid;
    this.setData({
      fanIndex: index
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const self = this;
    wx.request({
      url: 'https://qydata.club/yxserver/api/anchor/',
      data: {
        "page": 1,
        "page_size": 20
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(data) {
        let whList = data.data.auctions;
        self.setData({
          list: whList
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log(1)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})