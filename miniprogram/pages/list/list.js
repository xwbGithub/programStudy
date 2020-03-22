// miniprogram/pages/list/list.js
let datas=require("../../datas/list-data.js");
console.log(datas,typeof datas);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listArray:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      listArray:datas.list_data
    })
  },
  //点击跳转到详情页
  toDetail(evet){
    console.log(evet);
    //跳转到页面，但是不能回退
    // wx.redirectTo({
    //   url: '/pages/detail/detail',
    // })
    //获取点击跳转对应的下标
    let index=evet.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/detail/detail?index='+index,
    })
  },
  //点击轮播图跳转
  carouselToDetail(event){
    console.log("list->"+event);
    let index=event.target.dataset.index;
    wx.navigateTo({
      url: '/pages/detail/detail?index='+index,
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