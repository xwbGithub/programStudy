## 小程序
### 什么是小程序
  1、无需下载，用完即走(体积小，刚发布的压缩包体积不超过1M,2017年4月将1M审计为2M)
### 小程序的特点
  1、体积小
  2、童app进行互补的，可实现县app的基本功能
  3、微信扫一扫或者是搜索就可以下载
  4、开发周期短，成本较低
### 适配方案
    1、viewport适配width=device-width
    2、单位rpx
    3、iphone6: 1rpx=1物理像素=0.5px dpr=武力相似/设备独立像素=2
### 重要的文件
    1、wxml view结构--->html
    2、wxss view样式 --->css
    3、js view行为--->js
    4、json文件： 数据&&配置
### 注册小程序
    APP()
### 注测页面
    Page()
### 数据绑定
    1、在data中初始化页面需要的数据，在页面中可以直接使用
### 事件(冒泡事件|| 非冒泡事件)
    1、冒泡事件： bind+事件名
    2、费冒泡时间：catch +事件名
### 魔板template
    1、定义：template属性： name（标识魔板）
    2、使用:template属性： is(魔板的name)
    3、引入模板结构：<import src='路径'/>
    4、引入魔板样式： @import '路径'
    5、传参：data='{...item}'
### 列表渲染
    1、wx:for
    2、wx:key为每个元素个体标记
    3、遍历的个体： item
    4、遍历的下标： index
### currentTarget和target的区别
    1、target指向的是触发事件的元素
    2、currentTarget指向的是捕获事件的元素
