
Page({
    data:{
        cpTime: '00:00',
        duration: '00:00',
        musicPg: 0,
        isPlaying: false,
        items: [],
        itemIndex: -1,
    },

    onLoad:function(param) {
        this.loadData();
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
                //console.log(res);
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
            wx.playBackgroundAudio({
                dataUrl: that.data.items[that.data.itemIndex].audio,
                title: that.data.items[that.data.itemIndex].title      
            });
            that.setData({ isPlaying: true });
            setInterval(function(){
                wx.getBackgroundAudioPlayerState({
                    success: function (res) {
                        if (res.currentPosition && res.duration)
                        {
                            if (res.status == 1) {
                                that.setData({ isPlaying: true });
                            }
                            else {
                                that.setData({ isPlaying: false });
                            }
                            var cpTimeMin = parseInt(res.currentPosition / 60);
                            cpTimeMin = cpTimeMin < 10 ? "0" + cpTimeMin : cpTimeMin;
                            var cpTimeSec = parseInt(res.currentPosition % 60);
                            cpTimeSec = cpTimeSec < 10 ? "0" + cpTimeSec : cpTimeSec;
                            that.setData({ cpTime: cpTimeMin + ":" + cpTimeSec });
                            var durationMin = parseInt(res.duration / 60);
                            durationMin = durationMin < 10 ? "0" + durationMin : durationMin;
                            var durationSec = parseInt(res.duration % 60);
                            durationSec = durationSec < 10 ? "0" + durationSec : durationSec;
                            that.setData({ duration: durationMin + ":" + durationSec });
                            if (res.duration > 0)
                            {
                                that.setData({ musicPg: res.currentPosition / res.duration * 100});
                            }
                            //if end of play then next
                            if (res.currentPosition > res.duration - 3 )
                            {
                                that.moveNext();
                            }
                        }   
                    }
                })
            }, 1000); 
        }
    },

    moveNext: function(){
        var that = this;
        var itemIndex = that.data.itemIndex;
        itemIndex ++;
        if (itemIndex > (that.data.items.length -1))
        {
            itemIndex = 0;
        }
        that.setData({ 
            itemIndex: itemIndex,
            cpTime: '00:00',
            duration: '00:00',
            musicPg: 0,
            isPlaying: true,
        });
        wx.stopBackgroundAudio();
        wx.playBackgroundAudio({
            dataUrl: that.data.items[that.data.itemIndex].audio,
            title: that.data.items[that.data.itemIndex].title
        });
    },

    movePrevious: function(){
        var that = this;
        var itemIndex = that.data.itemIndex;
        itemIndex--;
        if (itemIndex < 0) {
            itemIndex = that.data.items.length - 1;
        }
        that.setData({
            itemIndex: itemIndex,
            cpTime: '00:00',
            duration: '00:00',
            musicPg: 0,
            isPlaying: true,
        });
        wx.stopBackgroundAudio();
        wx.playBackgroundAudio({
            dataUrl: that.data.items[that.data.itemIndex].audio,
            title: that.data.items[that.data.itemIndex].title
        });
    },

    playAndPause: function(){
        var that = this;
        if (that.data.isPlaying)
        {
            wx.pauseBackgroundAudio();
            that.setData({ isPlaying: false });
        }
        else
        {
            wx.playBackgroundAudio();
            that.setData({ isPlaying: true });
        }
    }
})
