// pages/Enrollteam/enrollteam.js


Page({

  /**
   * 页面的初始数据
   */
  data: {
    teamsizeInput:1,
    teamsizemark:1,
    shengming: false,
    data_list: "null"
  },


  /**
   * 输入声明转存
   */

  switch1Change(e) {
    this.setData({
      shengming: e.detail.value
    })
  },

  teamsizechange(e) {
    this.setData({
      teamsizeInput: e.detail.value
    })
    console.log('team size:', e.detail.value)
  },

  /**
  * 表单上传
  */
  formSubmit(e) {
    var formdata = e.detail.value
    console.log("待上传表单数据", formdata)

    if (this.data.shengming == true) {
      wx.showModal({
        title: 'Is the information correct?',
        content: '后续改动会很麻烦',
        cancelText: "Nop!",
        confirmText: "Sure",
        success(res) {
          if (res.confirm) {
            // 上传表单
            console.log("表单数据", formdata)
            wx.request({
              url: 'http://www.burx.pro:10086/',
              data:{
                "name":"NAME"
              },
              method:"POST",
              header:{
                'content-type': 'application/json'
              },
              success(res){
                console.log(res)
              },
              fail(res){
                console.log(res)
              }
            })

            wx.redirectTo({
              url: "../Result/result"
            })
          } else if (res.cancel) {
            console.log('用户取消提交表单')
          }
        }
      })
    } else if (this.data.shengming == false) {
      wx.showToast({
        title: '缺少声明',
        icon: 'none',
        duration: 2000
      })
      console.log('用户信息不合法')
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;

    var d_id = options.id;
    this.data.current_id = d_id; //传递id至data
    console.log("recieve d_id [single]: " + d_id);

    // 下载资源文件
    var url = 'http://www.burx.pro/data/data_detail' + this.data.current_id + '.json';

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
      },
      fail(res){
        that.setData({
          data_list: "fail"
        })
      }

    });

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