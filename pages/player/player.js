
Page({
  data:{
    ctrl: "音乐控制区域",
    cpTime: '00:00',
    duration: '00:00',
    lrcList: []
  },
  onLoad:function(param) {
  
  },
  onReady:function(){
 
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
    api.playCtrl.pause()
  },
  onUnload:function(){
    // 页面关闭
  }
})
