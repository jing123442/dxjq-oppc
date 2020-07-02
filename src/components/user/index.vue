<template>
  <div class="user-main">
    <!-- 个人信息 -->
    <div class="user-info">
      <div class="info-row-header user-bg">
        <img class="user-head" src="@/assets/component/userinfo/user-head@3x.png" alt="">
        <span class="user-name">{{userInfo.userName || '未知'}}</span>
      </div>

      <van-cell-group class="info-row-cell">
        <van-cell v-for="(item, index) of itemInfo" :key="index" class="info-row-cell-item" :title="item.title" :value="item.key ? userInfo[item.key] : ''" is-link
                  :to="{name: item.link, query: {id: user[item.id]}}">
          <img class="left-icon" slot="icon" :src="item.image" />
        </van-cell>
      </van-cell-group>
    </div>
    <van-button class="logout-button" type="info" @click="logout()">退出登录</van-button>
  </div>
</template>

<script>
import { $userInfo } from '@/service/user'
import { mapGetters } from 'vuex'

export default {
  name: 'userInfo',
  data() {
    return {
      userInfo: {},
      itemInfo: [{
        title: '手机号',
        key: 'mobile',
        id: 'user_id',
        link: 'userMobile',
        image: require('@/assets/component/userinfo/phone@3x.png')
      }, {
        title: '登录账户',
        key: 'userCode',
        id: 'user_id',
        link: 'userName',
        image: require('@/assets/component/userinfo/IDcard@3x.png')
      }, {
        title: '修改密码',
        key: '',
        id: 'user_id',
        link: 'userPassword',
        image: require('@/assets/component/userinfo/phone@3x.png')
      }]
    }
  },
  computed: {
    ...mapGetters({
      user: 'mwxuser'
    })
  },
  created() {
    this.initUserInfo()
  },
  methods: {
    logout() {
      this.$store.dispatch('logout').then(() => {
        location.reload()
      })
    },
    initUserInfo() {
      const data = { userId: this.user.user_id }

      $userInfo(data).then(response => {
        this.userInfo = response.user
      })
    }
  }
}
</script>

<style lang="scss">
  .user-main {
    .user-info {
      padding: 20px 4%;
      .info-row-header {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &.user-bg {
          width: 100%;
          height: 155px;
          background-image: url(../../assets/component/userinfo/user-bg@3x.png);
          background-repeat: no-repeat;
          background-position: left top;
          background-size: 100% 155px;

          .info-row-header-image {
            text-align: right;
            margin-left: 30px;
          }
        }

        .user-head {
          width: 100px;
        }
      }
      .user-name {
        color: white;
        font-size: 18px;
      }

      .info-row-cell {
        text-align: left;
        padding: 20px 0;
        margin: 0 -8px 0 -4px;

        .info-row-cell-item {
          display: flex;
          align-items: center;
          height: 50px;
          span {
            font-size: 16px;
            color: #333333;
          }
        }

        .left-icon {
          width: 18px;
          height: 18px;
          margin-right: 10px;
        }
      }
    }

    .logout-button {
      margin-top: 40px;
      width: 80%;
      background: #0077ff;
    }
  }
</style>
