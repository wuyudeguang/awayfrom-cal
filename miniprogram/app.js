App({
    
  onLaunch: function () {
    wx.setStorageSync('cala', 0)
    wx.setStorageSync('kill', 0)
      wx.cloud.init({
        env:'cloud1-6gbn28va68b06327',
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      });

    
      
    
      this.globalData = {
    };
 
  },
 
});
