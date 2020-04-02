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
    years:[],
    value:[],
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
    let date = new Date(), tempYears = [];
    for (let i = 2000; i <= date.getFullYear(); i++) {
      tempYears.push(i);
    }
    this.setData({
      years: tempYears,
      showTimePicker:true,
      value:[date.getFullYear()-2000,date.getMonth()]
    })
  },
  //确认选择日期
  bindChanges(e) {
    let val = e.detail.value;
    let choosedYear = this.data.years[val[0]];

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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //将日期设置回今日
    this.setData({
      time: {
        nowYear: new Date().getFullYear(),
        nowMonth: new Date().getMonth(),
        nowDate: new Date().getDate()
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