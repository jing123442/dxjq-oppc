<template>
  <!-- 提现待审核列表 -->
  <div class="template-main">
    <em-table-list ref="tables" :tableListName="'withdrawCheck'" :authButtonList="authButtonList" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
    <el-dialog title="审核" :visible.sync="dialogCheckVisible" width="80%" :append-to-body="true">
      <div style="color: #409EFF;margin-bottom: 10px">请选择审核通过或驳回，驳回需要填写驳回原因</div>
      <el-form :model="form" :rules="rules" ref="forms">
        <el-form-item label="驳回原因" prop="reason">
          <el-input type="textarea" :rows="3" v-model="form.reason" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" >
        <el-button v-for="(btnItem, index) in formBtnList.list" :key="index" :type="btnItem.bType"
                    size="small"
                    :icon="btnItem.icon" @click="checkEvent(btnItem)">{{btnItem.label}}
        </el-button>
      </div>
    </el-dialog>
     <el-dialog title="审核历史记录" :visible.sync="dialogCheckHistoryVisible" width="80%" :append-to-body="true">
      <em-table-list v-if="dialogCheckHistoryVisible" :tableListName="'checkLogList'" :authButtonList="authButtonList" :axios="axios" :queryCustURL="queryCustURLCheckHistory" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="check_history_mode_list" ref="tables" :page_status="check_history_page_status" :page_column="check_history_page_column" :select_list="check_history_select_list" @onListEvent="onListEvent" @onReqParams="onReqParamsCheckHistory"></em-table-list>
    </el-dialog>
  </div>
</template>
<script>
import { initVueDataOptions, callbackPagesInfo, isTypeof } from '@/utils/tools'
import { $withdrawCheckLogCheck } from '@/service/pay'
import { mapGetters } from 'vuex'

export default {
  name: 'withdrawCheck',
  data() {
    return initVueDataOptions(this, {
      queryCustURL: {
        list: {
          url: 'pay/withdraw_order/check_list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '提现待审核列表'
      },
      queryCustURLCheckHistory: {
        list: {
          url: 'pay/withdraw_check_log/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '审核历史记录1111'
      },
      dialogCheckVisible: false,
      formBtnList: {
        list: [{ bType: 'danger', icon: '', type: 'no', label: '驳回' }, { bType: 'primary', icon: '', type: 'ok', label: '通过' }]
      },
      currRow: {},
      buttonsList: [{ type: 'primary', icon: '', event: 'check_history', name: '审核历史记录' }],
      form: {
        reason: ''
      },
      rules: {
        reason: [{ required: true, message: '请输入驳回原因', trigger: 'blur' }]
      },
      dialogCheckHistoryVisible: false
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'withdraw_check_mode_list',
      page_status: 'withdraw_check_page_status',
      page_column: 'withdraw_check_column',
      select_list: 'withdraw_check_select_list',
      check_history_mode_list: 'check_history_mode_list',
      check_history_page_status: 'check_history_page_status',
      check_history_page_column: 'check_history_column',
      check_history_select_list: 'check_history_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () {},
  methods: {
    onListEvent(type, row) {
      if (type === 'check') {
        this.currRow = row
        this.dialogCheckVisible = true
      } else if (type == 'check_history') {
        this.dialogCheckHistoryVisible = true
      }
    },
    checkEvent(btnItem) {
      console.log(btnItem)
      if (btnItem.type == 'ok') {
        $withdrawCheckLogCheck({ withdrawOrderId: this.currRow.withdrawOrderId, checkResult: 1 }).then(res => {
          this.$message.success('操作成功')
          this.dialogCheckVisible = false
          this.$refs.tables.initDataList()
        })
      } else {
        this.$refs.forms.validate(valid => {
          if (valid) {
            $withdrawCheckLogCheck({ withdrawOrderId: this.currRow.withdrawOrderId, checkResult: 5, refuseMessage: this.form.reason }).then(res => {
              this.$message.success('操作成功')
              this.dialogCheckVisible = false
              this.$refs.tables.initDataList()
            })
          }
        })
      }
    },
    onReqParams(type, _this, callback) {
      const querys = { param: { } }

      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (k == 'period') {
          } else {
            if (v !== '') querys.param[k] = v
          }
        }
      }

      const params = Object.assign({}, callbackPagesInfo(_this), querys)
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    },
    onReqParamsCheckHistory(type, _this, callback) {
      const querys = { param: { } }
      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (v !== '') querys.param[k] = v
        }
      }
      const params = Object.assign({}, callbackPagesInfo(_this), querys)
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
