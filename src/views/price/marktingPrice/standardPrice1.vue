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
          url: 'strategy/price_config_market/find',
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
      page_status: 'market_cost_page_status',
      page_column: 'stander_price_column',
      select_list: 'market_cost_select_list',
      response_success: 'response_success'
    })
  },
  created() { },
  mounted: function () { },
  methods: {
    onListEvent(type, row) {},
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
