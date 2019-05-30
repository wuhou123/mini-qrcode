<template>
    <view class="qrcode-box">
  <view class="qrcode-container">
    <view class="qrcode-top">
      <text>收款码</text>
    </view>
    <canvas bindtap="previewImg" canvas-id="mycanvas" class="qrcode"/>
    <canvas canvas-id='mylogo' v-if="logo" class='qrlogo'></canvas>
    <view class="qrcode-bottom">
      <view>支持微信、支付宝</view>
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
      wechat: ''
    }
  },
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true
    })
    // FKX05639AEMUOSN0TE016F
    // f2f0JV5T664Amfb_JDHLXtMBTrL2_8PvU68O
    console.log(options)
    this.content = 'https://www.wuhou123.cn/pay.html?ali=' + options['alipay'] + '&wx=' + options['wechat']
    this.alipay = options['alipay']
    this.wechat = options['wechat']
    this.logo = options['logo']
    console.log('-----------')
    console.log(this['content'])
    console.log(this['logo'])
    console.log('-======---')

    // 绘图
    const ctx = wx.createCanvasContext('mycanvas')
    QR.qrApi.draw(this.content, ctx, 300, 300)
    if (options['logo'] !== '' & options['logo'] != null) {
      console.log('绘制logo')
      ctx.clearRect(129, 129, 42, 42)
      ctx.drawImage(options['logo'], 130, 130, 40, 40)
    }
    ctx.draw()
  }

}
</script>

<style scoped>
/* qrcode.wxss */

.qrcode-box {
  height: 100%;
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
  height: 300px;
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
