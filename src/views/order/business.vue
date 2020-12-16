<template>
  <div class="template-main">
    <em-table-list :tableListName="'gasStockList'" ref="tables" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
    <el-dialog title="库存记录" :visible.sync="dialogRecordVisible" width="80%" :append-to-body="true">
      <em-table-list v-if="dialogRecordVisible" ref="recordList" :tableListName="'recordList'" :axios="axios" :queryCustURL="queryCustURLRecord" :responseSuccess="response_success" :queryParam="queryParamsRecord" :mode_list="mode_list" :page_status="page_status" :page_column="page_column_record" :select_list="select_list" @onReqParams="onReqParams"></em-table-list>
    </el-dialog>
    <el-dialog title="库存调整" :visible.sync="dialogUpdateStockVisible" width="80%" :append-to-body="true">
      <nt-form ref="stock" v-if="dialogUpdateStockVisible" :rowData="updateRow" :modeList="{}" :pageColumn="page_column_update" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="onFormEvent"></nt-form>
    </el-dialog>
  </div>
</template>
<script>
import { axiosRequestParams, queryDefaultParams, custFormBtnList } from '@/utils/tools'
import { $updateStock } from '@/service/strategy'
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
          url: 'strategy/stock_log/list',
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
      dialogRecordVisible: false,
      updateRow: {},
      dialogUpdateStockVisible: false
    }
  },
  computed: {
    ...mapGetters({
      mode_list: 'filler_gasStockList_mode_list',
      page_status: 'filler_gasStockList_page_status',
      page_column: 'filler_gasStockList_column',
      page_column_record: 'filler_gasStockListRecord_column',
      page_column_update: 'filler_gas_update_stock_column',
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
        this.queryParamsRecord = queryDefaultParams(this, { type: 2, key: 'param', value: { gasstationId: row.gasstationId } })
        this.dialogRecordVisible = true
      } else {
        row._btn = custFormBtnList()
        this.updateRow = row
        this.dialogUpdateStockVisible = true
      }
    },
    onFormEvent(btnObj, row) {
      if (btnObj.type == 'ok') {
        this.$refs.stock.$children[0].validate(valid => {
          if (valid) {
            const params = {
              gasstationId: row.gasstationId,
              increase: Number(row.increase)
            }

            $updateStock(params).then(res => {
              this.$message.success('成功！')

              this.$refs.tables.initDataList()
            })
          }
        })
      }
      this.dialogUpdateStockVisible = false
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
