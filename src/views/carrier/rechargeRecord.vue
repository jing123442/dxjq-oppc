<template>
  <div class="template-main">
    <em-table-list ref="rechargeRecord" :tableListName="'rechargeRecord'" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
     <el-dialog title="审核" :visible.sync="dialogCheckVisible" :width="add_edit_dialog">
      <nt-form v-if="dialogCheckVisible" :rowData="checkRow" :pageColumn="page_column_check" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success"  @reload="initDataList" @clear="subClearBtn" @onListEvent="onListEventDialogRecharge"></nt-form>
    </el-dialog>
     <el-dialog title="充值详情" :visible.sync="dialogDetailVisible" :width="add_edit_dialog">
      <nt-form v-if="dialogDetailVisible" :rowData="detailRow" :pageColumn="page_column_detail" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success"  @reload="initDataList" @clear="subClearBtn" @onListEvent="onListEventDialogDetail"></nt-form>
    </el-dialog>
  </div>
</template>
<script>
import { axiosRequestParams, queryDefaultParams } from '@/utils/tools'
import { mapGetters } from 'vuex'
import { $audit } from '@/service/business'
// import { formateTData } from '@/utils/filters'

export default {
  name: 'rechargeRecord',
  data() {
    return {
      isShow: false,
      queryCustURL: {
        list: {
          url: 'business/recharge_order/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '充值记录'
      },
      axios: axiosRequestParams(this),
      queryParams: queryDefaultParams(this, { type: 2, key: 'param', value: { orgType: 0 } }),
      dialogCheckVisible: false,
      checkRow: {},
      dialogDetailVisible: false,
      detailRow: {}
    }
  },
  computed: {
    ...mapGetters({
      mode_list: 'carrier_rechargeRecord_mode_list',
      page_status: 'carrier_rechargeRecord_page_status',
      page_column: 'carrier_rechargeRecord_column',
      page_column_check: 'carrier_rechargeRecordCheck_column',
      page_column_detail: 'carrier_rechargeRecordDetail_column',
      select_list: 'carrier_rechargeRecord_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () {},
  methods: {
    onListEvent(type, row) {
      switch (type) {
        case 'check':
          this.authRechargeRecord(row)
          break
        case 'detail':
          this.detailRechargeRecord(row)
          break
      }
    },
    authRechargeRecord(row) {
      this.checkRow = row
      this.checkRow._btn = {
        iShow: true,
        list: [{
          bType: 'default',
          label: '取消',
          icon: ''
        }, {
          bType: 'primary',
          label: '通过',
          icon: ''
        }]
      }

      this.dialogCheckVisible = true
    },
    detailRechargeRecord(row) {
      this.detailRow = row
      this.detailRow._btn = {
        iShow: true,
        list: [{
          btype: 'default',
          label: '返回',
          icon: ''
        }]
      }

      this.dialogDetailVisible = true
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
    onListEventDialogRecharge(obj) {
      const self = this
      if (obj.label === '通过') {
        const params = {
          rechargeOrderId: this.checkRow.rechargeOrderId,
          auditer: JSON.parse(localStorage.getItem('wopuser')).user_id,
          auditerName: JSON.parse(localStorage.getItem('wopuser')).user_name
        }
        $audit(params).then(res => {
          if (res.code === 0) {
            self.$message.success(res.message)
            self.dialogCheckVisible = false
            self.$refs.rechargeRecord.initDataList()
          } else {
            self.$message.error(res.message)
          }
        })
      } else {
        this.dialogCheckVisible = false
      }
    },
    onListEventDialogDetail(obj) {
      console.log(obj)
    },
    initDataList() {},
    subClearBtn() {}
  }
}
</script>
