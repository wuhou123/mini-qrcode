<template>
<view class="container">
  <view class='pay-channel'>
    <view class='alipay-default btn' bindtap='bindAlipay' v-if="alipayRight == '0'">+</view>
    <view  class='alipay-right btn' bindtap='bindAlipay' v-else-if="alipayRight == '1'"></view>
    <view  class='alipay-wrong btn' bindtap='bindAlipay' v-else-if="alipayRight == '2'"></view>

    <view class='wechat-default btn' bindtap='bindWechat' v-if="wechatRight == '0'">+</view>
    <view class='wechat-right btn' bindtap='bindWechat' v-if="wechatRight == '1'"></view>
    <view class='wechat-wrong btn' bindtap='bindWechat' v-if="wechatRight == '2'"></view>
  </view>
  <!-- 类型  -->
  <view class='pay-container'>
    <view class='pay-title'>支付宝</view>
    <view class='pay-title'>微信</view>
  </view>
  <!-- logo -->
  <view class='logo-default' bindtap='bindLogo' v-if="logoRight == '0'">logo</view>
    <view class='logo-right' bindtap='bindLogo' v-if="logoRight == '1'">logo</view>
  <!-- 合并 -->
  <view>
    <view class='submit-button btn' bindtap='bindSubmit'>立即合并</view>
    <view class='footer'>
      <view class='about' bindtap='bindGuide'>使用手册</view>
      <view class='about' bindtap='bindAbout'>产品介绍</view> 
    </view>
    
  </view>
</view>
</template>

<script>

export default {
  data () {
    return {
      alipay: '',
      wechat: '',
      logo: '',
      // 0：默认， 1：正确， 2：错误
      alipayRight: '0',
      wechatRight: '0',
      logoRight: '0'
    }
  },
  methods: {
    bindViewTap () {
      const url = '../logs/main'
      if (mpvuePlatform === 'wx') {
        mpvue.switchTab({ url })
      } else {
        mpvue.navigateTo({ url })
      }
    },
    clickHandle (ev) {
      console.log('clickHandle:', ev)
      // throw {message: 'custom test'}
    }
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style scoped>
.paytype-button {
  background-color: #F9F9F9;
}

.pay-channel {
  display: flex;
  justify-content: space-between;
}

.btn {
  width: 100px;
  height: 100px;
  border-radius: 50px;
  border-color: red;
  border-width: 1px;
  margin-right: 25px;
  margin-left: 25px;
}

.alipay-default {
  background-color: #F9F9F9;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: green;
  font-size: xx-large;
}
.alipay-right {
  background-color: #118CE2;
  margin-bottom: 20px;
  color: white;
}

.alipay-wrong {
  background-color: #EE6363;
  margin-bottom: 20px;
  color: white;
}

.wechat-default {
  background-color: #F9F9F9;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: green;
  font-size: xx-large;
}
.wechat-right {
  background-color: #229F2B;
  margin-bottom: 20px;
  color: white;
}

.wechat-wrong {
  background-color: #EE6363;
  margin-bottom: 20px;
  color: white;
}

.logo-default {
  background-color: #F9F9F9;
  width: 100px;
  padding-top: 8px;
  padding-bottom: 8px;
  text-align: center;
  border-radius: 18px;
  color: green;
}

.logo-right {
  background-color: #9ACD32;
  width: 100px;
  padding-top: 8px;
  padding-bottom: 8px;
  text-align: center;
  border-radius: 18px;
  color: white;
}

.submit-button {
  margin-top: 30px;
  width: 160px;
   height: 80px; 
  background-color: #F9F9F9;
  display: flex;
  justify-content: center;
  align-items: center;
  color: green;
}

.pay-container {
  display: flex;
  margin-bottom: 20px;
}

.pay-title {
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer {
  position: fixed; 
  bottom: 20rpx;   
  right: 20rpx;
  left: 20px;     
  height: 40rpx;  
  text-align: center; 
  display: flex;
  justify-content: center;
}
.about {  
  color: green;  
  bottom: 20rpx;   
  right: 20rpx;
  left: 20px;     
  height: 40rpx;  
  text-align: center;
  font-size: x-small;
  padding: 5px;
}
</style>
