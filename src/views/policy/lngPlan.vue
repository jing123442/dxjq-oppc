<template>
  <div class="template-main">
    <em-table-list ref="lngPlan" :tableListName="'lngPlan'" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
    <el-dialog title="订单详细信息" :visible.sync="dialogDetailVisible" :width="add_edit_dialog">
      <nt-form v-if="dialogDetailVisible" :rowData="detailRow" :pageColumn="page_column_detail" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="onListEventForm"></nt-form>
    </el-dialog>
  </div>
</template>
<script>
import { axiosRequestParams, queryDefaultParams, messageBox } from '@/utils/tools'
import { mapGetters } from 'vuex'
import { $orderConfirm, $orderCancel } from '@/service/strategy'

export default {
  name: 'lngPlan',
  data() {
    return {
      isShow: false,
      queryCustURL: {
        list: {
          url: 'strategy/purchase/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: 'LNG计划管理'
      },
      axios: axiosRequestParams(this),
      queryParams: queryDefaultParams(this, { type: 2, key: 'param', value: { purchase: {} } }),
      dialogDetailVisible: false,
      detailRow: {}
    }
  },
  computed: {
    ...mapGetters({
      mode_list: 'policy_lngPlan_mode_list',
      page_status: 'policy_lngPlan_page_status',
      page_column: 'policy_lngPlan_column',
      select_list: 'policy_lngPlan_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  mounted: function () { },
  methods: {
    onListEvent(type, row) {
      const orderId = row.id
      if (type === 'enter') {
        messageBox(this, {
          title: '提示',
          message: '确认订单？',
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
          cb: () => {
            return $orderConfirm({ id: orderId }).then((response) => {
              return response
            })
          },
          renderList: (self) => { self.$refs.lngPlan.initDataList() }
        })
      } else if (type === 'cancel') {
        messageBox(this, {
          title: '提示',
          message: '确认取消计划？',
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
          cb: () => {
            return $orderCancel({ id: orderId }).then((response) => {
              return response
            })
          },
          renderList: (self) => { self.$refs.lngPlan.initDataList() }
        })
      } else if (type === 'detail') {
        this.detailEvent(row)
      }
    },
    detailEvent(row) {
      this.dialogDetailVisible = true
      this.detailRow = row
      this.detailRow._btn = {
        iShow: true,
        list: [{
          bType: 'primary',
          label: '确定',
          icon: ''
        }]
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
