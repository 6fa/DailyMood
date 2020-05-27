// pages/note/delSad/delSad.js
import list from './delText'
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    img1: true,
    img2: false,
    img3: false,
    textList: list.textList,
    currentIndex: 0,
    currentText: '也要把糟糕的记忆从小脑袋里删掉才行',
    nextText: '然后呢'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toClose: function (e) {
      this.triggerEvent('closetips')
    },
    toNext: function () {
      const newIndex = this.data.currentIndex + 1
      this.setData({
        currentIndex: newIndex,
        currentText: this.data.textList[newIndex]
      })
      if (newIndex === 1) {
        this.setData({
          img1: false,
          img2: true,
          img3: false
        })
      }  else if (newIndex === this.data.textList.length - 1) {
        this.setData({
          img1: false,
          img2: false,
          img3: true,
          nextText: 'ok'
        })
      } else if (newIndex > this.data.textList.length - 1) {
        this.toClose()
        this.setData({
          img1: true,
          img2: false,
          img3: false,
          currentIndex: 0,
          currentText: '也要把糟糕的记忆从小脑袋里删掉才行',
          nextText: '然后呢'
        })
      }
    }
  },
})
