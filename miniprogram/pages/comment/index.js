// pages/comment/index.js
var util = require('../../util.js')
var app = getApp();//取得全局App({..})实例
//const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments:[],
    comment:{
      comment:"",
      created:new Date(),
      createdBy:app.globalData.userInfo
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  bindContentChange: function (e) {
    var comment = this.data.comment;
    comment.comment = e.detail.value;
    this.setData({
      comment: comment
    })
  },

  saveComment: function (e) {
    var comment = this.data.comment;
    if (comment.comment.length === 0) {
      util.showFail('留言内容不能为空');
      return;
    }
    var that = this;
    console.log("post: " + config.service.baseUrl + "/notice");
    util.showBusy('正在保存');
    /*
    qcloud.request({
      url: config.service.baseUrl + "/notice",
      method: 'POST',
      login: true,
      data: {
        GROUP_ID: app.globalData.userInfo.group[0].ID,
        CATEGORY_ID: that.data.categories[that.data.index].ID,
        TITLE: that.data.notice.TITLE,
        CONTENT: that.data.notice.CONTENT,
        ATTACHMENT: that.data.notice.ATTACHMENT.join("?;"),
        USER_ID: app.globalData.userInfo.user[0].ID,
      },
      success(result) {
        wx.hideToast();
        console.log(result);
        wx.reLaunch({ url: "/pages/notice/notice" });
      },
      fail(error) {
        util.showModel('保存失败', error)
        console.log('request fail', error)
      }
    })
    */
  },

})