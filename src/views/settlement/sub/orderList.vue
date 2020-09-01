<template>
  <div class="template-main">
    <em-table-list :tableListName="'orderList'" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
  </div>
</template>
<script>
import { axiosRequestParams, isTypeof } from '@/utils/tools'
import { mapGetters } from 'vuex'

export default {
  name: 'orderList',
  data() {
    return {
      isShow: false,
      queryCustURL: {
        list: {
          url: '/settle/gas_order/list_withtime',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '加气站对账单'
      },
      axios: axiosRequestParams(this),
      queryParams: Function
    }
  },
  computed: {
    ...mapGetters({
      mode_list: 'filler_sevicePrice_mode_list',
      page_status: 'filler_account_page_status',
      page_column: 'settlement_servicePriceBill_column',
      select_list: 'filler_printList_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () { console.log(this.page_status) },
  methods: {
    onListEvent(type, row) {},
    onReqParams(type, _this, callback) {
      let params = {}
      if (type == 'list') {
        params = {
          page: _this.pages.pageNum,
          size: _this.pages.pageSize,
          param: {
            dateParam: {
              createDateFrom: '',
              createDateTo: ''
            },
            gasOrder: {
              gasstationId: this.$route.query.gasstationId
            }
          }
        }

        if (isTypeof(_this.finds) === 'object') {
          for (var [k, v] of Object.entries(_this.finds)) {
            params.param.gasOrder[k] = v
          }
        }
      }

      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
