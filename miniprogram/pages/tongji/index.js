var caloli=0
var Kilm=0
Page({
    onLoad: function(){ 
        caloli=wx.getStorageSync('cala')
        Kilm=wx.getStorageSync('kill')
    console.log(caloli)
    },
    data:{
        car:caloli,
        kilm:Kilm
    },
    onShow:function(){
        caloli=wx.getStorageSync('cala')
        Kilm=wx.getStorageSync('kill')
    this.setData({
        car:caloli,
        kilm:Kilm
    })
    },
   chongzhi(){
       wx.setStorageSync('cala', 0)
       wx.setStorageSync('kill', 0)
       caloli=wx.getStorageSync('cala')
       Kilm=wx.getStorageSync('kill')
   this.setData({
       car:caloli,
       kilm:Kilm
   })
   }
});