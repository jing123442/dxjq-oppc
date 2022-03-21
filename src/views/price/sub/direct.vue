<template>
  <div class="template-main">
    <em-table-list :tableListName="'direct'" :authButtonList="authButtonList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" ref="tables" :page_status="page_status" :buttonsList="buttonsList" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>

    <el-dialog title="变更记录" :visible.sync="dialogChangeVisible" :width="add_edit_dialog" :append-to-body="true">
      <em-table-list v-if="dialogChangeVisible" :custTableTitle="'变更记录'" :tableListName="'directLog'" :authButtonList="authButtonList" :axios="axios" :queryCustURL="queryLogCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="log_page_column" :select_list="select_list" @onReqParams="onReqParams"></em-table-list>
    </el-dialog>

    <el-dialog title="特价订单" :visible.sync="dialogDirectOrderVisible" :width="add_edit_dialog" :append-to-body="true">
      <em-table-list v-if="dialogDirectOrderVisible" :custTableTitle="'特价订单列表'" :tableListName="'directOrder'" :authButtonList="authButtonList" :axios="axios" :queryCustURL="queryDirectCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="direct_mode_list" :page_status="direct_page_status" :page_column="direct_page_column" :select_list="direct_select_list" @onReqParams="onReqOrderParams"></em-table-list>
    </el-dialog>
  </div>
</template>
<script>
import { initVueDataOptions, callbackPagesInfo, isTypeof } from '@/utils/tools'
import { mapGetters } from 'vuex'

export default {
  name: 'direct',
  data() {
    return initVueDataOptions(this, {
      dialogDirectOrderVisible: false,
      dialogChangeVisible: false,
      queryCustURL: {
        add: {
          url: 'strategy/direct_sales_fee_config/add',
          method: 'post'
        },
        edit: {
          url: 'strategy/direct_sales_fee_config/update',
          method: 'post'
        },
        del: {
          url: 'strategy/direct_sales_fee_config/delete',
          name: ['nickName', 'carrierOrgName'],
          method: 'post'
        },
        list: {
          url: 'strategy/direct_sales_fee_config/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '直销加气站'
      },
      queryLogCustURL: {
        list: {
          url: 'strategy/direct_sales_fee_log/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: ''
      },
      queryDirectCustURL: {
        list: {
          url: 'settle/direct_gas_order/list_withtime',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: ''
      },
      buttonsList: [{ type: 'primary', icon: '', event: 'add', name: '新增' }, { type: 'primary', icon: '', event: 'log', name: '变更记录' }, { type: 'primary', icon: '', event: 'order', name: '特价订单' }]
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'price_listing_mode_list',
      page_status: 'price_listing_page_status',
      page_column: 'price_direct_query_column',
      select_list: 'price_direct_select_list',
      log_page_column: 'price_direct_log_select_list',
      direct_mode_list: 'price_direct_order_mode_list',
      direct_page_status: 'price_direct_order_page_status',
      direct_page_column: 'price_direct_order_query_column',
      direct_select_list: 'price_direct_order_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () {},
  methods: {
    onListEvent(type, row) {
      if (type === 'log') {
        this.dialogChangeVisible = true
      } else if (type === 'order') {
        this.dialogDirectOrderVisible = true
      } else if (type === 'url') {
        window.open(row.url)
      }
    },
    onReqOrderParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { gasOrder: { }, dateParam: { createDateFrom: '', createDateTo: '' } } })
      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (k == 'createDate') {
            if (_this.finds.createDate === null) {
              params.param.dateParam.createDateFrom = ''
              params.param.dateParam.createDateTo = ''
            } else {
              params.param.dateParam.createDateFrom = v[0]
              params.param.dateParam.createDateTo = v[1]
            }
          } else if (k == 'updateDate') {
            if (_this.finds.updateDate === null) {
              params.param.dateParam.updateDateFrom = ''
              params.param.dateParam.updateDateTo = ''
            } else {
              params.param.dateParam.updateDateFrom = v[0]
              params.param.dateParam.updateDateTo = v[1]
            }
          } else {
            if (v !== '') params.param.gasOrder[k] = v
          }
        }
      }
      callback(params)
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { } })

      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (k === 'gasstationId') {
            if (v !== '') params.param.nickName = v
          } else if (k === 'carrierOrgId') {
            if (v !== '') params.param.carrierOrgName = v
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
