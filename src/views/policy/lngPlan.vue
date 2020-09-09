<template>
  <div class="template-main">
    <em-table-list ref="lngPlan" :tableListName="'lngPlan'" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
    <el-dialog title="订单详细信息" :visible.sync="dialogDetailVisible" :width="add_edit_dialog">
      <nt-form v-if="dialogDetailVisible" :rowData="detailRow" :pageColumn="page_column_detail" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="onListEventDetail"></nt-form>
    </el-dialog>
    <el-dialog title="出港信息录入" :visible.sync="dialogDeparturesVisible" :width="add_edit_dialog">
      <nt-form v-if="dialogDeparturesVisible" ref="departures" :formRef="'departuresForm'" :rowData="departuresRow" :pageColumn="page_column_departures" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="onListEventDetail"></nt-form>
    </el-dialog>
    <el-dialog title="确认信息" :visible.sync="dialogCompleteVisible" :width="add_edit_dialog">
      <nt-form v-if="dialogCompleteVisible" ref="complete" :formRef="'completeForm'" :rowData="completeRow" :pageColumn="page_column_complete" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="onListEventComplete"></nt-form>
    </el-dialog>
  </div>
</template>
<script>
import { axiosRequestParams, queryDefaultParams, messageBox } from '@/utils/tools'
import { mapGetters } from 'vuex'
import { $orderConfirm, $orderCancel, $purchaseLeave, $purchaseComplete } from '@/service/strategy'

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
      detailRow: {},
      dialogDeparturesVisible: false,
      departuresRow: {},
      dialogCompleteVisible: false,
      completeRow: {}
    }
  },
  computed: {
    ...mapGetters({
      mode_list: 'policy_lngPlan_mode_list',
      page_status: 'policy_lngPlan_page_status',
      page_column: 'policy_lngPlan_column',
      page_column_detail: 'policy_lngPlanDetail_column',
      page_column_departures: 'policy_lngPlanDepartures_column',
      page_column_complete: 'policy_lngPlanComplete_column',
      select_list_departures: 'policy_lngPlanDepartures_select_list',
      select_list: 'policy_lngPlan_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  mounted: function () { },
  methods: {
    onListEvent(type, row) {
      console.log(type)
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
      } else if (type === 'write') {
        this.departuresEvent(row)
      } else if (type === 'complete') {
        this.completeEvent(row)
      }
    },
    departuresEvent(row) {
      this.dialogDeparturesVisible = true
      this.departuresRow = row
      this.departuresRow._btn = {
        iShow: true,
        list: [{
          bType: 'primary',
          label: '确定',
          type: 'ok',
          icon: ''
        }, {
          bType: 'default',
          label: '取消',
          type: 'cancel',
          icon: ''
        }]
      }
    },
    completeEvent(row) {
      this.dialogCompleteVisible = true
      this.completeRow = row
      this.completeRow._btn = {
        iShow: true,
        list: [{
          bType: 'primary',
          label: '确定',
          type: 'ok',
          icon: ''
        }, {
          bType: 'default',
          label: '取消',
          type: 'cancel',
          icon: ''
        }]
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
    },
    onListEventDetail(btnObj, row) {
      if (btnObj.type === 'ok') {
        this.$refs.departures.$refs.departuresForm.validate((valid) => {
          if (valid) {
            const params = {
              id: row.id,
              uploadUrl: row.uploadUrl[0].url,
              uploadWeight: row.uploadWeight,
              lngFromCode: row.lngFromCode,
              lngFromName: row.lngFromName
            }

            $purchaseLeave(params).then(response => {
              if (response.code == 0) {
                this.$message.success('成功!')
              } else {
                this.$message.error('失败!')
              }

              this.$refs.lngPlan.initDataList()
            })
          } else {
            console.log('error submit!!')
          }
        })
      }
      this.dialogDeparturesVisible = false
    },
    onListEventComplete(btnObj, row) {
      if (btnObj.type === 'ok') {
        this.$refs.complete.$refs.completeForm.validate((valid) => {
          if (valid) {
            const params = {
              id: row.id,
              downloadWeight: row.downloadWeight
            }

            $purchaseComplete(params).then(response => {
              if (response.code == 0) {
                this.$message.success('成功!')
              } else {
                this.$message.error('失败!')
              }

              this.$refs.lngPlan.initDataList()
            })
          } else {
            console.log('error submit!!')
          }
        })
      }
      this.dialogCompleteVisible = false
    }
  }
}
</script>
