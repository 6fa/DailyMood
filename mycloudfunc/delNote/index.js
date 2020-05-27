// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  // API 调用都保持和云函数当前所在环境一致
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

  return await typeCollection.where({
    content: event.content,
    _id: event.id
  }).remove().then(res => {
    return {
      state: true,
      data: res
    }
  }).catch(err => {
    return {
      state: false,
      err: err
    }
  })
}