//获取应用实例
const app = getApp()

Page({
  data: {
    indicator: true,
    imgUrls: [
      'http://p94d2qxd7.bkt.clouddn.com/lb-7-7-1.png',
      'http://p94d2qxd7.bkt.clouddn.com/lb-7-7-2.png',
      'http://p94d2qxd7.bkt.clouddn.com/lb-7-7-3.png',
      'http://p94d2qxd7.bkt.clouddn.com/lb-7-7-4.png',
      'http://p94d2qxd7.bkt.clouddn.com/lb-7-7-5.png'
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
      phoneNumber: '13602505028'
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