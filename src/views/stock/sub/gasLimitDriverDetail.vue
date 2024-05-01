<template>
  <div class="template-main">
    <em-table-list :tableListName="'gasLimitDriverDetail'" ref="tables" :authButtonList="authButtonList" :axios="axios" :buttonsList="buttonsList" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list"  @onReqParams="onReqParams"></em-table-list>
  </div>
</template>
<script>
import { initVueDataOptions, callbackPagesInfo, isTypeof } from '@/utils/tools'
import { mapGetters } from 'vuex'

export default {
  data() {
    return initVueDataOptions(this, {
      buttonsList: [],
      queryCustURL: {
        list: {
          url: 'strategy/driver_limit_log/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '加气限制'
      }
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'limit_driver_detail_mode_list',
      page_status: 'limit_driver_detail_page_status',
      page_column: 'limit_driver_detail_page_column',
      select_list: 'limit_driver_detail_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created() {
  },
  mounted: function () {
  },
  methods: {
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { } })
      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (k == 'operateTime') {
            if (_this.finds.operateTime === null) {
              params.param.dateFrom = ''
              params.param.dateTo = ''
            } else {
              params.param.dateFrom = v[0]
              params.param.dateTo = v[1]
            }
          } else {
            if (v !== '') params.param[k] = v
          }
        }
      }
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
