// miniprogram/pages/detail/detail.js
let datas=require("../../datas/list-data.js");
let appDatas=getApp();//获取全局的app
console.log("appDatas-->"+appDatas);
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
    let index=options.index;
    //更新data中detailObj的状态值
    this.setData({
      detailObj: datas.list_data[index]
    });
    if(!detailStorage){
      //从缓存中初始化对象
      wx.setStorageSync("isCollected", {});
    }
    //根据本地缓存的额数据判断用户是否收藏过当前文章
    let detailStorage=wx.getStorageSync("isCollected");
    console.log(detailStorage);
    if (detailStorage[index]){//收藏过
      this.data({
        isCollected:true
      })
    };
    //-----------------------onload里面的播放功能--------------------------
    //监听音乐播放
    wx.onBackgroundAudioPlay(()=>{
        this.setData({
          isMusicPlay:true
        });
        //修改全局配置的播放为true
        appDatas.data.isPlay=true;
        appDatas.data.pageIndex=index;
    });
    //判断音乐是否在播放（全局的播放为true,并且当前的index相同）
    if(appDatas.data.isPlay && appDatas.data.pageIndex==index){
        this.setData({
          //说明是当前的
          isMusicPlay:true
        })
    }
    //监听音乐暂停
    wx.onBackgroundAudioPause(()=>{
      this.setData({
        isMusicPlay: false
      });
      appDatas.data.isPlay = false;
      //比方后才点击暂停，所以此处的赋值下标其实可以省略
      //appDatas.data.pageIndex = index;
    });    
    //-----------------------onload里面的播放功能--------------------------

  },
  //收藏和没有收藏按钮
  handleCollection(){
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
  //点击分享处理
  handleShare(){
    wx.showActionSheet({
      itemList: ["分享到朋友圈","分享到qq空间","分享到微博"],
    })
  }
})