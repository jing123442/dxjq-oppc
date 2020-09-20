<template>
  <div class="template-main">
    <em-table-list :tableListName="'gasStockList'" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
    <el-dialog title="入库记录" :visible.sync="dialogRecordVisible" :width="add_edit_dialog">
      <em-table-list v-if="dialogRecordVisible" ref="recordList" :tableListName="'recordList'" :axios="axios" :queryCustURL="queryCustURLRecord" :responseSuccess="response_success" :queryParam="queryParamsRecord" :mode_list="mode_list" :page_status="page_status" :page_column="page_column_record" :select_list="select_list" @onReqParams="onReqParams"></em-table-list>
    </el-dialog>
  </div>
</template>
<script>
import { axiosRequestParams, queryDefaultParams } from '@/utils/tools'
import { mapGetters } from 'vuex'

export default {
  name: 'gasStockList',
  data() {
    return {
      queryCustURL: {
        list: {
          url: 'strategy/gasstation/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '加气站库存查询'
      },
      queryCustURLRecord: {
        list: {
          url: 'strategy/purchase/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '入库记录'
      },
      axios: axiosRequestParams(this),
      queryParams: queryDefaultParams(this, { type: 2, key: 'param', value: { orgType: 0 } }),
      queryParamsRecord: '',
      dialogRecordVisible: false
    }
  },
  computed: {
    ...mapGetters({
      mode_list: 'filler_gasStockList_mode_list',
      page_status: 'filler_gasStockList_page_status',
      page_column: 'filler_gasStockList_column',
      page_column_record: 'filler_gasStockListRecord_column',
      select_list: 'filler_gasStockList_select_list',
      add_edit_dialog: 'dialog_table',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () {},
  methods: {
    onListEvent(type, row) {
      if (type === 'record') {
        // this.gasstationId = row.gasstationId
        this.queryParamsRecord = ''
        this.queryParamsRecord = queryDefaultParams(this, { type: 2, key: 'param', value: { purchase: { gasstationId: row.gasstationId, status: 5 } } })
        this.dialogRecordVisible = true
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
    }
  }
}
</script>
