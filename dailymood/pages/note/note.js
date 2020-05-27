// pages/note/note.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showWriteLayer: false,
    showJumpBox: false,
    happyList: [],
    sadList: [],
    content: '', // 填写的内容
    type: '', // 填写的类型：happy/sad
    inputVal: '',
    showDelTips: false,
  },
  // 提示信息框
  showSuccessMsg: function (msg) {
    wx.showToast({
      title: msg,
      image: '/assets/images/happy.png',
      duration: 1500
    })
  },
  showFailMsg: function (msg) {
    wx.showToast({
      title: msg,
      image: '/assets/images/sad.png',
      duration: 1500
    })
  },
  // 写便签
  addHappyNote: function () {
    this.setData({
      showWriteLayer: true,
      type: 'happy'
    })
  },
  addSadNote: function () {
    this.setData({
      showWriteLayer: true,
      type: 'sad'
    })
  },
  // 关闭填写框
  writeCancel: function () {
    this.setData({
      showWriteLayer: false,
      inputVal: ''
    })
  },
  // 填写完成,提交
  writeDone: function (e) {
    if (!e.detail.value.textarea) return
    this.setData({
      showWriteLayer: false,
      content: e.detail.value.textarea,
      inputVal: ''
    })
    wx.cloud.callFunction({
      name: 'addNote',
      data: {
        type: this.data.type,
        content: this.data.content
      }
    }).then(res => {
      if (res.result.state) {
        this.showSuccessMsg('提交成功')
        // 重新获取便签内容
        this.getNoteList(this.data.type)
        
      } else {
        this.showFailMsg('提交失败')
      }
    })
  },
  // 跳转
  toHappy: function () {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },
  toSad: function () {
    wx.pageScrollTo({
      scrollTop: this.data.sadTop,
      duration: 300
    }) 
  },
  // 显示便签内容列表
  getNoteList: function (type) {
    wx.cloud.callFunction({
      name: 'getNotes',
      data: {
        type: type
      }
    }).then(res => {
      console.log(res)
      if (res.result.data) {
        let happylist, sadlist
        if (type === 'happy') {
          happylist = res.result.data.reverse()
          this.setData({
            happyList: happylist
          })
        } else if (type === 'sad') {
          sadlist = res.result.data.reverse()
          this.setData({
            sadList: sadlist
          })
        }
        this.setScroll()
      }
    })
  },
  // 删除便签
  delNote: function (e) {
    const target = e.target
    if (target.dataset.name && target.dataset.name === 'delete') {
      const data = {
        type: target.dataset.type,
        content: target.dataset.info.content,
        id: target.dataset.info.id
      }
      wx.cloud.callFunction({
        name: "delNote",
        data: data
      }).then(res => {
        console.log(res)
        if (res.result.state) {
          if (target.dataset.type === 'sad') {
            this.setData({
              showDelTips: true
            })
            this.getNoteList(target.dataset.type)
          } else if(target.dataset.type === 'happy') {
            this.showSuccessMsg('删除成功')
            this.getNoteList(target.dataset.type)
          }
        } else {
          this.showFailMsg('删除失败')
        }
      })
    }
  },
  // 关闭删除便签时弹出的
  closetips: function () {
    this.setData({
      showDelTips: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let windowHeight
    wx.getSystemInfo({
      success: (res) => {
        windowHeight = res.windowHeight
        this.setData({
          windowHeight: windowHeight
        })
      },
    })
    this.getNoteList('happy')
    this.getNoteList('sad')
  },
  setScroll: function () {
    let query = wx.createSelectorQuery()
    let pageHeight
    let sadTop
    query.select('#sad').boundingClientRect()
    query.select('.note-page').boundingClientRect().exec((rect) => {
      pageHeight = rect[1].height
      sadTop = rect[0].top
      this.setData({
        pageHeight: pageHeight,
        sadTop: sadTop + Math.abs(rect[1].top)
      })
      if (this.data.pageHeight > this.data.windowHeight) {
        this.setData({
          showJumpBox: true
        })
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