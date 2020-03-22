//index.js
const app = getApp()

Page({
  data: {
    userInfo:{},
    isShow:false
  },
  // 弹出窗
  viewBtn(){
    wx.showModal({
      title:"打开弹出框啦!",
      success: function (res) {
        console.log(res.tapIndex)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  //点击按钮跳转到指定页面
  handleClick(){
    wx.navigateTo({
      url: '/pages/list/list'
    })
  },
  // 生命周期函数，监听页面的加载
  onLoad: function() {
    console.log("onload....做页面的初始化工作")
    this.getUserInfo();
    
  },
  //获取用户信息后回调函数
  handleGetUserInfo(data){
    console.log("用户点击了");
    if(data.detail.rawData){
      //用户点击是否允许
      this.getUserInfo();
    }
  },
  //自定义的函数
  getUserInfo(){
    //判断用户是否授权了
    wx.getSetting({
      success: (data) => {
        if (data.authSetting["scope.userInfo"]) {
          //用户已经授权
          this.setData({
            isShow: false //未登录，按钮显示出来
          })
        }
        else {
          //用户未授权
          this.setData({
            isShow: true
          })
        }
      }
    });
    //加载用户信息
    wx.getUserInfo({
      success: (data) => {
        // 更新data中的userInfo信息
        this.setData({
          userInfo: data.userInfo
        })
      },
      fail: () => {
        console.log("获取用户信息失败");
      }
    })
  },
  //获取手机号函数
  getPhone(data){
    console.log("获取手机号"+data);

  },
  onReady:function(){
    
  },
  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },

})
