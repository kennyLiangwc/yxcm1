//获取应用实例
const app = getApp()

Page({
  data: {
    indicator: true,
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
    ],
    grids: [0, 1, 2, 3, 4, 5]
  },

  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '当前页面'
    })
  },

  // 显示二维码
  goWecode() {
    wx.navigateTo({
      url: '/pages/index/wecode/wecode'
    })
  },

  // 拨打电话
  callPhone() {
    wx.makePhoneCall({
      phoneNumber: '13602505028',
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },

  // 显示地址
  goAddress() {
    wx.navigateTo({
      url: '/pages/index/address/address'
    })
  },

  // 公司详情
  goDetails() {
    wx.navigateTo({
      url: '/pages/index/companyDetail/companyDetail'
    })
  },

})