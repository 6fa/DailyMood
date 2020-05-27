# 一个简单的记录心情小程序

## 介绍
  这是一个简单的用于记录心情的小程序，使用了云开发的数据库和云函数。
  主要功能：
  - 可记录每天的心情好坏程度
  - 可写简短的心情日记
  - 查看全年的心情总结
  - 心情小便签

## 目录结构
  - assets: 字体及图片
  - components: 日历组件
  - pages: 页面
    - dairy: 全年的心情日记
    - edit: 心情记录编辑页面
    - home: 首页
    - index： 进入页面
    - note: 心情便签页面
    - report： 心情报告页面
  - app.js/app.wxss/app.json/project.config.json: 配置
  - mycloudfunc: 云函数
    - addNote: 增加一条心情便签
    - delNote: 删除一条心情便签
    - editMood: 心情编辑（存在则修改，不存在则增加）
    - getMoodList: 取得心情列表
    - getNotes: 取得便签列表


## 部分页面截图
  ### 首页
  ![首页截图](/dailymood/assets/screenshot/home.png)

  ### 编辑
  ![编辑截图](/dailymood/assets/screenshot/edit.png)

  ### 报告
  ![报告截图](/dailymood/assets/screenshot/report.png)

  ### 便签
  ![便签截图](/dailymood/assets/screenshot/note.png)
