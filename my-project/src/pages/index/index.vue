<template>
  <view>
    <view class="cu-bar bg-white solid-bottom">
      <view class="action">
        <text class="icon-title text-orange"></text> 上传LOGO
      </view>
    </view>
    <view class="cu-form-group">
      <view class="grid col-4 grid-square flex-sub">
        <view class="padding-xs bg-img"
              :style="'background-image:url(' + imgList[index] +')'"
              v-for="(item,index) in imgList"
              :key="index"
              @tap="ViewImage"
              :data-url="imgList[index]">
          <view class="cu-tag bg-red"
                @tap.stop="DelImg"
                :data-index="index">
            <text class='icon-close'></text>
          </view>
        </view>
        <view class="padding-xs solids"
              @tap="ChooseImage"
              v-if="imgList.length<4">
          <text class='icon-cameraadd'></text>
        </view>
      </view>
    </view>
    <view class="cu-bar bg-white solid-bottom margin-top">
      <view class="action">
        <text class="icon-title text-orange"></text> 4步完成
      </view>
    </view>
    <view class="bg-white padding text-center">
      <view class="cu-steps">
        <view class="cu-item"
              :class="index>num?'':'text-blue'"
              v-for="(item,index) in numList"
              :key="index">
          <text class="num"
                :class="index==2?'err':''"
                :data-index="index + 1"></text> {{item.name}}
        </view>
      </view>
      <view class="action margin-top">
        <button class="cu-btn bg-green shadow"
                @tap="NumSteps">下一步</button>
      </view>
    </view>
    <!-- 合并 -->
    <view>
      <!-- <view class='submit-button btn'
            bindtap='bindSubmit'>立即合并</view> -->
      <view class='footer'>
        <view class='about'
              bindtap='bindGuide'>使用手册</view>
        <view class='about'
              bindtap='bindAbout'>产品介绍</view>
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
      logoRight: '0',
      numList: [{
        name: '开始'
      }, {
        name: '支付宝码'
      }, {
        name: '微信码'
      }, {
        name: '云闪付码(可跳过)'
      }, {
        name: '合并'
      }],
      num: 0,
      imgList: []
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
    },
    NumSteps () {
      this.num = this.num === this.numList.length - 1 ? 0 : this.num + 1
    },
    ChooseImage () {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], // 从相册选择
        success: (res) => {
          if (this.imgList.length !== 0) {
            this.imgList = this.imgList.concat(res.tempFilePaths)
          } else {
            this.imgList = res.tempFilePaths
          }
        }
      })
    },
    ViewImage (e) {
      wx.previewImage({
        urls: this.imgList,
        current: e.currentTarget.dataset.url
      })
    },
    DelImg (e) {
      wx.showModal({
        title: '召唤师',
        content: '确定要删除这段回忆吗？',
        cancelText: '再看看',
        confirmText: '再见',
        success: res => {
          if (res.confirm) {
            this.imgList.splice(e.currentTarget.dataset.index, 1)
          }
        }
      })
    }
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style scoped>
.paytype-button {
  background-color: #f9f9f9;
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
  background-color: #f9f9f9;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: green;
  font-size: xx-large;
}
.alipay-right {
  background-color: #118ce2;
  margin-bottom: 20px;
  color: white;
}

.alipay-wrong {
  background-color: #ee6363;
  margin-bottom: 20px;
  color: white;
}

.wechat-default {
  background-color: #f9f9f9;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: green;
  font-size: xx-large;
}
.wechat-right {
  background-color: #229f2b;
  margin-bottom: 20px;
  color: white;
}

.wechat-wrong {
  background-color: #ee6363;
  margin-bottom: 20px;
  color: white;
}

.logo-default {
  background-color: #f9f9f9;
  width: 100px;
  padding-top: 8px;
  padding-bottom: 8px;
  text-align: center;
  border-radius: 18px;
  color: green;
}

.logo-right {
  background-color: #9acd32;
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
  background-color: #f9f9f9;
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
