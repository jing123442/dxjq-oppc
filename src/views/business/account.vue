<template>
  <div class="template-main">
    <em-table-list :tableListName="'account'" ref="tables" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>

    <el-dialog :title="'提现-' + orgTitle" :visible.sync="dialogWithdrawVisible" width="40%">
      <el-form size="small" :model="formWithdraw" label-width="80px" ref="formWithdraw" v-if="dialogWithdrawVisible" :rules="formWithdrawRules">
        <el-form-item label="提现金额" prop="amount" style="width: 90%;">
          <el-input v-model="formWithdraw.amount"></el-input>
          <span>账号余额 <span>{{formWithdraw.balance}}</span> 元，<span class="btn-link" @click="balanceToAmount">全部金额</span></span>
        </el-form-item>
        <el-form-item label="验证码" prop="verificationCode" style="width: 90%;">
          <el-input v-model="formWithdraw.verificationCode">
            <template slot="append"><div class="getcode-btn" @click="getCodeEvent('formBindTel')">{{codeBtn.text}}</div></template>
          </el-input>
        </el-form-item>
        <el-form-item label="备注" prop="note" style="width: 90%;">
          <el-input v-model="formWithdraw.note" type="textarea" :rows="4" placeholder="请输入内容">
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
import { axiosRequestParams, isTypeof, callbackPagesInfo, custFormBtnList } from '@/utils/tools'
import { $userOrgFind } from '@/service/user'
import { $sendVerificationCode, $orgWithdraw } from '@/service/pay'
import { mapGetters } from 'vuex'

export default {
  name: 'account',
  data() {
    return {
      isShow: false,
      queryCustURL: {
        add: {
          url: '/user/user/add',
          method: 'post'
        },
        edit: {
          url: '/user/user/edit',
          method: 'post'
        },
        list: {
          url: '/account/org_account/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '公司资金账户管理 '
      },
      queryParams: Function,
      axios: axiosRequestParams(this),
      formBtnList: custFormBtnList(),
      orgTitle: '',
      codeBtn: {
        text: '获取验证码',
        disabled: false
      },
      formWithdraw: {},
      formWithdrawRules: {
        amount: [{ required: true, message: '请输入提现金额！', trigger: 'blur' }],
        note: [{ required: true, message: '请输入备注！', trigger: 'blur' }],
        verificationCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },
      dialogWithdrawVisible: false
    }
  },
  computed: {
    ...mapGetters({
      mode_list: 'bus_account_mode_list',
      page_status: 'bus_account_page_status',
      page_column: 'bus_account_column',
      select_list: 'bus_account_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      query_params: 'query_params',
      response_success: 'response_success'
    })
  },
  created: function () {},
  methods: {
    onListEvent(type, row) {
      if (type === 'check') {
        this.$router.push(`account/accountList?orgId=${row.orgId}&accountId=${row.accountId}`)
      } else {
        $userOrgFind({ orgId: row.orgId }).then(response => {
          const data = response.data

          if (data.authStatus != 2) {
            this.$message.error('企业未认证，请先去认证！')
          } else if (!data.bindPhone) {
            this.$message.error('未绑定手机号，请先去绑定手机号！')
          } else if (!data.contractNo) {
            this.$message.error('未签提现协议，请先去签提现协议！')
          } else {
            this.orgTitle = row.orgName
            row.tel = data.bindPhone
            row.orgAccount = data.account
            this.formWithdraw = row
            this.$set(this.formWithdraw, 'amount', row.balance)
            this.dialogWithdrawVisible = true
          }
        })
      }
    },
    balanceToAmount() {
      this.formWithdraw.amount = this.formWithdraw.balance
    },
    btnClickEvent(btnObj) {
      if (btnObj.type == 'ok') {
        this.$refs.formWithdraw.validate(valid => {
          if (!valid) {
            if (this.formWithdraw.amount > this.formWithdraw.balance) {
              this.$message.error('提现金额大于账号金额！')
              return false
            } else if (this.formWithdraw.amount <= 0) {
              this.$message.error('提现金额大于0！')
              return false
            }
            const params = {
              amount: this.formWithdraw.amount,
              legalBankno: this.formWithdraw.account,
              note: this.formWithdraw.note,
              orgId: this.formWithdraw.orgId,
              orgName: this.formWithdraw.orgName,
              verificationCode: this.formWithdraw.verificationCode
            }

            $orgWithdraw(params).then(response => {
              this.$message.success('成功！')

              this.dialogWithdrawVisible = false
              this.$refs.tables.initDataList()
            })
          } else {
            return null
          }
        })
      } else {
        this.dialogWithdrawVisible = false
      }
    },
    getCodeEvent() {
      const params = {
        bindPhone: this.formWithdraw.tel,
        orgId: this.formWithdraw.orgId,
        verificationCodeType: 6
      }
      $sendVerificationCode(params).then(res => {
        this.$message.success(res.message)
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
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { orgType: 0 } })

      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (v !== '') params.param[k] = v
        }
      }
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
