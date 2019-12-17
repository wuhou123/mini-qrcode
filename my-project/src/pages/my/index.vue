<template>
<div class="user-center">
    <div class='user-info bg-white gap'>
      <div class='user-info-avatar'>
        <open-data type='userAvatarUrl' />
      </div>
      <div class='user-info-detail'>
        <open-data type='userNickName'
                   lang="zh_CN"
                   class="setName" />
      </div>
    </div>
    <div class="cu-list menu margin1">
      <div class="cu-item arrow"
           @click="goMaList">
        <div class="content">
          <text class="icon-circlefill text-grey"></text>
          <text class="text-grey">我的收钱码</text>
        </div>
      </div>
      <div class="cu-item arrow">
        <button class="cu-btn content"
                open-type="feedback">
          <text class="icon-btn text-olive"></text>
          <text class="text-grey">意见反馈</text>
        </button>
      </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'my',
  data () {
    return {}
  },
  methods: {
    goMaList () {
      wx.navigateTo({
        url: '/pages/qrcode/main'
      })
    }
  }
}
</script>

<style lang="less">
.user-center {
  overflow-x: hidden;
  &-top {
    .user-settings {
      padding: 16px 24px;
      .user-icon-right {
        float: right;
        margin-right: 20rpx;
      }
      .settings {
        margin-right: 40px;
      }
      .clearfix:after {
        content: "";
        display: block;
        clear: both;
      }
    }
  }
  .user-info {
    display: flex;
    height: 210rpx;
    padding: 10px 0 0 40px;
    &-avatar {
      overflow: hidden;
      display: block;
      width: 160rpx;
      height: 160rpx;
      border-radius: 50%;
      border: 2px solid #fff;
      box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
    }
    &-detail {
      display: flex;
      align-items: center;
      margin-left: 10rpx;
      height: 160rpx;
    }
  }
  .gap {
    margin-bottom: 5px;
  }
  // .bottom-tab {
  //     margin-bottom: 150px;
  // }
  .at-list__item .item-extra__info {
    max-width: 200px;
  }
}
.setName {
  font-size: 32rpx;
}
.user-info-avatar image {
  border-radius: 50%;
}
</style>
