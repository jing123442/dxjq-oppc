<template>
  <el-form class="template-main">
    <em-table-list :tableListName="'account'" ref="tables" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>

    <el-dialog :title="'提现-' + orgTitle" :visible.sync="dialogWithdrawVisible" width="60%" :append-to-body="true" @close="backAccountList()">
      <el-steps :active="active" simple style="margin: 20px 30px 30px 30px;">
        <el-step title="提现信息"></el-step>
        <el-step title="录入验证码"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <el-form size="small" :model="formWithdraw" v-show="active == 1" label-width="80px" ref="formWithdraw" style="padding: 0 30px 20px;" v-if="dialogWithdrawVisible" :rules="formWithdrawRules">
        <el-form-item label="提现金额" prop="amount" style="width: 90%;">
          <el-input v-model="formWithdraw.amount"></el-input>
          <span>账户余额 <span>{{formWithdraw.balance}}</span> 元，可提现余额 <span>{{formWithdraw.withdrawAmount}}</span> 元，<span class="btn-link" @click="balanceToAmount">全部金额</span></span>
        </el-form-item>
        <el-form-item label="银行卡" prop="note" style="width: 90%;">
          <div class="card-box">
            <img src="@/assets/images/business/bank_none@3x.png" />
            <div class="box-info">
              <div class="name">{{formWithdraw.bankName}}</div>
              <div class="desc">{{formWithdraw.orgAccount | formatCardNumber}}</div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="备注" prop="note" style="width: 90%;">
          <el-input v-model="formWithdraw.note" type="textarea" :rows="4" placeholder="请输入内容">
          </el-input>
        </el-form-item>
        <el-form-item style="text-align: right;margin-right: 10%;">
          <el-button type="primary" @click="nextWithdraw('formWithdraw')">下一步</el-button>
        </el-form-item>
        <div class="notice">
          <p class="title">提现说明</p>
          <p>1.单笔交易限额 ￥200,000.00</p>
          <p>2.单日交易限额 ￥1,000,000.00</p>
          <p>3.交易时间为 07:00-20:00</p>
          <p>4.为保证业务正常进行，请确保提现后账户余额大于 {{formWithdraw.currentQuota}} 元</p>
        </div>
      </el-form>
      <el-form size="small" :model="formWithdraw" v-show="active == 2" label-width="80px" ref="formWithdrawNext" style="padding: 0 30px 20px;" v-if="dialogWithdrawVisible" :rules="formWithdrawNextRules">
        <el-form-item label="提现金额" prop="amount" style="width: 90%;">{{formWithdraw.amount}} 元</el-form-item>
        <el-form-item label="银行卡" prop="note" style="width: 90%;">
          <div class="card-box">
            <img src="@/assets/images/business/bank_none@3x.png" />
            <div class="box-info">
              <div class="name">{{formWithdraw.bankName}}</div>
              <div class="desc">{{formWithdraw.orgAccount | formatCardNumber}}</div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="备注" prop="note" style="width: 90%;">{{formWithdraw.note}}</el-form-item>
        <el-form-item label="验证码" prop="verificationCode" style="width: 90%;">
          <el-input v-model="formWithdraw.verificationCode">
            <template slot="append"><div class="getcode-btn" @click="getCodeEvent('formBindTel')">{{codeBtn.text}}</div></template>
          </el-input>
          <span>验证码将发送至 <span>{{formWithdraw.tel | formatCardNumber}}</span></span>
        </el-form-item>
        <el-form-item style="text-align: right;margin-right: 10%;">
          <el-button type="primary" @click="nextWithdraw('formWithdrawNext')">提 交</el-button>
        </el-form-item>
      </el-form>
      <el-form size="small" v-show="active == 3" class="result-info" style="padding: 30px 30px 20px;">
        <div class="center">
          <img style="width: 80px; height: 80px" :src="statusIcon[(orderInfo.status || 1)]" fit="fill" />
        </div>
        <div class="title center">{{orderInfo.status == 3 ? '提现成功' : (orderInfo.status == 4 ? '提现失败' : '银行处理中')}}</div>
        <div class="worker center" v-if="orderInfo.status == 3 || orderInfo.status == 4">{{orderInfo.updateDate | formateTData('all')}}</div>
        <div class="worker center" v-else>预计三个工作日后到账</div>
        <div class="detail">
          <el-form-item label="申请时间">{{orderInfo.createDate | formateTData('all')}}</el-form-item>
          <el-form-item label="提现单号">{{orderInfo.withdrawOrderId}}</el-form-item>
          <el-form-item label="提现金额"><span class="price">{{orderInfo.amount}} 元</span></el-form-item>
        </div>
        <el-form-item style="text-align: center;"><el-button type="primary" @click="backAccountList()">返回公司资金账户</el-button></el-form-item>
      </el-form>
    </el-dialog>
  </el-form>
