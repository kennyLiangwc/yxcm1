// pages/logs/logs.js
const { getFansNum } = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    selIndex: 0,
    fanIndex: 1,
    platform: 0
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
      platform: index,
      list: []
    })
    this.query()
  },
  selFan(event) {
    let index = event.currentTarget.dataset.fanid;
    this.setData({
      fanIndex: index
    });
    this.query()
  },
  query() {
    const self = this;
    const { platform, fanIndex } = this.data;
    const { start_fans_num, end_fans_num } = getFansNum(fanIndex);
    const params = {
      "page": 1,
      "page_size": 20,
      "platform": platform,
      start_fans_num,
      end_fans_num
    }
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://qydata.club/yxserver/api/anchor/',
      data: params,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        let whList = res.data.data.auctions;
        self.setData({
          list: whList
        })
        wx.hideLoading()
      }
    })
  },
  voView(event) {
    let index = event.currentTarget.dataset.whid;
    const item = this.data.list[index];
    try {
        wx.setStorageSync('wh', item);
        wx.navigateTo({
          url: `/pages/red/detail/detail?${index}`
        })
    } catch (e) {

    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.query()
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