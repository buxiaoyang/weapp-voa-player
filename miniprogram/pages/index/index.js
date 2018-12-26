var app = getApp();//取得全局App({..})实例
Page({
  onLoad:function(param) {
      wx.showShareMenu({
          withShareTicket: true
      })
  },

  onShow: function () {
    
  },

  onHide: function () {
    
  },

  standard: function(){
      wx.navigateTo({
          url: '/pages/standard/index',
      })
  },

  special: function () {
      wx.navigateTo({
          url: '/pages/special/index',
      })
  },

  comment: function (e) {
    app.globalData.userInfo = e.detail.userInfo;
    wx.navigateTo({
      url: '/pages/comment/index',
    })
  }
})
