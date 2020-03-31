// components/calendar/calendar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    year: {
      type: Number
    },
    month: {
      type: Number
    },
    date: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    thisYear:new Date().getFullYear(),
    thisMonth:new Date().getMonth(),
    daysArray: [],
    dayIndex: 0,
    dayIndexArray:[],
    monthMoodList: [], //某月的心情数据
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 得到某年某月天数
    getDaysNum: function(year,month){
      let newDate = new Date(year,month+1,0);
      return newDate.getDate();
    },
    // 某年某月第一天是周几
    weekOfDayOne: function(year,month){
      let newDate = new Date(year, month,1);
      return newDate.getDay();
    },
    // 更新某年某月日历
    setCalendar:function(){
      let daysNum = this.getDaysNum(this.data.year, this.data.month);
      let arr = [];
      for(let i = 1; i<=daysNum; i++){
        arr.push(i);
      }
      let index = this.weekOfDayOne(this.data.year, this.data.month);
      let indexArr = [];
      for(let i = 0; i < index; i++){
        indexArr.push(i);
      }
      this.setData({
         daysArray:arr,
         dayIndex:index,
         dayIndexArray:indexArr
      })
    },
    //点击日期时
    toEdit:function(e){
      let moodDetail = e.currentTarget.dataset.moodinfo;
      console.log('e.currentTarget.dataset', e.currentTarget.dataset);
      let url = '/pages/edit/edit?moodDetail=' + JSON.stringify(moodDetail);

      wx.navigateTo({
        url: url,
      })
    },

    //------获取某月的心情记录列表
    toGetMoodList: function(){
      wx.cloud.callFunction({
        name: 'getMoodList',
        data: {
          time: {
            year: this.data.year,
            month: this.data.month,
            date: this.data.date
          },
          searchType: 'month'
        }
      }).then(res => {
        console.log('返回的心情列表', res.result);
        let tempArr = new Array(this.data.daysArray.length);
        //如果返回的是空列表
        if(res.result.length == 0){
          for (let i = 0; i < this.data.daysArray.length; i++){
            // let time = new Date(this.data.year, this.data.month, i + 2);
            tempArr[i] = {
              time: new Date(this.data.year, this.data.month, i+2).toISOString()
            }
          }
          this.setData({
            monthMoodList: tempArr
          })
          return;
        }
        //如果有数据返回
        for(let i= 0; i < this.data.daysArray.length; i++){
          for(let j = 0; j < res.result.length; j++){
            if(i == res.result[j].dateIndex-1){
              tempArr[i] = res.result[j];
              break;
            }else {
              let time = new Date(this.data.year, this.data.month, i+2);
              tempArr[i] = {
                time:time.toISOString()
              }
            }
          }
        }
        this.setData({
          monthMoodList: tempArr
        })
      })
    }
  },
  /**
   * 监听
   */
  observers:{
    'year,month,date':function(){
      this.setCalendar();
      console.log('切换日期')
      this.toGetMoodList();
    }
  },

  /**
   * 组件的生命周期
   */
  lifetimes: {
    attached: function(){
      console.log('year',this.data.year)
    }
  },
  /**
   * 组件所在页面的生命周期
   */
  pageLifetimes: {
    show: function(){
      //更新数据
      this.toGetMoodList();
    }
  }
})
