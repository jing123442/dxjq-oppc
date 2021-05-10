<template>
  <div class="template-main">
    <em-table-list :tableListName="'vehicleCircle'" ref="vehicleCircle" :authButtonList="authButtonList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
    <el-dialog title="圈存" :visible.sync="dialogCircleVisible" :width="add_edit_dialog" :append-to-body="true">
      <nt-form v-if="dialogCircleVisible" :rowData="circleRow" :pageColumn="page_column_circle_event" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="onListEventCircle"></nt-form>
    </el-dialog>
  </div>
</template>
<script>
import { initVueDataOptions, queryDefaultParams, callbackPagesInfo } from '@/utils/tools'
import { mapGetters } from 'vuex'
import { $orderShow, $transferOrderAdd } from '@/service/pay'

export default {
  name: 'vehicleCircle',
  data() {
    return initVueDataOptions(this, {
      queryCustURL: {
        list: {
          url: 'account/truck_account/district/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '车辆圈存'
      },
      queryParams: queryDefaultParams(this, { type: 2, key: 'param', value: { accountType: 0, orgId: this.$route.query.orgId } }),
      dialogCircleVisible: false,
      circleRow: {}
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'carrier_inventoryManager_mode_list',
      page_status: 'carrier_inventoryManager_page_status',
      page_column: 'carrier_vehicleCircle_column',
      page_column_circle_event: 'carrier_vehicleCircleEvent_column',
      select_list: 'carrier_inventoryManager_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success',
      wopuser: 'wopuser'
    })
  },
  created: function () {},
  methods: {
    onListEvent(type, row) {
      const params = {
        orgId: row.orgId,
        truckId: row.truckId
      }
      const self = this
      if (type === 'circle') {
        console.log(params)
        $orderShow(params).then(res => {
          if (res.code === 0) {
            self.circleRow = {
              orgId: self.$route.query.orgId,
              orgName: res.data.orgInfo.orgName,
              truckId: params.truckId,
              truckName: res.data.truckInfo.truckName,
              carNumber: res.data.truckInfo.carNumber,
              amount: '',
              balance: res.data.orgAccountInfo.balance,
              thuckBalance: res.data.truckAccountInfo.balance,
              creater: this.wopuser.user_id,
              createrName: this.wopuser.user_name
            }
            console.log(self.circleRow)
            self.circleRow._btn = {
              iShow: true,
              list: [{
                bType: 'primary',
                label: '确定',
                icon: ''
              }, {
                bType: 'default',
                label: '取消',
                icon: ''
              }]
            }
            self.dialogCircleVisible = true
          }
        })
      }
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { orgType: 0 } })

      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    },
    onListEventCircle(obj) {
      if (obj.label === '确定') {
        const params = { ...this.circleRow }
        const self = this
        $transferOrderAdd(params).then(res => {
          if (res.code === 0) {
            self.$message.success(res.message)
            self.dialogCircleVisible = false
            self.$refs.vehicleCircle.initDataList()
          } else {
            self.$message.error(res.message)
          }
        })
      } else {
        this.dialogCircleVisible = false
      }
    }
  }
}
</script>
