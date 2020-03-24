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
    isCollected:false,
    isMusicPlay:false
  },
  
  //------------------处理音乐播放功能------------------
  handleMusicPlay(){
    let isMusicPlay = !this.data.isMusicPlay;
    this.setData({ 
      isMusicPlay
      });
    //控制音乐播放
    if (isMusicPlay){
      //音乐播放
      let {dataUrl,title}=this.data.detailObj.music;
      wx.playBackgroundAudio({
        dataUrl, title
      })
    }else{
      //暂停播放
      wx.pauseBackgroundAudio();
    }
  },

  //------------------处理音乐播放功能------------------
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let index=options.index;
    //更新data中detailObj的状态值
    this.setData({
      detailObj: datas.list_data[index]
    });
    //根据本地缓存的额数据判断用户是否收藏过当前文章
    let detailStorage=wx.getStorageSync("isCollected");
    console.log(detailStorage);
    if (detailStorage[index]){//收藏过
    this.data({
      isCollected:true
    })
    }
  },
  //收藏和没有收藏按钮
  handleCollection(){
    console.log("是否收藏this-->"+this);
    let isCollected = !this.data.isCollected;
    let whetherTitle = isCollected==false?"取消收藏成功":"收藏成功";
    //弹出提示框
    wx.showToast({
      title: whetherTitle,
      icon:"success"
    })
    //更新收藏按钮的点击状态
    this.setData({
      isCollected
    })
    let {index}=this.data;
    wx.getStorage({
      key: 'isCollected',
      success: (datas)=> {
        let obj=datas.data;
        obj[index]=datas.data;
        obj[index]=isCollected;
        wx.setStorage({
          key: 'isCollected',
          data: obj,
          success:()=>{
            console.log("缓存成功")
          }
        })
      },
    })
  },
})