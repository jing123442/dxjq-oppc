<template>
  <div class="template-main">
    <em-table-list :tableListName="'filler'" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
  </div>
</template>
<script>
import { axiosRequestParams, queryDefaultParams } from '@/utils/tools'
import { mapGetters } from 'vuex'

export default {
  name: 'lngUpdatePrice',
  data() {
    return {
      isShow: false,
      queryCustURL: {
        list: {
          url: '/gasstation/gasstation/list_for_org',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '气价维护'
      },
      axios: axiosRequestParams(this),
      queryParams: queryDefaultParams(this, { type: 2, key: 'param', value: { orgType: 0 } })
    }
  },
  computed: {
    ...mapGetters({
      mode_list: 'filler_updatePrice_mode_list',
      page_status: 'filler_updatePrice_page_status',
      page_column: 'filler_updatePrice_column',
      select_list: 'filler_updatePrice_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () {},
  methods: {
    onListEvent(type, row) {
      if (type === 'record') {
        const gasstationId = row.gasstationId
        this.$router.push(`lngUpdatePrice/lngUpdatePriceRecord?gasstationId=${gasstationId}`)
      }
    },
    onReqParams(type, _this, callback) {
      // eslint-disable-next-line standard/no-callback-literal
      callback({
        page: 1,
        size: 10,
        param: {
          orgType: 0
        }
      })
    }
  }
}
</script>
