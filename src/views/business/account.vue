<template>
  <el-form class="template-main">
    <em-table-list :tableListName="'account'" ref="tables" :authButtonList="authButtonList" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>

    <el-dialog :title="'提现-' + orgTitle" :visible.sync="dialogWithdrawVisible" width="60%" :append-to-body="true" @close="backAccountList()">
      <el-steps :active="active" simple style="margin: 20px 30px 30px 30px;">
        <el-step title="提现信息"></el-step>
        <el-step title="录入验证码"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <el-form size="small" :model="formWithdraw" v-show="active == 1" label-width="80px" ref="formWithdraw" style="padding: 0 30px 20px;" v-if="dialogWithdrawVisible" :rules="formWithdrawRules">
        <el-form-item label="交易模式" style="width: 90%;">
          <el-input disabled :value="this.formWithdraw.tradeType == 1 ? '经销加气': this.formWithdraw.tradeType == 2 ? '直销加气' : ''"></el-input>
        </el-form-item>
        <el-form-item label="提现金额" prop="amount" style="width: 90%;">
          <el-input v-model="formWithdraw.amount"></el-input>
          <span>账户余额 <span>{{formWithdraw.balance}}</span> 元，可提现余额 <span>{{formWithdraw.withdrawAmount}}</span> 元，<span class="btn-link" @click="balanceToAmount">全部金额</span></span>
        </el-form-item>
        <el-form-item label="银行卡" prop="orgAccount" style="width: 90%;">
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
          <p>5.直销加气交易模式的提现，请注意保留充足的备付金，以用于下游清分</p>
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
          <el-button type="primary" :disabled="withdrawStatus" @click="nextWithdraw('formWithdrawNext')">提 交</el-button>
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
    <el-dialog :append-to-body="true" title="充值" width="450px" :visible.sync="rechargeDialogVisible" @close="closeRechargeDialog">
      <el-form :model="formRecharge" :rules="formRechargeRules" ref="formRecharge">
        <el-form-item label="充值金额(元)：" prop="recharge">
          <el-input placeholder="请输入" v-model.number="formRecharge.recharge" clearable=""></el-input>
        </el-form-item>
        <div class="moneyList">
          <div class="item" v-for="(item, index) in moneyList" :class="{ 'active': moneySelectedIndex === index }" :key="index" @click="moneyItemClick(index)">{{item}}</div>
        </div>
        <el-form-item class="el-del-btn-item" style="border-radius: 0 0 5px 5px;">
          <div class="btn-item-footer">
            <el-button size="small" type="primary" @click="rechargeEvent">确认充值</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-form>
</template>
<script>
import { isTypeof, callbackPagesInfo, initVueDataOptions } from '@/utils/tools'
import { $userOrgFind } from '@/service/user'
import { $orgWithdraw, $getWithdrawInfo, $depositApply, $depositApplyConfirm, $getOrgAuthInfo } from '@/service/pay'
import { $verifySendMessage } from '@/service/message'
import { mapGetters } from 'vuex'

