<template>
  <div class="template-main">
    <div v-if="tabsList.length <= 0" class="text-content">请先配置液源地</div>
    <el-tabs v-else v-model="active" type="card" @tab-click="handleClick">
      <el-tab-pane v-for="(item, index) in tabsList" :key="index" :label="item.name" :name="index.toString()">
        <em-table-list v-if="active == index && nextTick" :tableListName="'mileage'" :authButtonList="authButtonList" :axios="axios" :buttonsList="buttonsList" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="变更记录" :visible.sync="dialogChangeVisible" :width="add_edit_dialog" :append-to-body="true">
      <em-table-list v-if="dialogChangeVisible" :custTableTitle="'变更记录'" :tableListName="'mileageLog'" :authButtonList="authButtonList" :axios="axios" :queryCustURL="queryLogCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="log_page_column" :select_list="select_list" @onReqParams="onReqParams"></em-table-list>
    </el-dialog>
  </div>
</template>
<script>
import { initVueDataOptions, isTypeof, callbackPagesInfo } from '@/utils/tools'
import { $lngFormList } from '@/service/strategy'
import { mapGetters } from 'vuex'

export default {
  name: 'mileage',
  data() {
    return initVueDataOptions(this, {
      active: '0',
      tabsList: [],
      nextTick: false,
      logRow: [],
      dialogChangeVisible: false,
      queryCustURL: {
        edit: {
          url: 'strategy/freight_config/set_miles',
          method: 'post',
          params: {
            lngFromId: ''
          }
        },
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
      }
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'price_mileage_mode_list',
      page_status: 'price_mileage_page_status',
      page_column: 'price_mileage_column',
      select_list: 'price_mileage_select_list',
      log_page_column: 'price_mileage_log_column',
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
        this.queryCustURL.edit.params.lngFromId = this.currLngForm.code
      })
    },
    onListEvent(type, row) {
      this.currRow = row
      this.dialogChangeVisible = true
    },
    handleClick(tab, event) {
      this.nextTick = false
      this.initTableList()
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { } })

      if (_this.tableListName == 'mileageLog') {
        params.param.operatorType = 0
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
