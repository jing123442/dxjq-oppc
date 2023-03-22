<template>
  <div class="template-main">
    <em-table-list :tableListName="'cost'" :authButtonList="authButtonList" :axios="axios" :buttonsList="buttonsList" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>

  </div>
</template>
<script>
import { initVueDataOptions, callbackPagesInfo } from '@/utils/tools'
import { mapGetters } from 'vuex'

export default {
  name: 'cost',
  data() {
    return initVueDataOptions(this, {
      buttonsList: [],
      queryCustURL: {
        list: {
          url: 'strategy/price_config_market/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '长城奥扬费用'
      }
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'market_cost_mode_list',
      page_status: 'sale_price_status',
      page_column: 'sale_price_column',
      select_list: 'sale_price_select',
      response_success: 'response_success'
    })
  },
  created() { },
  mounted: function () { },
  methods: {
    onListEvent(type, row) {
      console.log('type', type)
    },
    handleClick(tab, event) {
      this.nextTick = false
      this.initTableList()
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this))

      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
