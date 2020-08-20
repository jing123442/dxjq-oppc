<template>
  <div class="mine-page-warp">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="个人信息">
      </el-form-item>
      <el-form-item label="姓名：">
        <el-col :span="15">
          <el-input disabled v-model="form.userName"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="账户：">
        <el-col :span="15">
          <el-input v-model="userCode" autocomplete="new-password" :placeholder="form.userCode"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="电话：">
        <el-col :span="15">
          <el-input v-model="mobile" :placeholder="form.mobile"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="24">
          <el-button type="primary" @click="sureInfo()">确认修改</el-button>
          <el-button type="primary" @click="$router.go(-1)">取消</el-button>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
}

</script>

<style lang="scss">
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
