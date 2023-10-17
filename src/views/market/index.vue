<template>
  <div class="template-main">
    <em-table-list :tableListName="'busorg'" ref="tables" :authButtonList="authButtonList" :buttonsList="buttonsList"
                   :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success"
                   :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status"
                   :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent"
                   @onReqParams="onReqParams"></em-table-list>

    <el-dialog :title="bindTitle" :visible.sync="dialogBindVisible" width="30%" :append-to-body="true">
      <el-form size="small" :model="formBindTel" label-width="80px" ref="formBindTel" v-if="dialogBindVisible"
               :rules="formBindTelRules">
        <el-form-item label="手机号" prop="tel" style="width: 90%;">
          <el-input v-model="formBindTel.tel"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code" style="width: 90%;">
          <el-input v-model="formBindTel.code">
            <template slot="append">
              <div class="getcode-btn" @click="getCodeEvent('formBindTel')">{{ codeBtn.text }}</div>
            </template>
          </el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="el-del-btn-item">
          <div class="btn-item-footer">
            <el-button v-for="(btnItem, index) in formBtnList.list" :key="index" :type="btnItem.bType"
                       size="small"
                       :icon="btnItem.icon" @click="btnClickEvent(btnItem)">{{ btnItem.label }}
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { callbackPagesInfo, initVueDataOptions, isTypeof } from '@/utils/tools'
import { mapGetters } from 'vuex'
import {
  $bindPhone,
  $getOrgAuthInfo, $orgAuth,
  $sendVerificationCode,
  $unbindPhone
} from '@/service/pay'
import { $userOrgAdd, $userOrgEdit } from '@/service/user'

export default {
  data() {
    return initVueDataOptions(this, {
      queryCustURL: {
        list: {
          url: 'account/card_info/get_card_info',
          method: 'post',
          parse: {
            tableData: ['data', 'page', 'records'],
            totalCount: ['data', 'page', 'total']
          }
        },
        name: '优惠卡管理'
      },
      buttonsList: [{ type: 'primary', icon: '', event: 'send', name: '新卡发放' }],
      bindTitle: '绑定手机号',
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
      }
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'bus_org_mode_list',
      page_status: 'bus_org_page_status',
      page_column: 'market_card_column',
      select_list: 'market_card_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  methods: {
    onListEvent(type, row) {
      this.currType = type
    },
    async codeEvent() { // 获取验证码
      const channelInfo = await $getOrgAuthInfo({ orgId: this.currRow.orgId }).then(response => {
        return response.data
      })

      const params = {
        phone: this.formBindTel.tel,
        bizUserId: channelInfo.bizUserId,
        verificationCodeType: this.currType == 'bind' ? 9 : 6
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
        this.$refs.formBindTel.validate(async valid => {
          if (valid) {
            const channelInfo = await $getOrgAuthInfo({ orgId: this.currRow.orgId }).then(response => {
              return response.data
            })

            const params = {
              bizUserId: channelInfo.bizUserId,
              verificationCode: this.formBindTel.code,
              phone: this.formBindTel.tel,
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
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { org: { orgType: 0 }, dateParam: { createDateFrom: '', createDateTo: '' } } })

      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (v !== '') params.param.org[k] = v
        }
      }
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    },
    onFormEvent(obj, row) {
      if (obj.type === 'ok') {
        if (this.currType === 'add_info' || this.currType === 'self_edit') {
          this.onListEventAddGasStation(row)
        } else {
          this.orgAuthEvent(row)
          this.dialogAddGasStationVisible = false
        }
      } else {
        this.dialogAddGasStationVisible = false
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
    onListEventAddGasStation(row) {
      this.$refs.addGap.$children[0].validate(valid => {
        if (valid) {
          const params = {}
          this.auth_page_column.forEach(item => {
            if (item.ispush !== false) {
              params[item.field] = row[item.field]
            }
          })

          params.authType = this.active
          params.orgType = 0
          if (this.currType === 'add_info') {
            $userOrgAdd(params).then(res => {
              this.$message.success('成功！')

              this.$refs.tables.initDataList()
            })
          } else {
            params.orgId = row.orgId
            $userOrgEdit(params).then(res => {
              this.$message.success('成功！')

              this.$refs.tables.initDataList()
            })
          }

          this.dialogAddGasStationVisible = false
        }
      })
    }
  }
}
</script>

<style lang="scss">
.home-page-bg {
  width: 100%;
}
</style>
