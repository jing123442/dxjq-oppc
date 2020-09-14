<template>
  <div class="template-main">
    <em-table-list ref="tables" :tableListName="'profit'" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
    <el-dialog title="配置" :visible.sync="dialogConfigVisible" width="50%">
      <nt-form v-if="dialogConfigVisible" ref="config" :formRef="'configForm'" :rowData="configRow" :pageColumn="page_column" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="onListEventConfig"></nt-form>
    </el-dialog>
    <el-dialog title="变更记录" :visible.sync="dialogChangeVisible" :width="add_edit_dialog">
      <em-table-list v-if="dialogChangeVisible" :tableListName="'estimateLog'" :axios="axios" :queryCustURL="queryLogCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="log_page_column" :select_list="select_list" @onReqParams="onReqParams"></em-table-list>
    </el-dialog>
  </div>
</template>
<script>
import { axiosRequestParams, callbackPagesInfo, custFormBtnList, isTypeof } from '@/utils/tools'
import { $configGasFreight } from '@/service/strategy'
import { mapGetters } from 'vuex'

export default {
  name: 'profit',
  data() {
    return {
      configRow: {},
      dialogConfigVisible: false,
      logRow: [],
      dialogChangeVisible: false,
      queryCustURL: {
        list: {
          url: 'strategy/profit_quota_log/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: ''
      },
      queryLogCustURL: {
        list: {
          url: 'strategy/freight_config_log/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: ''
      },
      axios: axiosRequestParams(this),
      queryParams: Function
    }
  },
  computed: {
    ...mapGetters({
      mode_list: 'market_profit_mode_list',
      page_status: 'market_profit_page_status',
      page_column: 'market_profit_column',
      select_list: 'market_profit_select_list',
      log_page_column: 'market_profit_log_column',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created() {},
  mounted: function () { },
  methods: {
    onListEvent(type, row) {
      switch (type) {
        case 'config':
          this.configInfo(row)
          break
        case 'change':
          this.logChangeInfo(row)
          break
      }
    },
    configInfo(row) {
      this.configRow = Object.assign({}, row)
      this.configRow.freight = row.freight ? Number(row.freight) * 1000 : 0
      this.configRow._btn = custFormBtnList()
      this.dialogConfigVisible = true
    },
    onListEventConfig(btnObj, row) {
      if (btnObj.type == 'ok') {
        this.$refs.config.$refs.configForm.validate((valid) => {
          if (valid) {
            const params = {
              gasstationId: row.gasstationId,
              lngFromId: row.lngFromId,
              freight: row.freight
            }

            $configGasFreight(params).then((res) => {
              this.$message.success(res.message)

              this.$refs.tables[0].initDataList()
            })
          } else {
            console.log('error submit!!')
          }
        })
      }
      this.dialogConfigVisible = false
    },
    logChangeInfo(row) {
      this.currRow = row
      this.dialogChangeVisible = true
    },
    handleClick(tab, event) {
      this.nextTick = false
      this.initTableList()
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { } })

      if (_this.tableListName == 'estimateLog') {
        params.param.operatorType = 1
        params.param.gasstationId = this.currRow.gasstationId
      } else {
        params.param.lngFromId = this.currLngForm.code
      }
      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          params.param[k] = v
        }
      }
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
