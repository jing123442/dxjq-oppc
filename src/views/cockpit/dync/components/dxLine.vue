<template>
  <div class="template-main">
    <table-total-data
        ref="tables1"
        :dataList="dataList"
        :rowData="totalInfo"
        :headerStyle="'top: 109px;'"
    ></table-total-data>
    <em-table-list
        ref="dxLine"
        :tableListName="'dxLine'"
        :authButtonList="authButtonList"
        :buttonsList="buttonsList"
        :axios="axios"
        :queryCustURL="queryCustURL"
        :responseSuccess="response_success"
        :queryParam="queryParams"
        :mode_list="mode_list"
        :page_status="page_status"
        :page_column="page_column"
        :options="{ lazy: true }"
        :select_list="select_list"
        @afterTableData="afterTableData"
        @onListEvent="onListEvent"
        @onReqParams="onReqParams"
    ></em-table-list>
  </div>
</template>
<script>
import { callbackPagesInfo, initVueDataOptions, isTypeof } from '@/utils/tools'
import { mapGetters } from 'vuex'
import { TableTotalData } from '@/components'

export default {
  name: 'DxLine',
  components: { TableTotalData },
  props: {
    stationId: {
      type: String,
      required: true
    }
  },
  data() {
    return initVueDataOptions(this, {
      updateTime: '',
      showImport: 0,
      authButtonList: null,
      queryCustURL: {
        list: {
          url: 'strategy/inventory_out_auyen/get_out_auyen',
          method: 'post',
          parse: {
            tableData: ['data', 'page', 'records'],
            totalCount: ['data', 'page', 'total']
          }
        }
      },
      dataList: [
        {
          name: '加气总量：',
          field: 'loadQty',
          unit: ' 公斤'
        },
        {
          name: '加气总额：',
          field: 'buyCost',
          unit: ' 元'
        }
      ],
      totalInfo: { loadQty: 0, buyCost: 0, inQty: 0, inCost: 0 }
    })
  },
  watch: {
    stationId() {
      this.$refs.dxLine.initDataList()
    }
  },
  computed: {
    ...mapGetters({
      page_column: 'cockpit_dync_entrain_dx_column',
      mode_list: 'cockpit_dync_stevedor_mode_list',
      page_status: 'cockpit_dync_stevedor_page_status',
      select_list: 'cockpit_dync_entrain_dx_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success',
      woporg: 'woporg'
    })
  },
  created: function () {},
  mounted: function () {},
  methods: {
    onListEvent(type, row) {},
    afterTableData(res) {
      const { page, ...dataInfo } = res.data
      this.totalInfo = dataInfo || {}
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { dateParam: {} } })

      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (v && k === 'createDate') {
            params.param.dateParam.createDateFrom = v[0]
            params.param.dateParam.createDateTo = v[1]
          } else if (v && k === 'updateDate') {
            params.param.dateParam.updateDateFrom = v[0]
            params.param.dateParam.updateDateTo = v[1]
          } else {
            if (v !== '') params.param[k] = v
          }
        }
      }

      params.param.gasstationId = this.stationId // 对应加气站

      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
