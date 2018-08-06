
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
    }
})
