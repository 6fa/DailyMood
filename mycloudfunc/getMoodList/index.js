// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const setTimeInterval = function(obj){
  let {year,month} = obj;
  let daysNum = new Date(year,month+1,0).getDate(); //天数
  return {
    startTime: new Date(year,month,1),
    endTime: new Date(year,month,daysNum)
  }
}

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  const _ = db.command;
  const mood = db.collection('mood');
  const wxContext = cloud.getWXContext();
  if(event.searchType == 'month'){
    //查找某用户某年某个月的 心情列表

    let timeInterval = setTimeInterval(event.time)

    return await mood.where({
      userOpenId: wxContext.OPENID,
      time: _.gte(timeInterval.startTime).and(_.lte(timeInterval.endTime))
    }).get().then(res => {
      console.log('每月心情列表',res);
      let defineRes = [];
      for(var i=0;i<res.data.length;i++){
        let dateIndex = res.data[i].time.getDate();
        let defineObj = {};
        defineObj.dateIndex = dateIndex;
        defineObj.moodType = res.data[i].moodType;
        defineObj.time = res.data[i].time;
        defineObj.msg = res.data[i].msg;
        defineRes.push(defineObj);
      }
      return new Promise((resolve)=>{
        resolve(defineRes);
      })
    })
  } else if (event.searchType == 'year'){
    //查找某用户某年的心情列表, 超过100条则要分几次取出
    let year = event.time.year;
    let startT = new Date(year,0,1);
    let endT = setTimeInterval({
      year:year,
      month:11
    }).endTime;
    const MAX_LIMIT = 100;

    //计算总共多少条
    const countResult = await mood.where({
      userOpenId: wxContext.OPENID,
      time: _.gte(startT).and(_.lte(endT))
    }).count();
    const total = countResult.total;

    //计算需分几次取出
    const batchTimes = Math.ceil(total/100);

    //承载所有读操作的promis的数组
    const tasks = [];
    for(let i = 0; i < batchTimes; i++){
      const promise = mood.where({
        userOpenId: wxContext.OPENID,
        time: _.gte(startT).and(_.lte(endT))
      })
      .skip(i*MAX_LIMIT)
      .limit(MAX_LIMIT)
      .get();
      tasks.push(promise);
    }
    return await Promise.all(tasks).then(async res => {
      if (!res[0]) {
        return {
          data: []
        }
      } 
      let arr = []
      for (let k = 0; k < res.length; k++) {
        for (let j = 0; j < res[k].data.length; j++) {
          let defineObj = {
            dateIndex: res[k].data[j].time.getDate(),
            monthIndex: res[k].data[j].time.getMonth(),
            moodType: res[k].data[j].moodType,
            msg: res[k].data[j].msg
          }
          arr.push(defineObj)
        }
      }
      return {
        data:arr
      }
    });
    
  }

}