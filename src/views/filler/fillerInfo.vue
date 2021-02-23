<template>
  <div class="template-main">
    <em-table-list :tableListName="'fillerInfo'" :authButtonList="authButtonList" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
  </div>
</template>
<script>
import { initVueDataOptions, queryDefaultParams } from '@/utils/tools'
import { mapGetters } from 'vuex'

export default {
  name: 'fillerInfo',
  data() {
    return initVueDataOptions(this, {
      queryCustURL: {
        edit: {
          url: 'user/gasstation_card/update',
          method: 'post',
          rowType: true
        },
        byid: {
          url: 'user/gasstation_card/find',
          key: 'gasstationId',
          parse: ['data']
        },
        list: {
          url: 'strategy/gasstation/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '加气站列表'
      },
      queryParams: queryDefaultParams(this, { type: 2, key: 'param', value: { } })
    })
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
        this.$router.push(`fillerInfo/printerList?gasstationId=${gasstationId}&gasstationName=${gasstationName}`)
      }
    },
    onReqParams(type, _this, callback) {
      // eslint-disable-next-line standard/no-callback-literal
      callback({
        page: 1,
        size: 10,
        param: {
          orgType: 1
        }
      })
    }
  }
}
</script>
