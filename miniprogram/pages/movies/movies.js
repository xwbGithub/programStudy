// miniprogram/pages/movies/movies.js
const MOVIES_URL="http://t.yushu.im/v2/movie/top250";
let appDatas = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moviesArr:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

      //网络请求获取数据
      wx.request({
        url: MOVIES_URL,
        success:(data)=>{
          this.setData({
            moviesArr:data.data.subjects
          });
          //塞入全局变量的电影列表
          appDatas.data.movieArr = data.data.subjects
        },
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