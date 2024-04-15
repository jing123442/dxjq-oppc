<template>
  <div class="template-main">
    <table-total-data
      ref="tables1"
      :dataList="dataList"
      :rowData="totalInfo"
      :headerStyle="'top: 109px;'"
    ></table-total-data>
    <em-table-list :tableListName="'busorg'" ref="tables" :authButtonList="authButtonList" :buttonsList="buttonsList"
                   :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success"
                   :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status"
                   :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent"
                   @onReqParams="onReqParams"></em-table-list>


    <!-- 气价监控 -->
    <el-dialog :title="gasName + ' · 气价监控'" :visible.sync="dialogControlVisible" width="70%" :append-to-body="true">
      <control-info :orgId="orgId" v-if="dialogControlVisible" />
    </el-dialog>

    <!-- 盘盈亏 -->
    <el-dialog :title="gasName + ' · 盘盈亏'" :visible.sync="dialogProfitVisible" width="70%" :append-to-body="true">
      <profit-info :orgId="orgId" :menu-type="'op'" v-if="dialogProfitVisible" />
    </el-dialog>

    <!-- 经销资金 -->
    <el-dialog :title="gasName + ' · 经销资金'" :visible.sync="dialogDistributeVisible" width="70%" :append-to-body="true">
      <fund-info :orgId="orgId" type="1" v-if="dialogDistributeVisible" />
    </el-dialog>

    <!-- 直销资金 -->
    <el-dialog :title="gasName + ' · 直销资金'" :visible.sync="dialogDirectVisible" width="70%" :append-to-body="true">
      <fund-info :orgId="orgId" type="2" v-if="dialogDirectVisible" />
    </el-dialog>

    <!-- 设备监控 -->
    <el-dialog :title="gasName + ' · 设备监控'" :visible.sync="dialogDevVisible" width="70%" :append-to-body="true">
      <monitor-info :orgId="orgId" v-if="dialogDevVisible" />
    </el-dialog>

    <!-- 现场监控 -->
    <el-dialog :title="gasName + ' · 现场监控'" :visible.sync="dialogSiteVisible" width="70%" :append-to-body="true">
      <site-info :orgId="orgId" v-if="dialogSiteVisible" />
    </el-dialog>
  </div>
</template>

<script>
import { callbackPagesInfo, initVueDataOptions, isTypeof } from '@/utils/tools'
import { mapGetters } from 'vuex'
import { TableTotalData } from '@/components'
import { $strategyFlagMonitorSum } from '@/service/strategy'
import ControlInfo from '@/views/cockpit/components/controlInfo.vue'
import ProfitInfo from '@/views/cockpit/components/profitInfo.vue'
import MonitorInfo from '@/views/cockpit/components/monitorInfo.vue'
import SiteInfo from '@/views/cockpit/components/siteInfo.vue'
import FundInfo from '@/views/cockpit/components/fundInfo.vue'

export default {
  components: { FundInfo, SiteInfo, MonitorInfo, ProfitInfo, ControlInfo, TableTotalData },
  data() {
    return initVueDataOptions(this, {
      queryCustURL: {
        list: {
          url: 'strategy/flag/monitor/page',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '气价监控'
      },
      buttonsList: [{ type: 'primary', icon: '', event: 'send', name: '新卡发放' }],
      gasName: '',
      orgId: '',
      dialogControlVisible: false,
      dialogProfitVisible: false,
      dialogDistributeVisible: false,
      dialogDirectVisible: false,
      dialogDevVisible: false,
      dialogSiteVisible: false,
      dataList: [
        {
          name: '加气总量：',
          field: 'gasQty',
          unit: ' 吨'
        },
        {
          name: '加气总额：',
          field: 'gasAmount',
          unit: ' 万元'
        }
      ],
      totalInfo: { gasQty: 0, gasAmount: 0 }
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'cockpit_control_mode_list',
      page_status: 'cockpit_control_page_status',
      page_column: 'cockpit_control_column',
      select_list: 'cockpit_control_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created() {
    this.initData()
  },
  methods: {
    async initData() {},
    onListEvent(type, row) {
      this.gasName = row.nickName || '-'
      this.orgId = row.gasstationId
      if (type === 'control') {
        this.dialogControlVisible = true
      } else if (type === 'profit') {
        this.dialogProfitVisible = true
      } else if (type === 'distribute') {
        this.dialogDistributeVisible = true
      } else if (type === 'direct') {
        this.dialogDirectVisible = true
      } else if (type === 'dev') {
        this.dialogDevVisible = true
      } else if (type === 'site') {
        this.dialogSiteVisible = true
      }
    },
    afterTableData(params) {
      $strategyFlagMonitorSum(params.param).then(res => {
        this.totalInfo = res.data || {}
      })
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: {} })

      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (k === 'timeItem' && v) {
            const start = v[0].split(' ')[0]
            const end = v[1].split(' ')[0]

            params.param.dateFrom = start
            params.param.dateTo = end
          } else if (v !== '') params.param[k] = v
        }
      }

      this.afterTableData(params)
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>

<style lang="scss">
.home-page-bg {
  width: 100%;
}
</style>
