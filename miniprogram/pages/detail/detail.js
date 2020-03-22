// miniprogram/pages/detail/detail.js
let datas=require("../../datas/list-data.js");
console.log("详情页--->"+datas);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailObj:{},
    index:null,
    isCollected:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let index=options.index;
    //更新data中detailObj的状态值
    this.setData({
      detailObj: datas.list_data[index]
    })
  },
  //收藏和没有收藏按钮
  handleCollection(){
    console.log("是否收藏this-->"+this);
    let thisIsCollected = !this.data.isCollected;
    let whetherTitle = thisIsCollected==false?"取消收藏成功":"收藏成功";
    //弹出提示框
    wx.showToast({
      title: whetherTitle,
      icon:"success"
    })
    //更新收藏按钮的点击状态
    this.setData({
      isCollected: thisIsCollected
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