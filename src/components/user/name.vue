<template>
  <div class="user_warp">
    <van-form @submit="onSubmit">
      <van-field
        v-model="form.userCode"
        name="账号"
        label="账号:"
        placeholder="请输入登录账号"
        :rules="[{ required: true, message: '请输入登录账号' }]"
      />
      <div style="margin: 16px;">
        <van-button class="submit_button" block type="info" native-type="submit">确认修改</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { $userInfo, $updateUserInfo } from '@/service/user'

export default {
  data() {
    return {
      userInfo: {},
      form: {
        userCode: ''
      }
    }
  },
  created () {
    this.getOldUserInfo()
  },
  methods: {
    getOldUserInfo() {
      const param = { userId: this.$route.query.id }

      $userInfo(param).then(response => {
        this.userInfo = response
        this.form.userCode = response.user.userCode
      })
    },
    onSubmit() {
      if (this.userInfo.user.userCode !== this.form.userCode) {
        const params = {
          userId: this.form.userId,
          userCode: this.userCode
        }

        $updateUserInfo(params).then((res) => {
          this.$toast('修改成功！')
          setTimeout(() => {
            this.$router.go(-1)
          }, 500)
        })
      } else {
        this.$router.go(-1)
      }
    }
  }
}

</script>

<style lang="scss">
  .user_warp {
    padding: 20px 10px;
    .submit_button {
      margin-top: 50px;
      background: #0077ff;
    }
  }

</style>
