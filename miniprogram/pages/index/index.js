const { envList } = require('../../envList.js');
const db=wx.cloud.database()
var URL=''
var token=''
var resu=[]
 var bin=getApp().globalData.Opid
Page({
    onLoad: function(){  
        var that=this 
        wx.request({            //请求百度api接口
          url: 'https://aip.baidubce.com/oauth/2.0/token',
          data: {               //请求时传送我们的账号信息进行认证
            grant_type: 'client_credentials',
            client_id: 'L9wAgGPVefxOBeGPk3mIfAGF',//APIKey
            client_secret: 'SUtx5ZiHxQZk0g6GwAxBgG3QqTnqoZbB',//SecretKey
          },
          success(res) {
            console.log(res.data.access_token)
             token = res.data.access_token 
                wx.setStorageSync("res_imgurl", URL);//缓存照片
          }
        })
      },
    data:{
        Url:URL,
    },
    changeBigImg(){
        let that = this;
        console.log(this.data)
        wx.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          success(res) {
            console.log("成功",res);
            wx.cloud.uploadFile({
                cloudPath:new Date().getTime()+'.png', // 上传至云端的路径
                filePath: res.tempFilePaths[0], // 小程序临时文件路径
                success: res => {
                  //获取图片的http路径
                   // res.fileID 是上传图片的 fileID
                  console.log(res.fileID)
                  wx.cloud.getTempFileURL({
                    fileList: [res.fileID],
                    success: res => {
                      console.log("获取url地址：",res.fileList[0].tempFileURL)
                
                     URL=res.fileList[0].tempFileURL
                that.setData({
                    Url:URL,
                    dishName:'',
                calorie:'',
                probability:'',
                description: '',
                baike_url:''
                })
                    },
                    fail: console.error
                  })
                },
                fail: console.error
              })
          }
        })
      },
   api(){
    var that=this     
    wx.request({      
        url: 'https://aip.baidubce.com/rest/2.0/image-classify/v2/dish',
        header: {
          "Content-type": "application/x-www-form-urlencoded",//决定用哪种post请求，是固定的
        },
        method: 'post',   //请求固定为post请求
        data: {           //请求时需要上传的数据
          url: URL,	//图片编码数据
          access_token: token,//获取的token权限
          baike_num:5
        },
        success: function (res) {
            var list=wx.getStorageSync('cala')
            that.setData({
                dishName:res.data.result[0].name,
                calorie:res.data.result[0].calorie,
                probability: res.data.result[0].probability,
                description: (res.data.result[0].calorie*0.5*0.044).toFixed(2),
                baike_url: res.data.result[0].baike_info.baike_url,
                lisy:parseFloat(list)+parseFloat((res.data.result[0].calorie*0.5*0.044).toFixed(2))
            })
            wx.setStorageSync('cala', that.data.lisy)
            }
    })
   },
});
