// dailymood/pages/dairy/dairy.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    monthIndex:0,
    moodList:[],
    year:new Date().getFullYear()
  },
  // 切换月份
  monthPrev:function(){
    let month = this.data.monthIndex - 1;

    if (month < 0) {
      month = 11;
    }
    this.setData({
      monthIndex:month
    })
  },
  monthNext: function () {
    let month = this.data.monthIndex + 1;
    if(month > 11){
      month = 0;
    }
    this.setData({
      monthIndex:month
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = app.globalData.moodListOfYear;
    let year = app.globalData.year

    this.setData({
      moodList:data,
      year:year
    })
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