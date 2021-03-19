<template>
  <div class="template-main">
    <em-table-list ref="withdrawConfig" :tableListName="'district'" :authButtonList="authButtonList" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :composeParam="composeParam" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>

    <el-dialog :title="orgTitle" :visible.sync="dialogWithdrawVisible" width="40%" :append-to-body="true" @close="closeWithdrawDialog()">
      <el-form size="small" :model="formWithdraw" label-width="120px" ref="formWithdraw" v-if="dialogWithdrawVisible" :rules="formWithdrawRules">
        <el-form-item label="设置余额限定" prop="currentQuota" style="width: 90%;">
          <el-input v-model="formWithdraw.currentQuota"></el-input>
          <span>现行的余额限定为 <span>{{formWithdraw.balance}}</span> 元</span>
        </el-form-item>
        <el-form-item label="修改说明" prop="note" style="width: 90%;">
          <el-input v-model="formWithdraw.note" type="textarea" :rows="4" placeholder="请输入修改说明">
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
    <el-dialog title="变更记录" :visible.sync="dialogWithdrawChangeVisible" :width="'70%'" :append-to-body="true">
      <em-table-list v-if="dialogWithdrawChangeVisible" :custTableTitle="'变更记录信息'" :tableListName="'withdrawChange'" style="padding-bottom: 20px;" :authButtonList="authButtonList" :axios="axios" :queryCustURL="queryChangeCustURL" :responseSuccess="response_success" :queryParam="queryChangeParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column_log" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
    </el-dialog>
  </div>
</template>
<script>
import { initVueDataOptions, queryDefaultParams } from '@/utils/tools'
import { $updateWithdrawConfig } from '@/service/pay'
import { mapGetters } from 'vuex'

export default {
  name: 'district',
  data() {
    return initVueDataOptions(this, {
      queryCustURL: {
        add: {
          url: 'user/district/add',
          method: 'post'
        },
        edit: {
          url: 'user/district/update',
          method: 'post'
        },
        del: {
          url: 'user/district/delete',
          method: 'post',
          name: 'districtName',
          props: {
            districtId: 'districtId'
          }
        },
        list: {
          url: 'user/district/list',
          method: 'post',
          parse: {
            tableData: ['data']
          }
        },
        name: '区域管理'
      },
      queryChangeCustURL: {
        list: {
          url: 'pay/withdraw_quota_log/list_by_orgType',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '余额限定变更记录'
      },
      orgTitle: '',
      formWithdraw: {},
      composeParam: ['districtId'],
      formWithdrawRules: {
        currentQuota: [{ required: true, message: '请输入余额限定！', trigger: 'blur' }],
        note: [{ required: true, message: '请输入备注！', trigger: 'blur' }]
      },
      dialogWithdrawVisible: false,
      dialogWithdrawChangeVisible: false,
      queryParams: queryDefaultParams(this),
      queryChangeParams: []
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'setting_district_mode_list',
      page_status: 'setting_district_page_status',
      page_column: 'setting_district_column',
      select_list: 'setting_district_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  mounted: function () {},
  methods: {
    onListEvent(type, row) {
      if (type === 'config') {
        this.orgTitle = row.orgTypeName
        this.dialogWithdrawVisible = true
        this.formWithdraw = row
        this.$set(this.formWithdraw, 'note', '')
        this.$set(this.formWithdraw, 'balance', row.currentQuota)
      } else {
        this.queryChangeParams = queryDefaultParams(this, { type: 2, key: 'param', value: { orgType: row.orgType } })
        this.dialogWithdrawChangeVisible = true
      }
    },
    btnClickEvent(btnObj) {
      if (btnObj.type == 'ok') {
        this.$refs.formWithdraw.validate(valid => {
          if (valid) {
            const params = {
              id: this.formWithdraw.id,
              note: this.formWithdraw.note,
              orgType: this.formWithdraw.orgType,
              orgTypeName: this.formWithdraw.orgTypeName,
              updateQuota: this.formWithdraw.currentQuota
            }

            $updateWithdrawConfig(params).then(response => {
              this.$message.success('成功！')

              this.dialogWithdrawVisible = false
              this.$refs.withdrawConfig.initDataList()
            })
          } else {
            return null
          }
        })
      } else {
        this.$refs.withdrawConfig.initDataList()
        this.dialogWithdrawVisible = false
      }
    },
    closeWithdrawDialog() {
      this.$refs.withdrawConfig.initDataList()
    },
    onReqParams(type, _this, callback) {}
  }
}
</script>
