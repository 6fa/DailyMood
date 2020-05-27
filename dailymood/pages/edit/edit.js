// pages/edit/edit.js
Page({

  /**
   * 页面的初始数据
   */
  //进入这个页面时，确认是否已经提交过心情
  data: {
    time:'',
    moodArr:['心情超棒','不错的一天','平静的一天','有点难过','情绪低迷'],
    scoreArr:[30,20,10,-10,-20],
    clickItemIndex:0, //心情
    inputVal: '', //输入框里的文字
    buttonMsg: '完成', //按钮上的文字
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let info = JSON.parse(options.moodDetail)
    console.log('info',info);
    if (info.moodType || info.moodType == 0){
      let time = info.time.split('T')[0]
      this.setData({
        time: time,
        clickItemIndex: info.moodType,
        inputVal: info.msg,
        buttonMsg: '修改'
      })
    }else {
      this.setData({
        time: info.time.split('T')[0]
      })
    }
  },

  // 点击心情
  clickMood(e){
    this.setData({
      clickItemIndex: e.currentTarget.dataset.num
    })
  },
  
  //提交内容
  customConfirm(e){
    let val = e.detail.value.textarea;
    this.setData({
      inputVal:val
    })
    wx.cloud.callFunction({
      name: 'editMood',
      data: {
        time: this.data.time,
        moodType: this.data.clickItemIndex,
        message: this.data.inputVal
      }
    }).then(res => {
      console.log('提交心情成功',res); 
    })
    //提交后弹出提示框
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 1500,
      success: function(){
        setTimeout(()=>{
          wx.navigateBack({
            delta: 1
          })
        },1500)
      }
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