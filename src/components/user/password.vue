<template>
  <div class="user_warp">
    <van-form @submit="onSubmit">
      <van-field
        v-model="form.oldPassword"
        type="password"
        name="原密码"
        label="原密码:"
        placeholder="请输入原密码"
        :rules="[{ required: true, message: '请输入原密码' }]"
      />
      <van-field
        v-model="form.newPassword"
        type="password"
        name="新密码"
        label="新密码:"
        placeholder="请输入新密码"
        :rules="[{ required: true, message: '请输入新密码' }]"
      />
      <van-field
        v-model="reNewPassword"
        type="password"
        name="确认密码"
        label="确认密码:"
        placeholder="请再次输入新密码"
        :rules="[{ validator, message: '两次输入的密码不一致！' }]"
      />
      <div style="margin: 16px;">
        <van-button class="submit_button"  block type="info" native-type="submit">确认修改</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { $updatePassword } from '@/service/user'

export default {
  data() {
    return {
      form: {
        userId: this.$route.query.id,
        oldPassword: '',
        newPassword: ''
      },
      reNewPassword: ''
    }
  },
  created () {},
  methods: {
    validator(val) {
      return val === this.form.newPassword
    },
    onSubmit() {
      $updatePassword(this.form).then(response => {
        this.$toast('修改成功！')
        setTimeout(() => {
          this.$router.go(-1)
        }, 500)
      })
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
