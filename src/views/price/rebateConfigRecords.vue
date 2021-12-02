<template>
  <div class="rebate-config-records template-main">
    <em-table-list :tableListName="'carrierRebate'" :authButtonList="authButtonList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" ref="tables" :page_status="page_status" :buttonsList="buttonsList" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
  </div>
</template>
<script>
import { initVueDataOptions, custFormBtnList, callbackPagesInfo, isTypeof } from '@/utils/tools'
import { mapGetters } from 'vuex'
export default {
  data() {
    return initVueDataOptions(this, {
      queryCustURL: {
        list: {
          url: 'strategy/carrier_rebate_log/page',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '配置记录'
      },
      buttonsList: [],
      formBtnList: custFormBtnList()
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'rebate_config_records_mode_list',
      page_status: 'rebate_config_records_page_status',
      page_column: 'rebate_config_records_column',
      select_list: 'rebate_config_records_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  methods: {
    onListEvent(type, row) {
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { } })
      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (k == 'updateDate') {
            if (_this.finds.updateDate === null) {
              params.param.updateDateFrom = ''
              params.param.updateDateTo = ''
            } else {
              params.param.updateDateFrom = v[0]
              params.param.updateDateTo = v[1]
            }
          } else {
            if (v !== '') {
              params.param[k] = v
            }
          }
        }
      }
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
