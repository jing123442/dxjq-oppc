<template>
  <div class="pointsAccount template-main">
    <em-table-list :custTableTitle="'积分账户'" :tableListName="'pointsAccount'" ref="pointsAccount" :axios="axios" :queryCustURL="queryTableCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onReqParams="onReqParams" @onListEvent="onListTableEvent"></em-table-list>
    <el-dialog title="积分调整" :append-to-body="true" :visible.sync="dialogVisible" :width="add_edit_dialog">
      <nt-form v-if="dialogVisible" ref="points" formRef="pointsForm" :rowData="rowData" :pageColumn="point_change_page_column" :modeList="point_change_mode_list" :selectList="point_change_select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="onListFormEvent"></nt-form>
    </el-dialog>
  </div>
</template>
<script>
import { initVueDataOptions, callbackPagesInfo, isTypeof, custFormBtnList } from '@/utils/tools'
import { $userAccountUpdate, $userAccountChangeScore } from '@/service/account'
import { mapGetters } from 'vuex'
export default {
  data() {
    return initVueDataOptions(this, {
      queryTableCustURL: {
        list: {
          url: 'account/user_account/page_list_score',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '积分账户'
      },
      btnList: custFormBtnList(),
      queryParams: Function,
      dialogVisible: false,
      rowData: {}
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'points_account_mode_list',
      page_status: 'points_account_page_status',
      page_column: 'points_account_column',
      select_list: 'points_account_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      response_success: 'response_success',
      point_change_page_column: 'point_change_column',
      point_change_mode_list: 'point_change_mode_list',
      point_change_select_list: 'point_change_select_list'
    })
  },
  methods: {
    onListTableEvent(type, row) {
      if (type == 'startUse') {
        this.setPointsAccoutStatus({ accountId: row.accountId, status: 0 }, '启用')
      } else if (type == 'stopUse') {
        this.setPointsAccoutStatus({ accountId: row.accountId, status: 1 }, '停用')
      } else if (type == 'tradeDetail') {
        this.$router.push({
          path: '/pointsMall/pointsAccount/pointsAccountLog',
          query: { row: JSON.stringify(row) }
        })
      } else if (type == 'pointsAdjust') {
        this.rowData = row
        this.rowData._btn = custFormBtnList()
        this.dialogVisible = true
      }
    },
    onListFormEvent(obj) {
      if (obj.type == 'ok') {
        this.$refs.points.$refs.pointsForm.validate((valid) => {
          if (valid) {
            const params = {
              changeAmount: this.rowData.changeType == 1 ? -1 * this.rowData.changeAmount : this.rowData.changeAmount,
              note: this.rowData.note,
              rewardType: 22, // 积分调整
              userId: this.rowData.userId
            }
            $userAccountChangeScore(params).then(res => {
              this.$message.success('调整成功')
              this.dialogVisible = false
              this.$refs.pointsAccount.initDataList()
            })
          }
        })
      } else if (obj.type == 'cancel') {
        this.dialogVisible = false
      }
    },
    setPointsAccoutStatus(params, text) {
      this.$confirm(`确定${text}吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        $userAccountUpdate(params).then(res => {
          this.$message.success(`${text}成功`)
          this.$refs.pointsAccount.initDataList()
        })
      }).catch(() => {})
    },
    onReqParams(type, _this, callback) {
      const that = this
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { } })
      console.log(_this.finds)
      if (isTypeof(_this.finds) === 'object') {
        params.param.userAccount = {}
        for (var [k, v] of Object.entries(_this.finds)) {
          if (k == 'mobile') {
            params.param.keyword = v
          } else if (k == 'balance') {
            if ((Array.isArray(v) && v.length == 0) || v == '') {
              params.param.balanceMax = ''
              params.param.balanceMin = ''
            } else {
              if (v[0] < v[1] || (v[0] == '' && v[1] == '')) {
                params.param.balanceMax = v[1]
                params.param.balanceMin = v[0]
              } else {
                that.$message.error('余额范围设置有误，请检查')
              }
            }
          } else {
            params.param.userAccount[k] = v
          }
        }
      }
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
