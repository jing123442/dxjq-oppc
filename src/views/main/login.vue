<template>
  <div class="login-main">
    <div class="full-screen juedui">
      <img class="full-screen" src="@/assets/main/login_bg@3x.png" />
    </div>
    <div class="login-content full-screen juedui">
      <div class="login-data">
        <div class="welcome">欢迎来到大象加气</div>
        <div class="input-warp">
          <img class="input-left" src="@/assets/main/icon_phone_blue@3x.png" alt />
          <van-field class="input-right" v-model="username" clearable placeholder="请输入用户名" />
        </div>
        <div class="input-warp">
          <img class="input-left" src="@/assets/main/icon_password_blue@3x.png" alt />
          <van-field class="input-right" v-model="password" type="password" placeholder="请输入密码" />
        </div>
        <van-button class="login-button" type="info" @click="login">登录</van-button>
        <van-checkbox class="accet-button" shape="round" v-model="checked" checked-color="#0077ff">
          <span>我同意</span>
          <span @click.stop="openServeFile()" class="serve-file">《大象加气服务条款、隐私协议》</span>
        </van-checkbox>
      </div>
    </div>
  </div>
</template>

<script>
import mainMixin from '@/utils/mixins/main'
export default {
  data() {
    return {
      username: '',
      password: '',
      backgroundImg: {
        backgroundImage:
          'url(' + require('@/assets/main/login_bg@3x.png') + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%'
      },
      checked: true
    }
  },
  mixins: [mainMixin],
  created() {},
  methods: {
    openServeFile() {
      this.$router.push({
        path: '/agreement'
      })
    },
    async login() {
      if (this.checked == false) {
        this.$toast('请点击同意服务协议后登录！')
        return
      }
      const data = {
        username: this.username,
        password: this.password,
        grant_type: 'password',
        auth_type: 'password'
      }
      this.$toast({
        message: '加载中...',
        forbidClick: true
      })
      this.$store.dispatch('login', data).then(response => {
        this.$toast.clear()

        if (response.data.code === 0) {
          this.openPage()
        } else {
          this.$toast(response.data.message)
        }
      }).catch(err => {
        this.$toast.clear()
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-main {
  background: #f1f2f4;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .login-content {
    display: flex;
    justify-content: center;
    align-items: center;
    // margin-top: 150px;
    height: 100%;

    .login-data {
      width: 80%;
      margin-top: 330px;

      .welcome {
        width: 100%;
        font-size: 17px;
        text-align: left;
        font-weight: 800;
        margin-bottom: 10px;
      }

      .login-button {
        margin-top: 30px;
        width: 100%;
        height: 40px;
        border-radius: 4px;
        background: #0077ff;
        font-size: 17px;

        span {
          font-size: 18px;
        }
      }

      .accet-button {
        font-size: 15px;
        margin-top: 30px;
      }

      .input-warp {
        margin-top: 10px;
        display: flex;
        background: white;
        align-items: center;
        border: 1px solid #edf2fa;
        border-radius: 5px;

        .input-left {
          margin-left: 20px;
          width: 16px;
        }

        .input-right {
          line-height: 25px;
        }
      }
    }
  }

  .serve-file {
    font-size: 14px;
    color: #0077ff;
  }

  .full-screen {
    height: 100%;
    width: 100%;
  }

  .xiangdui {
    position: relative;
  }

  .juedui {
    position: absolute;
  }
}
</style>
