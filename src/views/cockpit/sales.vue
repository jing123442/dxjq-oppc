<template>
  <div class="template-main">
    <el-tabs v-model="active" type="card" @tab-click="handleClick">
      <el-tab-pane label="今日实时" name="0">
        <em-table-list v-if="active == 0" ref="tables" :tableListName="'timeday'" :custTableTitle="custTodayTableTitle" :authButtonList="authButtonList" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :composeParam="composeParam" :rowKey="'name'" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :options="{ lazy: true }" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams" @updateColumnValue="updateColumnValue"></em-table-list>
      </el-tab-pane>
      <el-tab-pane label="历史时段" name="1">
        <em-table-list v-if="active == 1" ref="tables" :tableListName="'timehistory'" :custTableTitle="custYesterdayTableTitle" :authButtonList="authButtonList" :buttonsList="buttonsHistoryList" :axios="axios" :queryCustURL="queryHistoryCustURL" :composeParam="composeParam" :rowKey="'name'" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_history_status" :page_column="mode_history_list" :options="{ lazy: true }" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { initVueDataOptions, isTypeof, formateTData, exportBlobToFiles } from '@/utils/tools'
import { $settleGasstationCurrentSales, $settleGasstationHistorySales } from '@/service/settle'
import { mapGetters } from 'vuex'

export default {
  name: 'salestime',
  data() {
    return initVueDataOptions(this, {
      active: 0,
      queryCustURL: {
        list: {
          url: 'settle/gasstation_monitor/full_district_list',
          method: 'post',
          parse: {
            tableData: ['data']
          },
          tree: {
            key: 'districtId'
          }
        },
        children: {
          url: 'settle/gasstation_monitor/district_gasstation_list',
          method: 'post',
          props: {
            districtId: 'districtId',
            queryDateTime: 'dateTime'
          },
          parse: {
            tableData: ['data']
          },
          tree: {
            key: 'districtId'
          }
        },
        name: '监控'
      },
      queryHistoryCustURL: {
        list: {
          url: 'settle/gasstation_monitor/histroy_full_district_list',
          method: 'post',
          parse: {
            tableData: ['data']
          },
          tree: {
            key: 'districtId'
          }
        },
        children: {
          url: 'settle/gasstation_monitor/histroy_district_gasstation_list',
          method: 'post',
          props: {
            districtId: 'districtId'
          },
          parse: {
            tableData: ['data']
          },
          tree: {
            key: 'districtId'
          }
        },
        name: '监控'
      },
      composeParam: ['districtName'],
      custTodayTableTitle: '今日实时',
      custYesterdayTableTitle: '历史时段',
      buttonsList: [{ type: 'primary', icon: '', event: 'query', name: '查询' }, { type: 'primary', icon: '', event: 'export', name: '导出' }],
      buttonsHistoryList: [{ type: 'primary', icon: '', event: 'his_export', name: '导出' }],
      page_history_status: 1,
      initHistoryStatus: true
    })
  },
  computed: {
    ...mapGetters({
      page_column: 'cockpit_sales_column',
      mode_list: 'cockpit_sales_mode_list',
      mode_history_list: 'cockpit_history_column',
      page_status: 'cockpit_sales_page_status',
      select_list: 'cockpit_sales_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success',
      woporg: 'woporg'
    })
  },
  created: function () {
    console.log(formateTData(1619156080000, 'all'))
  },
  mounted: function () {},
  methods: {
    onListEvent(type, row) {
      if (type == 'query') {
        this.$refs.tables.initDataList()
      } else if (type === 'export') {
        $settleGasstationCurrentSales({ queryDateTime: this.currDataTime }).then(response => {
          const fileName = '实时销量监控数据' + Date.parse(new Date()) + '.xls'
          exportBlobToFiles(response, fileName)
          this.$message.success('下载成功')
        })
      } else if (type === 'his_export') {
        $settleGasstationHistorySales({ dateTimeFrom: this.currDataTime.dateTimeFrom, dateTimeTo: this.currDataTime.dateTimeTo }).then(response => {
          const fileName = '历史销量监控数据' + Date.parse(new Date()) + '.xls'
          exportBlobToFiles(response, fileName)
          this.$message.success('下载成功')
        })
      }
    },
    handleClick() {
      this.initHistoryStatus = true
      this.page_history_status = 1
    },
    resetTitleName(timestamp, datetime) {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        timestamp = Number(timestamp) + 1000
        this.custTodayTableTitle = '今日实时【' + datetime + '】 ' + formateTData(timestamp, 'all')
      }, 1000)
    },
    updateColumnValue(dataList, callback) {
      this.currDataTime = dataList[0].dateTime

      this.custTodayTableTitle = '今日实时【' + dataList[0].queryDateTime + '】 ' + this.currDataTime
      this.resetTitleName(Date.parse(this.currDataTime), dataList[0].queryDateTime)
      // eslint-disable-next-line standard/no-callback-literal
      callback(dataList)
    },
    reloadHistoryTable(_this) {
      if (this.initHistoryStatus) {
        if (_this.tableListName === 'timehistory') {
          if (_this.finds.queryDateTime) {
            this.page_history_status = 13
            this.timers = setTimeout(() => {
              this.initHistoryStatus = false
              this.$refs.tables.initDataList()
            }, 100)
          }
        }
      } else {
        clearTimeout(this.timers)
      }
    },
    onReqParams(type, _this, callback) {
      const params = { }

      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (k == 'queryDateTime') {
            if (_this.finds.queryDateTime) {
              params.dateTimeFrom = v[0]
              params.dateTimeTo = v[1]
            }
          }
        }
      }

      this.reloadHistoryTable(_this)
      if (_this.tableListName === 'timehistory') {
        if (Object.keys(params).length === 0) {
          const tmpTimes = formateTData(new Date())
          params.dateTimeFrom = tmpTimes
          params.dateTimeTo = tmpTimes
        }
        this.currDataTime = params
      }
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
