// pages/ActivityInfo/activityinfo.js


Page({

  /**
   * 页面的初始数据
   */
  data: {
    data_list: "null"
  },
  
  thank(e){
    wx.showToast({
      title: '多谢反馈',
      icon: 'success', //水
      duration: 2000
    })
  },

  /**
   * 用户点击报名
   */
  onLeave: function (event) {
    var d_data = this.data.current_id;
    // 标志打开页面id
    // 对应按钮主键 activityinfo.wxml
    console.log("send d_id [2]: " + d_data)

    if (this.data.d_type == "团队"){
      // wx.redirectTo({})
      wx.navigateTo({
        url: "../Enrollteam/enrollteam?id=" + d_data
      }); /* 换页至多人 */
    }
    else if (this.data.d_type == "单人"){
      // wx.redirectTo({})
      wx.navigateTo({
        url: "../Enroll/enroll?id=" + d_data
      }); /* 换页至单人 */
    }
  },
    

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this; 
    // this is really important

    var d_id = options.id;
    this.data.current_id = d_id; //传递id至data
    console.log("recieve d_id: " + d_id);

    // 下载资源文件
    var url = 'http://www.burx.pro/data/data_detail' + this.data.current_id+ '.json';

    wx.request({
      url: url,
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data)
        that.setData({
          data_list: res.data
        })

        // 传递type至data 注意这里type是列表中字典的值
        var d_type = res.data.type;
        console.log("recieve d_type: " + d_type);
        that.setData({ d_type: d_type }); 
      },
      fail(res){
        that.setData({ data_list: "fail" }); 
      }

    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})