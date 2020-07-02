<template>
  <div class="user_warp">
    <van-form @submit="onSubmit">
      <van-field v-model="form.mobile" label="手机号:" clearable name="手机号" @input="btnEnableEvent('mobile', 'smsBtnDisStatus', 11)" placeholder="请输入您需要绑定的手机号"
                 :rules="[{ required: true, message: '请输入您需要绑定的手机号' }]" />
      <van-field v-model="form.code" center clearable label="短信验证码:" @input="btnEnableEvent('code', 'bindBtnDisStatus', 4)" placeholder="请输入短信验证码">
        <template #button>
          <van-button @click="sendMessage()"  :disabled="form.smsBtnDisStatus" class="send-message" size="small">{{form.smsBtnName}}</van-button>
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button :disabled="form.bindBtnDisStatus" class="submit_button" block type="info" native-type="submit">确认绑定</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { $updateMobile } from '@/service/user'
import { $verifyCode } from '@/service/message'

export default {
  data() {
    return {
      form: {
        mobile: '',
        code: '',
        smsBtnName: '获取验证码',
        smsBtnDisStatus: true,
        bindBtnDisStatus: true
      }
    }
  },
  created() {},
  methods: {
    timeoutStatus() {
      var time = 60
      this.$toast('验证码发送成功！')
      var interval = setInterval(() => {
        if (time >= 0) {
          this.form.smsBtnName = '获取验证码' + '(' + time + ')'
          this.form.smsBtnDisStatus = true
          time--
        } else {
          clearInterval(interval)
          this.form.smsBtnName = '获取验证码'
          this.form.smsBtnDisStatus = false
        }
      }, 1000)
    },
    sendMessage() {
      const params = {
        type: 4,
        mobile: this.form.mobile
      }
      $verifyCode(params).then((res) => {
        this.timeoutStatus()
      })
    },
    onSubmit() {
      var params = {
        userId: this.$route.query.id,
        newMobile: this.form.mobile,
        verifyCode: this.form.code
      }
      $updateMobile(params).then((res) => {
        setTimeout(() => {
          this.$router.go(-1)
        }, 500)
      })
    },
    btnEnableEvent(key, btnKey, number) {
      if (this.form[key].length >= number) {
        this.form[btnKey] = false
      } else {
        this.form[btnKey] = true
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

    .send-message {
      background: #0077ff;
      color: white;
      height: 40px;
      width: 120px;
    }
  }
</style>
