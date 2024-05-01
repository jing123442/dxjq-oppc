<template>
  <el-form-item :prop="data.code" class="input-message-code">
    <span>验证码将发送至 <span>{{row[data.mobile] | formatCardNumber}}</span></span>
    <el-input v-model="row[data.code]">
      <template slot="append"><div class="getcode-btn" @click="getCodeEvent()">{{data.btnText}}</div></template>
    </el-input>
  </el-form-item>
</template>
<script>
import { $verifySendMessage } from '@/service/message'

export default {
  name: 'InputVerifyCode',
  props: {
    row: {
      type: Object,
      required: true
    },
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
    getCodeEvent() {
      if (!this.timer) {
        const params = {
          mobile: this.row[this.data.mobile],
          type: this.data.type
        }
        $verifySendMessage(params).then(res => {
          this.$message.success('短信发送成功！')
        })
        let time = 60
        this.data.btnText = time + 's'
        this.timer = setInterval(() => {
          time--
          this.data.btnText = time + 's'
          this.data.disabled = true
          if (time < 0) {
            clearInterval(this.timer)
            this.timer = null
            this.data.btnText = this.data.defaultText
            this.data.disabled = false
          }
        }, 1000)
      }
    }
  }
}
</script>
<style lang="scss">
  .input-message-code {
    margin-bottom: 40px;
    padding: 10px 30px;
    .el-input-group__append {
      width: 100px;
      text-align: center;
      cursor: pointer;
    }
  }
</style>
