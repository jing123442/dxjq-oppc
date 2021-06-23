<template>
  <div class="template-main">
    <em-table-list
      ref="tables"
      :tableListName="'voucherDownload'"
      :mode_list="mode_list"
      :authButtonList="authButtonList"
      :axios="axios"
      :queryCustURL="queryCustURL"
      :responseSuccess="response_success"
      :queryParam="queryParams"
      :page_column="page_column"
      :buttonsList="buttonsList"
      :select_list="select_list"
      :page_status="page_status"
      @onListEvent="onListEvent"
      @onReqParams="onReqParams"
    ></em-table-list>
    <el-dialog title="资金流水凭证明细" :visible.sync="dialogDetailVisible" :width="add_edit_dialog" :append-to-body="true">
      <em-table-list v-if="dialogDetailVisible" :tableListName="'voucher'" :custTableTitle="'资金流水凭证明细'" :authButtonList="authButtonList" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryDetailCustURL" :responseSuccess="response_success" :queryParam="queryDetailParams" :mode_list="mode_detail_list" :page_status="page_detail_status" :page_column="page_detail_column" :select_list="select_detail_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
    </el-dialog>
  </div>
</template>
<script>
import { isTypeof, initVueDataOptions, callbackPagesInfo, queryDefaultParams, exportBlobToFiles } from '@/utils/tools'
import { mapGetters } from 'vuex'
import { $settleCashFlowDownload } from '@/service/settle'

export default {
  name: 'voucherDownload',
  data() {
    return initVueDataOptions(this, {
      queryCustURL: {
        list: {
          url: 'settle/cash_flow_apply/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '资金流水下载列表'
      },
      queryDetailCustURL: {
        list: {
          url: 'pay/allinpay/query_cash_flow',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '凭证查询'
      },
      buttonsList: [],
      dialogDetailVisible: false,
      queryDetailParams: queryDefaultParams(this, { type: 2, key: 'param', value: { bizUserId: '', dateStart: '', dateEnd: '' } })
    })
  },
  computed: {
    ...mapGetters({
      page_column: 'voucher_download_column',
      mode_list: 'voucher_download_mode_list',
      page_status: 'voucher_download_page_status',
      select_list: 'voucher_download_select_list',
      mode_detail_list: 'voucher_list_mode_list',
      page_detail_status: 'voucher_list_page_status',
      page_detail_column: 'voucher_detail_column',
      select_detail_list: 'voucher_list_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () {},
  methods: {
    onListEvent(type, row) {
      if (type === 'self_detail') {
        this.queryDetailParams[2].value.bizUserId = row.bizUserId
        this.queryDetailParams[2].value.dateStart = row.startDate
        this.queryDetailParams[2].value.dateEnd = row.endDate
        this.dialogDetailVisible = true
      } else if (type === 'down_no' || type === 'down_ok') {
        const downType = type === 'down_no' ? 0 : 1

        $settleCashFlowDownload({ id: row.id, type: downType }).then(response => {
          exportBlobToFiles(response, row.fileName, 'application/pdf')
        })
      }
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { orgName: '', dateParam: { createDateFrom: '', createDateTo: '' } } })

      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (k == 'changeTime') {
            if (_this.finds.updateDate === null) {
              params.param.dateParam.createDateFrom = ''
              params.param.dateParam.createDateTo = ''
            } else {
              params.param.dateParam.createDateFrom = v[0]
              params.param.dateParam.createDateTo = v[1]
            }
          } else {
            if (v !== '') params.param[k] = v
          }
        }
      }

      callback(params)
    }
  }
}
</script>
