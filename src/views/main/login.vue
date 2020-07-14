<template>
  <div class="login-container">
    <div class="login-main">
      <div class="login-left"></div>
      <el-form ref="loginForm" :model="form" :rules="rules" class="login-form" autocomplete="on" label-position="left">
        <div class="title-container">
          <h3 class="title">大象加气运营管理后台</h3>
        </div>
        <el-form-item prop="username">
          <el-input  ref="username" v-model="form.username" placeholder="请输入账户" name="username" tabindex="1" prefix-icon="el-icon-user" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" name="password" v-model="form.password" tabindex="2" show-password prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-button class="login-button" :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="login">登 录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '用户名不能为空，请输入', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空，请输入', trigger: 'blur' }]
      }
    }
  },
  created() {},
  methods: {
    login() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          const data = {
            username: this.form.username,
            password: this.form.password,
            grant_type: 'password',
            auth_type: 'password'
          }
          this.loading = true
          this.$store.dispatch('login', data).then(response => {
            this.loading = false

            if (response.data.code === 0) {
              this.$router.push({
                path: '/home'
              })
            } else {
              this.$message({
                message: response.data.message,
                type: 'error'
              })
            }
          }).catch(err => {
            this.loading = false
            console.log(err)
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */
  $bg:#fff;
  $light_gray:#283443;
  $cursor: #283443;
  $dark_gray: #0077ff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    background-position: top left;
    background-repeat: no-repeat;
    background-image: url(../../assets/images/main/main-bg.png);
    background-size: inherit;

    .login-main {
      position: absolute;
      width: 600px;
      height: 400px;
      top: 50%;
      left: 50%;
      display: flex;
      margin-top: -200px;
      margin-left: -300px;
      border-radius: 13px;
      box-shadow: 0rem 0rem 0.5rem 0rem hsla(210, 34%, 80%, .4);
      .login-left {
        width: 300px;
        height: 400px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: top left;
        background-image: url(../../assets/images/main/login.png);
      }

      .login-form {
        width: 300px;
        max-width: 100%;
        padding: 60px 35px;
        background: white;
        .title-container {
          position: relative;
          .title {
            font-size: 18px;
            color: $light_gray;
            margin: 0px auto 40px auto;
            text-align: left;
            font-weight: bold;
          }
        }
        .login-button {
          background: $dark_gray;
          margin-top: 20px;
        }
        .el-input input:-webkit-autofill {}
      }
    }
  }
</style>
