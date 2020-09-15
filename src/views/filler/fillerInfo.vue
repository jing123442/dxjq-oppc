<template>
  <div class="template-main">
    <em-table-list :tableListName="'fillerInfo'" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
  </div>
</template>
<script>
import { axiosRequestParams, queryDefaultParams } from '@/utils/tools'
import { mapGetters } from 'vuex'

export default {
  name: 'fillerInfo',
  data() {
    return {
      isShow: false,
      queryCustURL: {
        edit: {
          url: '/gasstation/gasstation/edit',
          method: 'post'
        },
        list: {
          url: '/gasstation/gasstation/list_for_org',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '加气站列表'
      },
      buttonsList: [],
      axios: axiosRequestParams(this),
      queryParams: queryDefaultParams(this, { type: 2, key: 'param', value: { orgType: 1 } })
    }
  },
  computed: {
    ...mapGetters({
      mode_list: 'filler_info_mode_list',
      page_status: 'filler_info_page_status',
      page_column: 'filler_info_column',
      select_list: 'filler_info_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () {},
  methods: {
    onListEvent(type, row) {
      if (type === 'printer') {
        const gasstationId = row.gasstationId
        const gasstationName = row.gasstationName
        this.$router.push(`lngStationsList/printerList?gasstationId=${gasstationId}&gasstationName=${gasstationName}`)
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
