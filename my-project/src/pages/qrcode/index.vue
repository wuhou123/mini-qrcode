<template>
<view>
<view class="cu-bar bg-white solid-bottom margin-top">
    <view class="action">
    <text class="icon-title text-orange"></text> 所有二维码
    </view>
</view>
<view class="cu-list menu">
<view class="cu-item" v-for="(item,index) in list" :key="index">
<view class="content padding-tb-sm">
    <view class="cu-form-group" v-if="item.status">
      <input :placeholder="item.url.name||'点击编辑码名称'" name="input" v-model="inputVal" :auto-focus="true" maxlength="11"/>
      <button class='cu-btn bg-green shadow' @click="goEditor(item,index)">确定</button>
    </view>
    <view @click="openEditor(item)" v-else>
        <text class="icon-edit text-blue"></text>
        <text class="cuIcon-clothesfill text-blue margin-right-xs"></text>{{item.url.name||'点击编辑码名称'}}
    </view>
    <view class="text-gray text-sm">
        <text class="cuIcon-infofill margin-right-xs"></text>{{item.date}}</view>
</view>
<view class="action">
    <button class="cu-btn round bg-red shadow margin-right" @click="del(item._id)">
							<text class="cuIcon-upload"></text>删除</button>
    <button class="cu-btn round bg-orange shadow" @click="scan(item)">
							<text class="cuIcon-upload"></text>查看</button>                            
</view>
</view>
<view class="cu-item align-center" v-if="list&&list.length==0">暂无历史二维码</view>
</view>
</view>

</template>

<script>
export default {
  name: 'qrcode',
  data () {
    return {
      list: null,
      openid: '',
      inputVal: ''
    }
  },
  mounted () {
    this.openid = wx.getStorageSync('openid')
    this.getList()
  },
  methods: {
    getList () {
      let that = this
      console.log('res', this.openid)
      let db = wx.cloud.database()
      db
        .collection('list')
        .where({
          openid: that.openid
        })
        .get({
          success: function (res) {
            let data = res.data || []
            data.forEach(v => {
              v.status = false
              v.url.name = v.url.name || ''
            })
            that.list = data
          },
          fail: function (error) {
            console.log(error)
            that.list = []
          }
        })
    },
    del (_id) {
      wx.showModal({
        title: '提示',
        content: '确定要删除该合成码吗？',
        cancelText: '取消',
        confirmText: '确定',
        success: res => {
          if (res.confirm) {
            wx.cloud
              .callFunction({
                name: 'index',
                data: { type: 'del', id: _id }
              })
              .then(res => {
                wx.showToast({
                  icon: 'none',
                  title: '删除成功'
                })
                this.getList()
              })
              .catch(error => {
                console.log(error)
              })
          }
        }
      })
    },
    scan (item) {
      let concatUrl =
        '../detail/main?alipay=' +
        item.url.alipay +
        '&wechat=' +
        item.url.wechat +
        '&logo=' +
        item.url.logo +
        '&yunfu=' +
        item.url.yunfu +
        '&openId=' +
        item.url.openId
      wx.navigateTo({
        url: concatUrl
      })
    },
    openEditor (item) {
      item.status = true
    },
    goEditor (item, index) {
      item.status = !item.status
      if (!this.inputVal) return
      let params = Object.assign({}, item, {
        name: this.inputVal,
        id: this.list[index]._id
      })
      wx.cloud
        .callFunction({
          name: 'index',
          data: { type: 'renewName', list: params }
        })
        .then(res => {
          item.url.name = this.inputVal.slice()
          this.inputVal = ''
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.cu-list.menu > .cu-item.align-center {
  justify-content: center;
}
</style>

