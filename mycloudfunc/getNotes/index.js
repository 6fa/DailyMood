// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const happyNotes = db.collection('happyNotes')
  const sadNotes = db.collection('sadNotes')

  let typeCollection
  if (event.type === 'happy') {
    typeCollection = happyNotes
  } else if (event.type === 'sad') {
    typeCollection = sadNotes
  }
  // 如果超出100条要分次取出
  const MAX_LIMIT = 100;
  // 总条数
  const totalRes = await typeCollection.where({
    userOpenId: wxContext.OPENID
  }).count()

  const total = totalRes.total
  //计算需分几次取出
  const batchTimes = Math.ceil(total/100);
  //承载所有读操作的promis的数组
  const task = []
  for (let i = 0; i < batchTimes; i++) {
    const promise = typeCollection.where({
      userOpenId: wxContext.OPENID
    })
    .skip(i*MAX_LIMIT)
    .limit(MAX_LIMIT)
    .get()

    task.push(promise)
  }
  return await Promise.all(task).then(res => {

    if (!res[0]) {
      console.log('1233333333333333333')
      return {
        state: true,
        data: []
      }
    }
    let arr = []
    for (let i = 0; i < res.length; i++) {
      for (let j = 0; j < res[i].data.length; j++) {
        let defineObj = {
          content: res[i].data[j].content,
          id: res[i].data[j]._id
        }
        arr.push(defineObj)
      }
    }
    return {
      state: true,
      data: arr
    }
  }).catch(err => {
    return {
      state: false,
      err: err
    }
  })
}