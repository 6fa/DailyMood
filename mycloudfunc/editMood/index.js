// 云函数入口文件
const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

const timeFormat = function(obj){ 
  let {date,month,year} = obj;
  if(date <= 9){
    date = '0' + date
  }
  if(month <= 9){
    month = '0' + month;
  }
  return year+'-'+month+'-'+date;
}

// 云函数入口函数

//-----------------------------------写法1
// exports.main = async (event, context) => {
//   const db = cloud.database();
//   const mood = db.collection('mood');
//   const wxContext = cloud.getWXContext()
//   let time = timeFormat(event.time);
//   console.log('test');
//   //如果用户在这天已经有了心情记录，则修改数据
//   //首先查找是否有
//   return new Promise((resolve,reject)=>{
//     mood.where({
//       time: new Date(time),
//       userOpenId: wxContext.OPENID
//     }).get().then(res => {
//       if (res.data.length == 0){ //不存在
//         mood.add({
//           data: {
//             moodType: event.moodType,
//             msg: event.message,
//             time: new Date(time),
//             userOpenId: wxContext.OPENID
//           }
//         }).then(() => {
//           resolve({msg:'未存在，增加成功',event:event})
//         })
//       }else { //已存在
//         mood.where({
//           time: new Date(time),
//           userOpenId: wxContext.OPENID
//         }).update({
//           data: {
//             moodType: event.moodType,
//             msg: event.message
//           }
//         }).then(()=>{
//           resolve({msg:'已存在，更新数据',event:event})
//         })
//       }
//     })
//   }).catch(err => {
//     console.log(err);
//   })
// }


//-----------------------------------写法2
exports.main = async (event, context) => {
  const db = cloud.database();
  const mood = db.collection('mood');
  const wxContext = cloud.getWXContext()
  //如果用户在这天已经有了心情记录，则修改数据
  //首先查找是否有
  return await mood.where({
    time: new Date(event.time),
    userOpenId: wxContext.OPENID
  }).get().then(async (res) => {
    console.log(res.data);
    if(res.data.length == 0){ //不存在则增加
      try {
        await mood.add({
          data: {
            moodType: event.moodType,
            msg: event.message,
            time: new Date(event.time),
            userOpenId: wxContext.OPENID
          }
        })
      }catch(err){
        console.log(err);
      }
    }else { //存在则更新
      try {
        await mood.where({
          time: new Date(event.time),
          userOpenId: wxContext.OPENID
        }).update({
          data: {
            moodType: event.moodType,
            msg: event.message
          }
        })
      }catch(err){
        console.log(err)
      }
    }
  })




  // -----------------------------------
  // 如果没有则增加一条心情记录
  // try {
  //   return await mood.add({
  //     data: {
  //       moodType: event.moodType,
  //       msg: event.message,
  //       time: new Date(time),
  //       userOpenId: wxContext.OPENID
  //     }
  //   })
  // }catch(e){
  //   console.log(err);
  // }
}