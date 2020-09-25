<template>
  <div class="template-main">
    <em-table-list :tableListName="'busorg'" ref="tables" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
    <el-dialog title="添加平台公司" :visible.sync="dialogAddGasStationVisible" :width="add_edit_dialog">
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
    <el-dialog title="绑定手机号" :visible.sync="dialogBindVisible" width="30%">
      <el-form size="small" :model="formBindTel" label-width="80px" ref="formBindTel" v-if="dialogBindVisible" :rules="formBindTelRules">
        <el-form-item label="手机号" prop="tel" style="width: 90%;">
          <el-input v-model="formBindTel.tel"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code" style="width: 90%;">
          <el-input v-model="formBindTel.code">
            <template slot="append"><div class="getcode-btn" @click="getCodeEvent('formBindTel')">{{codeBtn.text}}</div></template>
          </el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="el-del-btn-item">
          <div class="btn-item-footer">
            <el-button v-for="(btnItem, index) in formBtnList.list" :key="index" :type="btnItem.bType"
                       size="small"
                       :icon="btnItem.icon" @click="btnClickEvent(btnItem)">{{btnItem.label}}
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { axiosRequestParams, queryDefaultParams, custFormBtnList, isTypeof } from '@/utils/tools'
import { mapGetters } from 'vuex'
import { $orgAuth, $signContract, $signBalanceProtocol, $sendVerificationCode, $bindPhone, $unbindPhone } from '@/service/pay'
import { $userOrgAdd, $userOrgEdit } from '@/service/user'

export default {
  name: 'busorg',
  data() {
    return {
      active: '2',
      isAuthInfo: false,
      tabDisabled: false,
      authColor: 'off',
      isShow: false,
      queryCustURL: {
        list: {
          url: 'user/org/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '企业管理'
      },
      buttonsList: [{ type: 'primary', icon: '', event: 'add_info', name: '添加公司' }],
      axios: axiosRequestParams(this),
      queryParams: queryDefaultParams(this, { type: 2, key: 'param', value: { orgType: 0 } }),
      dialogAddGasStationVisible: false,
      authRow: {},
      auth_page_column: [],
      dialogBindVisible: false,
      codeBtn: {
        text: '获取验证码',
        disabled: false
      },
      formBindTel: {
        tel: '',
        code: ''
      },
      formBindTelRules: {
        tel: [{ required: true, message: '请输入手机号码！', trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },
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
  created: function () {},
  methods: {
    onListEvent(type, row) {
      this.currType = type
      if (type === 'bind' || type === 'unbind') {
        this.currRow = row
        this.dialogBindVisible = true
      } else if (isTypeof(type) == 'object' && type.field == 'protocolNo') {
        $signBalanceProtocol({ orgId: row.orgId, source: 2 }).then(response => {
          if (response.code === 0) {
            window.open(response.data)
          }
        })
      } else if (isTypeof(type) == 'object' && type.field == 'contractNo') {
        $signContract({ orgId: row.orgId, source: 2 }).then(response => {
          if (response.code === 0) {
            window.open(response.data)
          }
        })
      } else {
        // 重置page_column值
        this.resetAuthPageCol()

        // 重置tab标签值
        this.active = row && row.authType ? '' + row.authType : '2'
        // 显示认证状态
        this.authColor = row && row.authStatus == 2 ? 'no' : 'off'
        // 是否显示dialog
        this.dialogAddGasStationVisible = true
        this.authRow = row
        if (type === 'add_info' || type === 'gedit' || type === 'auth') {
          this.authRow._btn = this.formBtnList
        } else {
          this.authRow._btn = {}
        }
      }
    },
    handleClick() {
      this.resetAuthPageCol()
    },
    codeEvent() { // 获取验证码
      const params = {
        bindPhone: this.formBindTel.tel,
        orgId: this.currRow.orgId,
        verificationCodeType: this.currType == 'bind' ? 9 : 6
      }
      $sendVerificationCode(params).then(res => {
        if (res.code === 0) {
          this.$message.success(res.message)
        }
      })
      let time = 60
      this.codeBtn.text = time + 's'
      this.timer = setInterval(() => {
        time--
        this.codeBtn.text = time + 's'
        this.codeBtn.disabled = true
        if (time < 0) {
          clearInterval(this.timer)
          this.codeBtn.text = '获取验证码'
          this.codeBtn.disabled = false
        }
      }, 1000)
    },
    getCodeEvent(form) {
      // let step = this.stepActive
      if (this.codeBtn.disabled) { return }
      this.$refs[form].validateField('tel', valid => {
        if (!valid) {
          this.codeEvent()
        } else {
          return null
        }
      })
    },
    btnClickEvent(item) { // 绑定手机号
      if (item.type == 'ok') {
        this.$refs.formBindTel.validate(valid => {
          if (valid) {
            const params = {
              orgId: this.currRow.orgId,
              verificationCode: this.formBindTel.code,
              bindPhone: this.formBindTel.tel,
              verificationCodeType: this.currType == 'bind' ? 9 : 6
            }
            if (this.currType == 'bind') {
              $bindPhone(params).then(res => {
                this.$message.success(res.message)

                this.$refs.tables.initDataList()
              })
            } else {
              $unbindPhone(params).then(res => {
                this.$message.success(res.message)

                this.$refs.tables.initDataList()
              })
            }
          }
        })
      }
      this.dialogBindVisible = false
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
    onReqParams(type, _this, callback) {
      // eslint-disable-next-line standard/no-callback-literal
      callback({
        page: 1,
        size: 10,
        param: {
          orgType: 0
        }
      })
    },
    onFormEvent(obj, row) {
      if (obj.type === 'ok') {
        if (this.currType === 'add_info' || this.currType === 'gedit') {
          this.onListEventAddGasStation(row)
        } else {
          this.orgAuthEvent(row)
        }
      }

      this.dialogAddGasStationVisible = false
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
    onListEventAddGasStation(row) {
      this.$refs.addGap.$children[0].validate(valid => {
        if (valid) {
          const params = {}
          this.auth_page_column.forEach(item => {
            params[item.field] = row[item.field]
          })

          params.authType = this.active
          params.orgType = 0
          if (this.currType === 'add_info') {
            $userOrgAdd(params).then(res => {
              this.$message.success('成功！')

              this.$refs.tables.initDataList()
            })
          } else {
            $userOrgEdit(params).then(res => {
              this.$message.success('成功！')

              this.$refs.tables.initDataList()
            })
          }
        }
      })
    }
  }
}
</script>