</template>
<script>
import { axiosRequestParams, isTypeof, callbackPagesInfo, custFormBtnList } from '@/utils/tools'
import { $userOrgFind } from '@/service/user'
import { $orgWithdraw, $getWithdrawInfo } from '@/service/pay'
import { $verifySendMessage } from '@/service/message'
import { mapGetters } from 'vuex'

export default {
  name: 'account',
  data() {
    return {
      active: 1,
      isShow: false,
      statusIcon: {
        1: require('@/assets/images/business/clock@2x.png'),
        2: require('@/assets/images/business/clock@2x.png'),
        3: require('@/assets/images/business/success@2x.png'),
        4: require('@/assets/images/business/fail@2x.png')
      },
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
      orderInfo: {},
      formWithdraw: {},
      formWithdrawRules: {
        amount: [{ required: true, message: '请输入提现金额！', trigger: 'blur' }],
        note: [{ required: true, message: '请输入备注！', trigger: 'blur' }]
      },
      formWithdrawNextRules: {
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
      } else if (type === 'cashdetail') {
        this.$router.push(`account/accountDetail?orgId=${row.orgId}`)
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
            $getWithdrawInfo({ orgType: row.orgType }).then(res => {
              console.log(data)
              const currentQuota = res.data && res.data.currentQuota ? res.data.currentQuota : 0
              this.orgTitle = row.orgName
              row.tel = data.bindPhone
              row.orgAccount = data.account
              row.bankName = data.bank
              this.formWithdraw = row
              this.$set(this.formWithdraw, 'currentQuota', currentQuota.toFixed(2))
              this.$set(this.formWithdraw, 'amount', (row.balance > currentQuota) ? (row.balance - currentQuota).toFixed(2) : 0)
              this.$set(this.formWithdraw, 'withdrawAmount', (row.balance > currentQuota) ? (row.balance - currentQuota).toFixed(2) : 0)
              this.dialogWithdrawVisible = true
            })
          }
        })
      }
    },
    nextWithdraw(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          if (this.active == 1) {
            if (this.formWithdraw.amount > this.formWithdraw.withdrawAmount) {
              this.$message.error('提现金额大于账号金额！')
              return false
            } else if (this.formWithdraw.amount <= 0) {
              this.$message.error('提现金额大于0！')
              return false
            }
            this.active = 2
          } else if (this.active == 2) {
            this.btnClickEvent()
          }
        } else {
          return null
        }
      })
    },
    balanceToAmount() {
      this.formWithdraw.amount = this.formWithdraw.withdrawAmount
    },
    backAccountList() {
      this.active = 1
      this.dialogWithdrawVisible = false
      this.$refs.tables.initDataList()
    },
    btnClickEvent() {
      const params = {
        amount: this.formWithdraw.amount,
        legalBankno: this.formWithdraw.orgAccount,
        note: this.formWithdraw.note,
        orgId: this.formWithdraw.orgId,
        orgName: this.formWithdraw.orgName,
        verificationCode: this.formWithdraw.verificationCode
      }

      $orgWithdraw(params).then(response => {
        this.$message.success('成功！')
        this.orderInfo = response.data
        this.active = 3
      })
    },
    getCodeEvent() {
      const params = {
        mobile: this.formWithdraw.tel,
        type: 5
      }
      $verifySendMessage(params).then(res => {
        this.$message.success('短信发送成功！')
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
