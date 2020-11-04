<template>
  <div class="template-main">
    <div>请先录入企业基本信息，再上传营业执照以及法人身份证照片</div>
    <ul>
      <li>
        <div class="li-headers">企业基本信息</div>
        <div class="li-form">
          <div>请填写企业基本信息，完成认证</div>
          <div @click="onListEvent('auth', authRow)" class="auth-status" :class="authColor" style="position: relative;margin-top: 0;cursor: pointer;">{{authRow.authStatus == 2 ? '已认证' : (authRow.authStatus == 1 ? '认证中' : (authRow.authStatus == 3 ? '认证失败' : '未认证'))}}</div>
        </div>
      </li>
      <li>
        <div class="li-headers">企业影印件上传</div>
        <div class="li-form">
          <div>企业营业执照</div>
          <div v-if="authRow.authStatus == 2" class="btn-update" @click="authLisenceUpload">去上传</div>
          <div v-else style="color: red;">未认证企业基本信息</div>
        </div>
        <div class="li-form">
          <div>法人身份证照片</div>
          <div v-if="authRow.authStatus == 2" class="btn-update" @click="authIdcardUpload">去上传</div>
          <div v-else style="color: red;">未认证企业基本信息</div>
        </div>
      </li>
    </ul>
    <el-dialog title="添加平台公司" :visible.sync="dialogAddGasStationVisible" :width="add_edit_dialog" :append-to-body="true">
      <div v-if="isAuthInfo" class="auth-status" :class="authColor"><span class="auth-status__dot" :class="authColor"></span>
        {{authRow.authStatus == 2 ? '已认证' : (authRow.authStatus == 1 ? '认证中' : (authRow.authStatus == 3 ? '认证失败' : '未认证'))}}
      </div>
      <el-tabs v-model="active" type="card" @tab-click="handleClick">
        <el-tab-pane label="一证" name="2" :disabled="tabDisabled">
          <nt-form ref="addGap" v-if="active == 2 && dialogAddGasStationVisible" :rowData="authRow" :modeList="mode_list_gasstation" :pageColumn="auth_page_column" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="onFormEvent"></nt-form>
        </el-tab-pane>
        <el-tab-pane label="三证" name="1" :disabled="tabDisabled">
          <nt-form ref="addGap" v-if="active == 1 && dialogAddGasStationVisible" :rowData="authRow" :modeList="mode_list_gasstation" :pageColumn="auth_page_column" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="onFormEvent"></nt-form>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>
<script>
import { callbackPagesInfo, axiosRequestParams, custFormBtnList } from '@/utils/tools'
import { $userOrgFind, $userOrgPicList } from '@/service/user'
import { $orgAuth, $uploadOrgPic } from '@/service/pay'
import { mapGetters } from 'vuex'

export default {
  name: 'accountList',
  data() {
    return {
      active: '2',
      tabDisabled: false,
      isAuthInfo: false,
      authColor: 'off',
      dialogAddGasStationVisible: false,
      authRow: {},
      auth_page_column: [],
      axios: axiosRequestParams(this),
      queryCustURL: {},
      fileList: [],
      fileZList: [],
      fileFList: [],
      formBtnList: custFormBtnList()
    }
  },
  computed: {
    ...mapGetters({
      mode_list: 'bus_org_mode_list',
      page_status: 'bus_org_page_status',
      page_column: 'bus_org_column',
      select_list: 'bus_org_select_list',
      page_auth_column: 'filler_auth_column',
      page_s_auth_column: 'filler_s_auth_column',
      mode_list_gasstation: 'filler_gasstation_mode_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success',
      page_column_detail: 'bus_orgDetail_column'
    })
  },
  created: function () {
    this.initData()
    $userOrgPicList({ orgId: this.$route.query.orgId }).then(response => {
      console.log(response)
    })
  },
  methods: {
    initData() {
      $userOrgFind({ orgId: this.$route.query.orgId }).then(response => {
        this.authRow = response.data
        // 重置tab标签值
        this.active = this.authRow.authType ? '' + this.authRow.authType : '2'
        // 显示认证状态
        this.authColor = this.authRow.authStatus == 2 ? 'no' : 'off'
      })
    },
    onListEvent(type, row) {
      this.currType = type

      if (row.authStatus == 2) {
        return false
      }
      // 重置page_column值
      this.resetAuthPageCol()
      this.authRow._btn = this.formBtnList
      // 重置tab标签值
      this.active = row && row.authType ? '' + row.authType : '2'
      // 显示认证状态
      this.authColor = row && row.authStatus == 2 ? 'no' : 'off'
      // 是否显示dialog
      this.dialogAddGasStationVisible = true
    },
    handleClick() {
      this.resetAuthPageCol()
    },
    authLisenceUpload() {
      this.$router.push(`lisence?orgId=${this.$route.query.orgId}&authType=${this.authRow.authType}`)
    },
    authIdcardUpload() {
      this.$router.push(`idcard?orgId=${this.$route.query.orgId}`)
    },
    resetAuthPageCol() {
      if (this.active == '2') {
        this.auth_page_column = this.page_auth_column
      } else {
        this.auth_page_column = this.page_s_auth_column
      }
      if (this.currType == 'auth' || this.currType == 'detail') {
        this.tabDisabled = true
        this.isAuthInfo = true
        this.auth_page_column.forEach(item => {
          if (item.show && item.show.type != 'hide') {
            item.show.isDisabled = true
          }
        })
      } else {
        this.tabDisabled = false
        this.isAuthInfo = false
        this.auth_page_column.forEach(item => {
          if (item.show && item.show.type != 'hide') {
            item.show.isDisabled = false
          }
        })
      }
    },
    orgAuthEvent(row) {
      const params = {
        memberType: 2,
        orgId: row.orgId,
        source: 2
      }
      $orgAuth(params).then(res => {
        this.$message.success('成功！')

        this.$refs.tables.initDataList()
      })
    },
    onFormEvent(obj, row) {
      if (obj.type === 'ok') {
        if (this.currType === 'add_info' || this.currType === 'gedit') {
          this.onListEventAddGasStation(row)
        } else {
          this.orgAuthEvent(row)
          this.dialogAddGasStationVisible = false
        }
      } else {
        this.dialogAddGasStationVisible = false
      }
    },
    handleError() {

    },
    handleSucess(type, res, file, fileList) {
      const params = {
        orgId: this.$route.query.orgId,
        picType: type,
        filePath: res.data
      }

      $uploadOrgPic(params).then(response => {
        this.$message.success(response.message)
      })
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this))

      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
<style lang="scss" scoped>
  ul {
    padding: 0;
    display: flex;
    justify-content: space-between;

    li {
      width: 48%;
      list-style: none;
      padding: 15px 25px;
      border-radius: 8px;
      border: 1px solid #e2e2e2;
      background-color: #ffffff;

      .li-headers {
        font-size: 20px;
        font-weight: bold;
      }
      .li-form {
        display: flex;
        padding: 10px 0;
        justify-content: space-between;
      }
    }
  }
  .btn-update {
    color: #409EFF;
    cursor: pointer;
  }
</style>
