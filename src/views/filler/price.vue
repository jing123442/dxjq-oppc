<template>
  <div class="template-main">
    <em-table-list :tableListName="'fillerPrice'" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>

    <el-dialog title="变更记录" :visible.sync="dialogChangeVisible" :width="add_edit_dialog">
      <em-table-list v-if="dialogChangeVisible" :tableListName="'priceLog'" :axios="axios" :queryCustURL="queryLogCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="log_page_column" :select_list="select_list" @onReqParams="onReqParams"></em-table-list>
    </el-dialog>
  </div>
</template>
<script>
import { axiosRequestParams, callbackPagesInfo, isTypeof } from '@/utils/tools'
import { mapGetters } from 'vuex'

export default {
  name: 'fillerPrice',
  data() {
    return {
      isShow: false,
      logRow: [],
      dialogChangeVisible: false,
      queryCustURL: {
        list: {
          url: 'strategy/gasstation/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '加气站挂牌价查询'
      },
      queryLogCustURL: {
        list: {
          url: 'strategy/list_price_log/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '加气站挂牌价查询'
      },
      axios: axiosRequestParams(this),
      queryParams: Function
    }
  },
  computed: {
    ...mapGetters({
      mode_list: 'filler_price_mode_list',
      page_status: 'filler_price_page_status',
      page_column: 'filler_price_column',
      select_list: 'filler_price_select_list',
      log_page_column: 'filler_price_log_column',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () {},
  methods: {
    onListEvent(type, row) {
      if (type === 'record') {
        this.currRow = row
        this.dialogChangeVisible = true
      }
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { } })

      if (_this.tableListName == 'priceLog') {
        params.param.gasstationId = this.currRow.gasstationId
      }
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
