// pages/Navigation/navigasion.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers:"null"

  },

  onMine: function(event) {
    wx.redirectTo({
      url: "../Mine/mine"
    }); /* 换页 */
  },

  onSignin: function(event) {
    wx.redirectTo({
      url: "../Signin/signin"
    });
  },

  onSelect: function(event) {
    wx.redirectTo({
      url: "../SelectActivity/selectactivity"
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;

    wx.request({
      url: 'http://www.burx.pro/data/map_mark.json',
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data)
        that.setData({
          markers: res.data.markers
        })
      },
      fail(res){
        that.setData({
          markers:"fail"
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})