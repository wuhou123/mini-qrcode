<template>
  <view>
    <view class="cu-bar bg-white solid-bottom margin-top">
      <view class="action">
        <text class="icon-title text-orange"></text> 4步完成
      </view>
    </view>
    <view class="bg-white padding text-center">
      <view class="cu-steps">
        <view class="cu-item"
              :class="index>num?'':'text-orange'"
              v-for="(item,index) in numList"
              :key="index">
          <text class="num"
          :class="item.status?'':'err'"
                :data-index="index + 1"></text> {{item.name}}
        </view>
      </view>
      <view class="action margin-top">
        <button class="cu-btn bg-green shadow"
                @tap="NumSteps">
                <text class="icon-loading2 iconfont-spin" v-if="isRepeat"></text>
                {{tips[num]}}</button>
        <button class="cu-btn bg-grey shadow margin-left" @tap="nextSteps(num)" v-if="num===2">跳过</button>
        <button class="cu-btn bg-green shadow margin-left" @tap="nextSteps(num)" v-if="num===4">再次合并</button>
      </view>
    </view>
    <!-- 合并 -->
    <view>
      <view class='footer'>
        <view class='about'
              @tap='goDetail()'>使用手册</view>
        <view class='about'
              @tap='goExplain()'>项目说明</view>
      </view>
    </view>
    <!-- 窗口 -->
		<view class="cu-modal" :class="modalStatus?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">项目说明</view>
					<view class="action" @click="modalStatus=false">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl align-left">
          <view>1.本项目只提供类型收钱码合并服务，扫码支付不会经过第三方，不会存储用户信息；</view>
					<view>2.合并次数无限制，可以多次合并；</view>
          <view>3.常见问题联系weixin:zx133455667</view>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub text-green" @click="modalStatus=false">我知道了</view>
				</view>
			</view>
		</view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      isRepeat: false,
      alipay: '',
      wechat: '',
      yunfu: '',
      logo: '',
      numList: [
        {
          name: '开始',
          status: true
        },
        {
          name: '支付宝码',
          status: true
        },
        {
          name: '微信码',
          status: true
        },
        {
          name: '云闪付码(可跳过)',
          status: true
        },
        {
          name: '合并',
          status: true
        }
      ],
      num: 0,
      imgList: [],
      tips: ['上传支付宝码', '上传微信码', '上传云闪付码', '立即合并', '重置'],
      switchD: true,
      concatUrl: '',
      code: '',
      openId: '',
      modalStatus: false
    }
  },
  methods: {
    login () {
      let that = this
      wx.login({
        success: function (res) {
          that.code = res.code
          that.getOpenId()
        }
      })
    },
    getOpenId () {
      let that = this
      wx.cloud
        .callFunction({
          name: 'index',
          data: {
            type: 'getOpenId',
            js_code: that.code,
            grant_type: 'authorization_code'
          }
        })
        .then(res => {
          this.openId = res.result.home.openid
          wx.setStorage({
            key: 'openid',
            data: this.openId
          })
          console.log('id', this.openId)
        })
        .catch(error => {
          console.log(error)
        })
    },
    goDetail () {
      wx.navigateTo({
        url: '../guide/main'
      })
    },
    goExplain () {
      this.modalStatus = true
    },
    SwitchD () {
      this.switchD = !this.switchD
    },
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
    },
    nextSteps (num) {
      let that = this
      if (num === 2) {
        this.num++
        // wx.showModal({
        //   title: '提示',
        //   content: '确定要跳吗？',
        //   cancelText: '取消',
        //   confirmText: '确定',
        //   success: res => {
        //     this.num++
        //   }
        // })
      } else {
        that.concatUrl =
          '../detail/main?alipay=' +
          that.alipay +
          '&wechat=' +
          that.wechat +
          '&logo=' +
          that.logo +
          '&yunfu=' +
          that.yunfu +
          '&openId=' +
          that.openId
        wx.navigateTo({
          url: that.concatUrl
        })
      }
    },
    NumSteps () {
      console.log(this.tips[this.num])
      let that = this
      switch (this.num) {
        case 0:
          this.isRepeat = true
          wx.scanCode({
            success: function (e) {
              that.isRepeat = false
              console.log(e.result)
              if (
                e.result.indexOf('https://qr.alipay.com/') >= 0 ||
                e.result.indexOf('HTTPS://QR.ALIPAY.COM/') >= 0
              ) {
                console.log(e.result.slice(22))
                that.alipay = e.result
                that.num =
                  that.num === that.numList.length - 1 ? 0 : that.num + 1
              } else {
                wx.showToast({
                  title: '支付宝收款码错误',
                  icon: 'none'
                })
              }
            },
            fail: function (e) {
              that.isRepeat = false
            }
          })
          break
        case 1:
          wx.scanCode({
            success: function (e) {
              that.isRepeat = false
              console.log(e.result)
              if (e.result.indexOf('wxp://') >= 0) {
                that.wechat = e.result
                that.num =
                  that.num === that.numList.length - 1 ? 0 : that.num + 1
              } else {
                wx.showToast({
                  title: '微信收款码错误',
                  icon: 'none'
                })
              }
            },
            fail: function (e) {
              that.isRepeat = false
            }
          })
          break
        case 2:
          wx.scanCode({
            success: function (e) {
              that.isRepeat = false
              if (e.result.indexOf('https://qr.95516.com') >= 0) {
                that.yunfu = e.result
                that.num =
                  that.num === that.numList.length - 1 ? 0 : that.num + 1
              } else {
                wx.showToast({
                  title: '云闪付收款码错误',
                  icon: 'none'
                })
              }
            },
            fail: function (e) {
              that.isRepeat = false
            }
          })
          break
        case 3:
          that.num = that.num === that.numList.length - 1 ? 0 : that.num + 1
          that.concatUrl =
            '../detail/main?alipay=' +
            that.alipay +
            '&wechat=' +
            that.wechat +
            '&logo=' +
            that.logo +
            '&yunfu=' +
            that.yunfu +
            '&openId=' +
            that.openId
          wx.navigateTo({
            url: that.concatUrl
          })
          break
        case 4:
          that.num = that.num === that.numList.length - 1 ? 0 : that.num + 1
          break
      }
    },
    ChooseImage () {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], // 从相册选择
        success: res => {
          console.log(res)
          this.imgList = res.tempFilePaths
          this.logo = res.tempFilePaths[0]
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
        title: '提示',
        content: '确定要删除该logo吗？',
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
    this.login()
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
  height: 80rpx;
  line-height: 80rpx;
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
  font-size: 32rpx;
  padding: 5px;
}
.align-left {
  text-align: left;
}
</style>
