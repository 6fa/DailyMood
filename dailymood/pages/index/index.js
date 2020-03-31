// dailymood/pages/index/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onGotUserInfo:function(e){
    console.log(e.detail)
    let info = e.detail.userInfo;
    if(info){ //用户点了授权按钮
      app.globalData.userNickname = info.nickName;
      wx.switchTab({
        url: '/pages/home/home',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //查看用户是否授权
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

  },

  clickBtn: function () {
    wx.switchTab({
      url: '../home/home',
    })
  }
})