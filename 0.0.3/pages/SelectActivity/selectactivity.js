// pages/SelectActive/selectactive.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    data_list: "null",
    contain_list: "null"
  },

  /**
   * 用户点击信息框
   */
  onLeave: function(event) {
    // 标志打开页面id
    var d_id = event.currentTarget.dataset.d_id_; //对应触摸主键 在selectactivity.wxml
    console.log("send d_id: " + d_id)

    // wx.redirectTo({})
    wx.navigateTo({
      url: "../ActivityInfo/activityinfo?id=" + d_id
    }); /* 换页 */
  },

  onMine: function (event) {
    wx.redirectTo({
      url: "../Mine/mine"
    }); /* 换页 */
  },

  onSignin: function (event) {
    wx.redirectTo({
      url: "../Signin/signin"
    });
  },

  onNavigation: function (event) {
    wx.redirectTo({
      url: "../Navigation/navigation"
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    // 这个地方非常重要，重置data{}里数据时候setData方法的this应为以及函数的this, 如果在下方的sucess直接写this就变成了wx.request()的this了

    // 下载资源文件
    wx.request({
      url: 'http://www.burx.pro/data/basic_data.json',
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data)
        that.setData({
          data_list: res.data.basic_data,
          contain_list: res.data.contain_data
        })
      },
      fail(res){
        that.setData({
          data_list: "fail",
          contain_list: "fail"
        })
      }

    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

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