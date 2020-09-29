<template>
  <div class="template-main">
    <div v-if="tabsList.length <= 0" class="text-content">请先配置液源地</div>
    <el-tabs v-else v-model="active" type="card" @tab-click="handleClick">
      <el-tab-pane v-for="(item, index) in tabsList" :key="index" :label="item.name" :name="index.toString()">
        <em-table-list v-if="active == index && nextTick" ref="tables" :tableListName="'estimate'" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
      </el-tab-pane>
    </el-tabs>
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
import { $lngFormList, $configGasFreight } from '@/service/strategy'
import { mapGetters } from 'vuex'

export default {
  name: 'estimate',
  data() {
    return {
      active: '0',
      tabsList: [],
      nextTick: false,
      configRow: {},
      dialogConfigVisible: false,
      logRow: [],
      dialogChangeVisible: false,
      queryCustURL: {
        list: {
          url: 'strategy/freight_config/all_config',
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
      mode_list: 'price_estimate_mode_list',
      page_status: 'price_estimate_page_status',
      page_column: 'price_estimate_column',
      select_list: 'price_estimate_select_list',
      log_page_column: 'price_estimate_log_column',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    }),
    currLngForm() {
      return this.tabsList[this.active] || {}
    }
  },
  created() {
    this.initTabsData()
  },
  mounted: function () { },
  methods: {
    initTabsData() {
      $lngFormList().then(response => {
        this.tabsList = response.data
        this.initTableList()
      })
    },
    initTableList() {
      this.$nextTick(() => {
        this.nextTick = true
      })
    },
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
      this.configRow.freight = row.freight ? Number(row.freight) * 1 : 0
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
