// pages/report/report.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    thisYear: new Date().getFullYear(),
    startYear:'2000', //选择器开始日期
    endYear:new Date().getFullYear(), //选择器结束日期
    monthArr: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    scoreArr: [30, 20, 10, -10, -20], //每种心情对应的分数
    moodText: ['心情非常棒', '心情不错哦', '心情一般般', '心情较差', '心情低迷'],
    dateArr:[],//每月有多少天
    moodPercent:[20,30,14,15,25], //后面要提取到数据进行计算
    generalRes: {},//概括性数据
    detailRes:[],//全年12个月的具体心情记录
    noRecord:false, //这一年没有心情记录

    everyday:[], //每天的情况（包括无记录天、留言）
    isLoading: false, //是否正在加载数据，用于加载数据时的 loading 效果

  },
  //选择年份
  yearChange(e){
    this.setData({
      thisYear:e.detail.value
    })
    //提交请求到后台，渲染数据
    this.getYearMoods();
  },
  //得到全年的心情记录
  getYearMoods:function(){
    this.setData({
      isLoading:true
    })
    wx.cloud.callFunction({
      name:'getMoodList',
      data:{
        time:{
          year:this.data.thisYear
        },
        searchType: 'year'
      },
    }).then(res => {
      console.log('mooddata',res);

      //如果返回的数据为空
      if (res.result.data.length == 0){
        this.setData({
          noRecord: true,
          isLoading: false,
          everyday:[]
        })
        return;
      }

      //对返回的数据进行分类处理
      let dataArr = res.result.data;
      let newDataArr = [];
      for(let i = 0; i< 12; i++){
        newDataArr.push([]);
      }

      let tempGeneralRes = {
        totalScore:0,
        recordNum:0,
        moodType_1:0,
        moodType_2:0,
        moodType_3:0,
        moodType_4:0,
        moodType_5:0
      }
      for(let i = 0; i < dataArr.length; i++){
        let monthIndex = dataArr[i].monthIndex;
        newDataArr[monthIndex].push(dataArr[i]);
        switch(dataArr[i].moodType){
          case 0:
            tempGeneralRes.moodType_1++;
            tempGeneralRes.totalScore += this.data.scoreArr[0];
            break;
          case 1:
            tempGeneralRes.moodType_2++; 
            tempGeneralRes.totalScore += this.data.scoreArr[1]
            break;
          case 2:
            tempGeneralRes.moodType_3++;
            tempGeneralRes.totalScore += this.data.scoreArr[2]
            break;
          case 3:
            tempGeneralRes.moodType_4++;
            tempGeneralRes.totalScore += this.data.scoreArr[3]
            break;
          case 4:
            tempGeneralRes.moodType_5++;
            tempGeneralRes.totalScore += this.data.scoreArr[4]
            break;
        }
      }
      tempGeneralRes.recordNum = dataArr.length;
      //计算各类心情百分比：
      let percent = [];
      for(let i = 0; i<5;i++){
        let moodType = 'moodType_' + (i+1);
        let score = (tempGeneralRes[moodType] / tempGeneralRes.recordNum * 100).toFixed(1)
        percent.push(score)
      }
      this.setData({
        detailRes:newDataArr,
        generalRes:tempGeneralRes,
        moodPercent:percent
      })

      //整理、排序生成每天数据
      let tempEveryDay = [];//承载每月每天情况
      for(let i = 0; i<12;i++){
        let daysNum = this.data.dateArr[i], //每月天数
            tempArr = new Array(daysNum) //承载某月每天情况
        for(let j = 0; j<daysNum; j++){
          let detailLen = this.data.detailRes[i].length; //每月有记录的长度
          if(detailLen != 0){
            for (let k = 0; k < detailLen; k++) {
              if (this.data.detailRes[i][k] && this.data.detailRes[i][k].dateIndex == j + 1) {
                tempArr[j] = {
                  moodType: this.data.detailRes[i][k].moodType,
                  dateIndex: j + 1,
                  monthIndex: i,
                  moodText: this.data.moodText[this.data.detailRes[i][k].moodType],
                  msg: this.data.detailRes[i][k].msg,
                }
                break;
              } else {
                tempArr[j] = {
                  dateIndex: j + 1,
                  monthIndex: i
                }
              }
            }
          }else {
            tempArr[j] = {
              dateIndex: j + 1,
              monthIndex: i
            }
          }
        }
        tempEveryDay.push(tempArr);
      }
      this.setData({
        everyday: tempEveryDay,
        isLoading: false,
        noRecord: false
      })
      app.globalData.moodListOfYear = tempEveryDay;
      app.globalData.year = this.data.thisYear;
      console.log(this.data.everyday);
    })
  },

  //查看心情日记
  toShowMsg:function(){
    wx.navigateTo({
      url:"/pages/dairy/dairy"
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let dayTempArr = [];
    for(let m = 1; m <= 12; m++){
      let newDate = new Date(this.data.thisYear, m, 0)
      let daysNum = newDate.getDate();
      console.log(daysNum)
      dayTempArr.push(daysNum);
    }
    
    this.setData({
      username:app.globalData.userNickname,
      dateArr:dayTempArr
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
    this.getYearMoods();
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