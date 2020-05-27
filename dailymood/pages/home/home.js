// dailymood/pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weekArr: ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.","Sat."],
    time: {
      nowYear: new Date().getFullYear(),
      nowMonth: new Date().getMonth(),
      nowDate: new Date().getDate()
    },
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    value: [new Date().getFullYear() - 2000, new Date().getMonth()],
    years:[],
    showTimePicker:false, //是否显示日期选择器
  },
  // 切换上一个月
  toPrevMonth(){
    let newMonth = this.data.time.nowMonth - 1;
    let newYear = this.data.time.nowYear;
    if(newMonth < 0){
      newMonth = 11;
      newYear--;
    }
    let newTime = {
      nowYear: newYear,
      nowMonth: newMonth,
      nowDate: this.data.time.nowDate
    }
    this.setData({
      time:newTime
    })
  },
  // 切换下一个月
  toNextMonth() {
    let newYear = this.data.time.nowYear;
    let newMonth = this.data.time.nowMonth + 1;
    if (newYear == new Date().getFullYear() && newMonth > new Date().getMonth()){
      wx.showToast({
        title: '不能写未来日记哦',
        icon:'none',
        duration:1500
      })
      return;
    }
    if (newMonth > 11) {
      newYear++;
      if (newYear > new Date().getFullYear()){
        return;
      }else {
        newMonth = 0;
      }
    }
    let newTime = {
      nowYear: newYear,
      nowMonth: newMonth,
      nowDate: this.data.time.nowDate
    }
    this.setData({
      time: newTime
    })
  },
  //选择日期
  chooseDate() {
    //重置日期选择器的日期
    this.setData({
      value:[this.data.time.nowYear-2000,this.data.time.nowMonth]
    })
    let date = new Date(), tempYears = [];
    for (let i = 2000; i <= date.getFullYear(); i++) {
      tempYears.push(i);
    }


    this.setData({
      years: tempYears,
      showTimePicker:true
    })
  },
  //确认选择日期
  bindChanges(e) {
    let val = e.detail.value;
    let choosedYear = this.data.years[val[0]];
    let monthsArr = [];

    if(choosedYear < new Date().getFullYear()){
      monthsArr = [1,2,3,4,5,6,7,8,9,10,11,12]
    }else {
      for (let i = 0; i < new Date().getMonth() + 1; i++) {
        monthsArr.push(i + 1);
      }
    }
    this.setData({
      months:monthsArr
    })
    let choosedMonth = this.data.months[val[1] - 1];
    this.setData({
      time: {
        nowYear: choosedYear,
        nowMonth: choosedMonth || 0,
        nowDate: this.data.time.nowDate
      }
    })
  },
  toConfirm() {
    this.setData({
      showTimePicker: false
    })
  },
  // 跳转到另一小程序
  toHelpline() {
    wx.navigateToMiniProgram({
      appId: "wxbebb3cdd9b331046",
      path: "doctor/pages/psychological/psychological?id=79&title=全国心理援助热线查询&footer=地方热线数据来自健康中国政务新媒体平台/n高校热线数据来自中国大学生在线网站",
      success: function(res){
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //设置日期选择器可选择的月份
    let monthsArr = [];
    for (let i = 0; i < new Date().getMonth() + 1; i++) {
      monthsArr.push(i + 1);
    }
    this.setData({
      months:monthsArr
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