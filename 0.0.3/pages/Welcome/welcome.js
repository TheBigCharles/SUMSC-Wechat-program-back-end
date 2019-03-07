// pages/Welcome/welcome.js
// 页面注册
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animation:{},
    text:"\n苏州大学微软学生俱乐部\n报名系统\nSUMSC\n\n Version 0.0"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // 5秒后关闭logo页，转至活动选择页面
    setTimeout(function () {
      wx.redirectTo({
        url: '../SelectActivity/selectactivity'
      })
    }, 5000)
    
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
    var animation = wx.createAnimation({
      duration: 2000,
      timingFunction: 'ease',
    })

    this.animation = animation

    // animation.scale(2, 2).rotate(45).step()

    this.setData({
      animation: animation.export()
    })

    var repeat = 5;
    var n = 0;
    //连续动画需要添加定时器,所传参数每次+1就行
    var repeater = setInterval(function () {
      if (repeat == 0){
        clearInterval(repeater)
      }
      else {
        repeat = repeat - 1
        // animation.translateY(-60).step()
        n = n + 1;
        console.log(n);
        this.animation.rotate(360 * (n)).step()
        this.setData({
          animation: this.animation.export()
        })
      }
    }.bind(this), 1500)
      


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