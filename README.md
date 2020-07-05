# 一个简单的记录心情小程序

## 介绍
  这是一个简单的用于记录心情的小程序，使用了云开发的数据库和云函数。
  主要功能：
  - 可记录每天的心情好坏程度
  - 可写简短的心情日记
  - 查看全年的心情总结
  - 心情小便签

## 目录结构
  - assets: 存放字体及图片
  - components：组件
    - calendar：日历组件
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



## 安装使用
  ### 下载源码
  clone项目到本地，或者点击Download Zip下载到本地后解压

  ### 创建项目
  使用微信开发者工具新建项目， 目录指向下载好的源码，填入自己的AppID，并且勾选后端服务为 小程序·云开发。
  新建项目后，点击“云开发”按钮，开通云开发、创建新的环境。

  ### 添加集合
  点击“数据库”按钮，添加如下集合：happyNotes，mood，sadNotes

  ### 部署云函数
  关闭云开发控制台，回到微信开发者工具界面，将项目目录中mycloudfunc文件夹的环境指向刚才新建的环境。
  将mycloudfunc中所有云函数右键点击“上传并部署”。

  ### 配置修改
  dailymood目录下，进入app.js，将wx.cloud.init函数中的env指定为你自己的环境。
  点击菜单栏中的编译即可查看效果。