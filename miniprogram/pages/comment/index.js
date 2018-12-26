// pages/comment/index.js
var util = require('../../util.js')
var app = getApp();//取得全局App({..})实例
const db = wx.cloud.database()
const commentsCollection = db.collection("comments");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments:[],
    comment:{
      comment:""
    },
    loadingMoreData: false,
    noMoreData: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      comments:[],
      noMoreData: false
    })
    this.loadComments();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      comments: [],
      noMoreData: false
    })
    this.loadComments();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    if (!that.data.noMoreData && !that.data.loadingMoreData) {
      that.loadComments();
    }
  },

  bindContentChange: function (e) {
    var comment = this.data.comment;
    comment.comment = e.detail.value;
    this.setData({
      comment: comment
    })
  },

  saveComment: function (e) {
    var that = this;
    var comment = that.data.comment;
    if (comment.comment.length === 0) {
      util.showFail('留言内容不能为空');
      return;
    }
    comment["created"] = db.serverDate();
    comment["createdBy"] = app.globalData.userInfo;
    util.showBusy('正在保存');
    commentsCollection.add({
      data:comment,
      success:res => {
        util.showSuccess('留言成功');
        this.setData({
          comments: [],
          noMoreData: false
        })
        this.loadComments();
        console.log('request succeed',res)
      },
      fail: res => {
        util.showModel('留言失败', res)
        console.error('request fail', res)
      }
    });
  },

  loadComments: function () {
    var that = this;
    var start = that.data.start;
    that.setData({
      loadingMoreData: true
    })
    if (that.data.comments.length == 0)
    {
      commentsCollection
        .orderBy('created', 'desc').limit(10)
        .get()
        .then(res => {
          //显示数据
          console.log('request succeed', res)
          that.loadCommentsSucceed(res);
        })
        .catch(res => {
          console.error('request fail', res)
          that.loadCommentsSucceed(res);
        })
    }
    else
    {
      commentsCollection
        .orderBy('created', 'desc').limit(10).skip(that.data.comments.length)
        .get()
        .then(res => {
          //显示数据
          console.log('request succeed', res)
          that.loadCommentsSucceed(res);
        })
        .catch(res => {
          console.error('request fail', res)
          that.loadCommentsSucceed(res);
        })
    }
    
  },

  loadCommentsSucceed: function (res) {
    var that = this;
    that.setData({
      loadingMoreData: false
    })
    if (res.data.length < 10) {
      that.setData({
        noMoreData: true
      });
    }
    var comments = that.data.comments;
    res.data.forEach(function (element) {
      element.created = util.formatTimeMinute(element.created );
    });
    comments.push.apply(comments, res.data);
    that.setData({
      comments: comments
    });
  },

  loadCommentsFailed: function (res) {
    var that = this;
    that.setData({
      loadingMoreData: false
    })
    util.showModel('加载留言失败', res)
  },

})