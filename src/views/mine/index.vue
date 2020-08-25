<template>
  <div class='mine-page-warp'>
    <el-form ref='form' :model='form' :rules='rules' label-width='80px'>
      <el-form-item label='个人信息'>
      </el-form-item>
      <el-form-item label='姓名：'>
        <el-col :span='15'>
          <el-input disabled v-model='form.userName'></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label='账户：'>
        <el-col :span='15'>
          <el-input v-model='userCode' autocomplete='new-password' :placeholder='form.userCode'></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label='电话：'>
        <el-col :span='15'>
          <el-input v-model='mobile' :placeholder='form.mobile'></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span='24'>
          <el-button type='primary' @click='sureInfo()'>确认修改</el-button>
          <el-button type='primary' @click='$router.go(-1)'>取消</el-button>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  $userFind,
  $editPassword,
  $userEdit
} from '@/service/user'
export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('手机号不能为空'))
        return
      }
      const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
      reg.test(value) ? callback() : callback(new Error('请输入正确的手机号'))
    }
    return {
      form: {},
      password_form: {
        userId: JSON.parse(localStorage.getItem('wopuser')).user_id,
        oldPassword: '',
        newPassword: ''
      },
      userCode: '',
      mobile: '',
      rules: {
        mobile: [{
          validator: checkPhone,
          trigger: 'blur',
          required: false
        }]
      }
    }
  },
  created() {
    var params = {
      userId: JSON.parse(localStorage.getItem('wopuser')).user_id
    }
    var self = this
    $userFind(params).then((res) => {
      self.form = res.data.user
      // if (res.code == 0) {
      //   self.$message({
      //     message: res.message,
      //     type: 'success'
      //   });
      // } else {
      //   self.$message.error(res.message);
      // }
    })
  },
  methods: {
    sureEditPassword() {
      var self = this
      $editPassword(this.password_form).then((res) => {
        if (res.code == 0) {
          self.$message({
            message: res.message,
            type: 'success'
          })
        } else {
          self.$message.error(res.message)
        }
      })
    },
    changeMobile() {
      if (this.mobile == '' || this.mobile == this.form.mobile) {
        return
      }
      var params = {
        userId: this.form.userId,
        mobile: this.mobile
      }
      this.sureEditInfo(params)
    },
    changeUserCode() {
      if (this.userCode == '' || this.userCode == this.form.userCode) {
        return
      }
      var params = {
        userId: this.form.userId,
        userCode: this.userCode
      }
      this.sureEditInfo(params)
    },
    sureInfo() {
      // this.changeMobile();
      // this.changeUserCode();

      var params = {
        userId: this.form.userId,
        userCode: this.userCode,
        mobile: this.mobile

      }
      if (this.userCode == '' || this.userCode == this.form.userCode) {
        delete params.userCode
      }

      if (this.mobile == '' || this.mobile == this.form.mobile) {
        delete params.mobile
      }

      this.sureEditInfo(params)
    },
    sureEditInfo(val) {
      var self = this
      $userEdit(val).then((res) => {
        if (res.code == 0) {
          self.$message({
            message: res.message,
            type: 'success'
          })
        } else {
          self.$message.error(res.message)
        }
      })
      // this.$refs['form'].validate((valid) => {
      //   if (valid) {
      //     var self = this;
      //     $userEdit(val).then((res) => {
      //       if (res.code == 0) {
      //         self.$message({
      //           message: res.message,
      //           type: 'success'
      //         });
      //       } else {
      //         self.$message.error(res.message);
      //       }
      //     })
      //   }
      // })
    }
  }
}

</script>

<style lang='scss'>
  .mine-page-warp {
    margin: 30px 0 0 10px;

    .form-session-title {
      margin-left: 20px;
      margin-top: 10px;
      width: 100%;
      text-align: left;
      font-size: 18px;
      height: 30px;
    }

    .el-form-item__content {
      text-align: left
    }
  }

</style>