export default {
  name: 'account',
  data() {
    return initVueDataOptions(this, {
      active: 1,
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
      orgTitle: '',
      codeBtn: {
        text: '获取验证码',
        disabled: false
      },
      orderInfo: {},
      formWithdraw: {},
      withdrawStatus: true,
      formWithdrawRules: {
        amount: [{ required: true, message: '请输入提现金额！', trigger: 'blur' }],
        note: [{ required: true, message: '请输入备注！', trigger: 'blur' }]
      },
      formWithdrawNextRules: {
        verificationCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },
      dialogWithdrawVisible: false,
      formRecharge: {
        recharge: 0
      },
      formRechargeRules: {
        recharge: [{ required: true, message: '充值金额不能为空', trigger: 'blur' },
          { required: true, message: '充值金额不能为空', trigger: 'change' },
          { type: 'number', message: '充值金额必须为数字值', trigger: 'blur' },
          { type: 'number', message: '充值金额必须为数字值', trigger: 'change' }]
      },
      rechargeDialogVisible: false,
      moneySelectedIndex: '',
      moneyList: [5000, 10000, 20000, 100000]
    })
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
      if (type === 'list') {
        this.$router.push(`account/accountList?orgId=${row.orgId}&accountId=${row.accountId}`)
      } else if (type === 'withdraw_list') {
        this.$router.push(`account/accountDetail?orgId=${row.orgId}&tradeType=${row.tradeType}`)
      } else if (type === 'recharge') {
        $userOrgFind({ orgId: row.orgId }).then(response => {
          this.rechargeRow = response.data
          this.rechargeDialogVisible = true
        })
      } else {
        $userOrgFind({ orgId: row.orgId }).then(async response => {
          const data = response.data

          const channelInfo = await $getOrgAuthInfo({ orgId: row.orgId }).then(response => {
            return response.data
          })
          if (data.authStatus != 2) {
            this.$message.error('企业未认证，请先去认证！')
          } else if (!data.bindPhone) {
            this.$message.error('未绑定手机号，请先去绑定手机号！')
          } else if (!channelInfo.contractNo) {
            this.$message.error('未签提现协议，请先去签提现协议！')
          } else {
            $getWithdrawInfo({ orgType: row.orgType }).then(res => {
              const currentQuota = res.data && res.data.currentQuota ? Number(res.data.currentQuota) : 0
              this.orgTitle = row.orgName
              row.tel = data.bindPhone
              row.orgAccount = data.account
              row.bankName = data.bank
              this.formWithdraw = row
              this.$set(this.formWithdraw, 'currentQuota', currentQuota.toFixed(2))
              this.$set(this.formWithdraw, 'amount', (Number(row.balance) > currentQuota) ? (Number(row.balance) - currentQuota).toFixed(2) : 0)
              this.$set(this.formWithdraw, 'withdrawAmount', (Number(row.balance) > currentQuota) ? (Number(row.balance) - currentQuota).toFixed(2) : 0)
              this.dialogWithdrawVisible = true
            })
          }
        })
      }
    },
    closeRechargeDialog() {
      this.formRecharge.recharge = 0
      this.rechargeDialogVisible = false
    },
    rechargeEvent() {
      const recharge = this.formRecharge.recharge
      if (recharge < 0 || recharge > 500000) {
        this.$message.error('充值金额必须在0-500000之间！')
        return
      } else if (recharge === 0) {
        this.$message.warning('充值金额必须大于0！')
        return
      }
      this.$refs.formRecharge.validate(valid => {
        if (valid) {
          const params = {
            amount: recharge,
            bizUserId: this.rechargeRow.bizUserId,
            orgId: this.rechargeRow.orgId,
            orgName: this.rechargeRow.orgName
          }
          $depositApply(params).then(res => {
            if (res.code === 0) {
              this.rechargeEventConfirm({ ...res.data })
            }
          })
        }
      })
    },
    rechargeEventConfirm(param) {
      $depositApplyConfirm(param).then(res => {
        if (res.code === 0) {
          this.rechargeDialogVisible = false
          this.formRecharge.recharge = 0
          window.open(res.data)
        }
      })
    },
    moneyItemClick(index) {
      this.moneySelectedIndex = index
      this.formRecharge.recharge = this.moneyList[index]
    },
    nextWithdraw(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          if (this.active == 1) {
            if (Number(this.formWithdraw.amount) > Number(this.formWithdraw.withdrawAmount)) {
              this.$message.error('提现金额大于账号金额！')
              return false
            } else if (this.formWithdraw.amount <= 0) {
              this.$message.error('提现金额大于0！')
              return false
            }
            this.active = 2
          } else if (this.active == 2) {
            this.withdrawStatus = true
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
        amount: Number(this.formWithdraw.amount),
        legalBankno: this.formWithdraw.orgAccount,
        note: this.formWithdraw.note,
        orgId: this.formWithdraw.orgId,
        orgName: this.formWithdraw.orgName,
        tradeType: this.formWithdraw.tradeType,
        verificationCode: this.formWithdraw.verificationCode
      }

      $orgWithdraw(params).then(response => {
        this.$message.success('成功！')
        this.orderInfo = response.data
        this.active = 3
      }).catch(() => {
        this.withdrawStatus = false
      })
    },
    getCodeEvent() {
      const params = {
        mobile: this.formWithdraw.tel,
        type: 5
      }
      $verifySendMessage(params).then(res => {
        this.withdrawStatus = false
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

<style lang="scss" scoped>
.moneyList {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 8px;
    width: 20%;
    height: 40px;
    border-radius: 6px;
    border: 1px solid rgba(179, 179, 198, 0.7);
    cursor: pointer;
  }
  .active {
    color: #0084F4;
    background: rgba(213, 233, 250, 0.5);
    border: 1px solid rgba(102, 181, 248, 0.5);
  }
}
</style>
