<template>
  <div class="template-main">
    <em-table-list
      ref="tables"
      :tableListName="'refuel'"
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
      @onListEvent="onListEvent"
      @onReqParams="onReqParams"
    ></em-table-list>
  </div>
</template>
<script>
import { initVueDataOptions, callbackPagesInfo, isTypeof } from '@/utils/tools'
import { mapGetters } from 'vuex'

export default {
  name: 'DyncRefuel',
  data() {
    return initVueDataOptions(this, {
      authButtonList: null,
      queryCustURL: {
        list: {
          url: 'strategy/inventory_station_time/page',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        }
      }
    })
  },
  computed: {
    ...mapGetters({
      page_column: 'cockpit_dync_gass_column',
      mode_list: 'cockpit_dync_stevedor_mode_list',
      page_status: 'cockpit_dync_stevedor_page_status',
      select_list: 'cockpit_dync_gass_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success',
      woporg: 'woporg'
    })
  },
  created: function () {},
  mounted: function () {},
  methods: {
    onListEvent(type, row) {

    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: {} })

      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (v !== '') params.param[k] = v
        }
      }

      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
