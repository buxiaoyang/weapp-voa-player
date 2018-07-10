
Page({
    data:{
        cpTime: '10:00',
        duration: '00:00',
        items: [],
        itemIndex: -1,
    },

    onLoad:function(param) {
        this.loadData();
        // wx.playBackgroundAudio({
        //     dataUrl: 'http://downdb.51voa.com/201806/mattis-nato-defense-ministerial.mp3',
        //     title: 'VOA'      
        // })
    },

    loadData: function()
    {
        var that = this;
        wx.showLoading({
            title: '加载中',
        })
        wx.request({
            url: 'https://weapp.euleriii.cn/data.json',
            success: function (res) {
                wx.hideLoading();
                console.log(res);
                if (res.statusCode != 200) {
                    wx.showModal({
                        title: '发生错误',
                        content: '请求资源失败，状态码：' + res.statusCode,
                        showCancel: false,
                        confirmText: "重新加载",
                        success: function (res) {
                            if (res.confirm) {
                                that.loadData();
                            }
                        }
                    })
                }
                else
                {
                    that.setData({ items: res.data.items });
                    that.buildList();
                }
            },
            fail: function (error) {
                wx.hideLoading();
                console.log(error)
                wx.showModal({
                    title: '发生错误',
                    content: '请求资源失败',
                    showCancel: false,
                    confirmText: "重新加载",
                    success: function (res) {
                        if (res.confirm) {
                            that.loadData();
                        }
                    }
                })
            },
        })
    },

    buildList: function(){
        var that = this;
        if (that.data.items && that.data.items.length > 0)
        {
            that.setData({ itemIndex: 0});
        }
    },
})
