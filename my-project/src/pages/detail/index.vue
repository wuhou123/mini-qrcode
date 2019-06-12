<template>
    <view class="qrcode-box">
  <view class="qrcode-container">
    <view class="qrcode-top">
      <text>收款码</text>
    </view>
    <canvas @click="previewImg" canvas-id="mycanvas" class="qrcode"/>
    <!-- <canvas canvas-id='mylogo' v-if="logo" class='qrlogo'></canvas> -->
    <view class="qrcode-bottom">
      <view>支持微信、支付宝、云闪付</view>
      <view>点击保存相册</view>
    </view>
  </view> 
</view>
</template>

<script>
var QR = require('../../../utils/qrcode.js')
export default {
  data () {
    return {
      content: '',
      logo: '',
      alipay: '',
      wechat: '',
      yunfu: ''
    }
  },
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true
    })
    // FKX05639AEMUOSN0TE016F
    // f2f0JV5T664Amfb_JDHLXtMBTrL2_8PvU68O
    console.log(options)
    this.alipay = options['alipay'] || ''
    this.wechat = options['wechat'] || ''
    this.logo = options['logo'] || ''
    this.yunfu = options['yunfu'] || ''
    this.msg = options['msg'] || ''
    this.content = `https://www.wuhou123.cn/pay.html?ali=${this.alipay}&wx=${this.wechat}&yunfu=${this.yunfu}&msg=${this.msg}`

    // 绘图
    let bg = '../../static/images/bg.jpg'
    let weixin = '../../static/images/weixin.png'
    let alipay = '../../static/images/alipay.png'
    let yunfu = '../../static/images/yunfu.png'
    let str = `『 ${this.msg ? this.msg : '扫码支付'} 』`
    let size = this.setCanvasSize(300)
    const ctx = wx.createCanvasContext('mycanvas')
    ctx.drawImage(bg, 0, 0, this.setCanvasSize(300).w, this.setCanvasSize(400).h)
    QR.qrApi.draw(this.content, ctx, size.w, size.w)
    ctx.save()
    if (this.logo) {
      ctx.clearRect(this.setCanvasSize(129).w, this.setCanvasSize(129).h, 42, 42)
      ctx.drawImage(this.logo, this.setCanvasSize(130).w, this.setCanvasSize(130).h, 40, 40)
    }
    ctx.drawImage(weixin, this.setCanvasSize(60).w, this.setCanvasSize(320).h, 40, 40)
    ctx.drawImage(yunfu, this.setCanvasSize(120).w, this.setCanvasSize(315).h, 60, 45)
    ctx.drawImage(alipay, this.setCanvasSize(200).w, this.setCanvasSize(320).h, 40, 40)
    ctx.setFontSize(18)
    ctx.setFillStyle('#ffffff')
    ctx.fillText(str, (this.setCanvasSize(300).w - ctx.measureText(str).width) / 2, this.setCanvasSize(300).h)
    ctx.save()
    let strTwo = '由“万能收钱码”小程序提供'
    ctx.setFontSize(12)
    ctx.setFillStyle('#F0E68C')
    ctx.fillText(strTwo, (this.setCanvasSize(300).w - ctx.measureText(strTwo).width) / 2, this.setCanvasSize(388).h)
    ctx.draw()
  },
  methods: {
    setCanvasSize (xpe) {
      var size = {}
      try {
        var res = wx.getSystemInfoSync()
        var scale = 750 / xpe// 不同屏幕下canvas的适配比例；设计稿是750宽
        var width = res.windowWidth / scale
        var height = width// canvas画布为正方形
        size.w = width * 2
        size.h = height * 2
      } catch (e) {
      // Do something when catch error
        console.log('获取设备信息失败' + e)
      }
      return size
    },
    previewImg () {
      wx.showActionSheet({
        itemList: ['保存收款码'],
        success: function (res) {
          console.log(res.tapIndex)
          if (res.tapIndex === 0) {
            console.log('保存收款码')
            wx.canvasToTempFilePath({
              canvasId: 'mycanvas',
              success: function (res) {
                console.log(res)
                wx.saveImageToPhotosAlbum({
                  filePath: res.tempFilePath,
                  success: function success (res) {
                    console.log('saved::' + res.savedFilePath)
                    wx.showToast({
                      title: '保存成功'
                    })
                  }
                })
              },
              fail: function (res) {
                wx.showToast({
                  title: '保存失败',
                  icon: 'none'
                })
              }
            })
          }
        },
        fail: function (res) {
          console.log(res.errMsg)
        }
      })
    }
  }

}
</script>

<style scoped>
/* qrcode.wxss */

.qrcode-box {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 30rpx;
  background-color: #F9F9F9;
}

page{
  height: 100%;
}

.qrcode-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -70px;
  background-color: #e5e5e5;
  border-radius: 20rpx;
}

.qrcode {
  width: 300px;
  height: 400px;
  background-color: white;
  position: relative;
}

.qrlogo {
  width: 30px;
  height: 30px;
  position: absolute;
  margin-top: 185px;
  background-color: white;
}

.qrcode-top {
  min-height: 50px;
  /*font-size: xx-large;*/
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /*color: #ff7069;*/
  color: #217834;
}

.qrcode-bottom {
  min-height: 50px;
  width: 100%;
  font-size: small;
  display: flex;
  justify-content: center;
  align-content: center;
  color: gray;
  flex-direction: column;
  text-align: center;
}
</style>
