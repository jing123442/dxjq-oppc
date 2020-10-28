<template>
  <div class="template-main">
    <em-table-list ref="tables" :tableListName="'vehicleManager'" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
    <el-dialog title="车辆详情" :visible.sync="dialogTruckDetailVisible" :width="add_edit_dialog">
      <nt-form v-if="dialogTruckDetailVisible" :rowData="detailRow" :pageColumn="truck_page_column" :mode-list="truck_mode_list" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success"></nt-form>
    </el-dialog>
    <el-dialog title="车辆资金归集" :visible.sync="dialogTruckCollectVisible" :width="'50%'">
      <nt-form v-if="dialogTruckCollectVisible" ref="collect" :formRef="'collectForm'" :rowData="collectRow" :pageColumn="collect_page_column" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="onListEventCollect"></nt-form>
    </el-dialog>
    <el-dialog title="绑定司机" :visible.sync="dialogTruckBindVisible" :width="'50%'">
      <nt-form v-if="dialogTruckBindVisible" ref="bind" :formRef="'bindForm'" :rowData="bindRow" :pageColumn="bind_page_column" :selectList="bindSelect" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="onListEventBind"></nt-form>
    </el-dialog>
  </div>
</template>
<script>
import { axiosRequestParams, queryDefaultParams, custFormBtnList, callbackPagesInfo } from '@/utils/tools'
import { $carrierTruckInfo, $carrierDriverList, $carrierTruckDriverAdd, $carrierTruckDriverDel } from '@/service/carrier'
import { $truckCollect } from '@/service/business'
import { mapGetters } from 'vuex'

export default {
  name: 'vehicleManager',
  data() {
    return {
      isShow: false,
      detailRow: {},
      dialogTruckDetailVisible: false,
      collectRow: {},
      dialogTruckCollectVisible: false,
      bindRow: {},
      bindSelect: {},
      dialogTruckBindVisible: false,
      queryCustURL: {
        edit: {
          url: '/carrier/truck/edit',
          method: 'post'
        },
        list: {
          url: 'carrier/truck/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '车辆管理'
      },
      axios: axiosRequestParams(this),
      bottonList: custFormBtnList(),
      queryParams: queryDefaultParams(this, { type: 2, key: 'param', value: { orgType: 0 } })
    }
  },
  computed: {
    ...mapGetters({
      mode_list: 'carrier_vehicle_mode_list',
      page_status: 'carrier_vehicle_page_status',
      page_column: 'carrier_vehicle_column',
      select_list: 'carrier_vehicle_select_list',
      truck_page_column: 'carrier_vehicle_detail_column',
      collect_page_column: 'carrier_vehicle_collect_column',
      bind_page_column: 'carrier_vehicle_bind_column',
      truck_mode_list: 'carrier_vehicle_detail_mode_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () {},
  methods: {
    onListEvent(type, row) {
      switch (type) {
        case 'detail' :
          this.truckDetail(row)
          break
        case 'money' :
          this.truckCollect(row)
          break
        case 'bind' :
          this.truckBindDriver(row)
          break
      }
    },
    truckCollect(row) {
      $carrierTruckInfo({ truckId: row.truckId }).then(response => {
        const data = response.data

        row._btn = this.bottonList
        this.$set(row, 'amount', data.balance == null ? '未绑定账户' : data.balance)
        row.balance = data.balance == null ? '未绑定账户' : data.balance
        row.balanceInfo = data.balance == null ? '未绑定账户' : '账号余额：' + data.balance + ' 元'
        this.collectRow = row
        this.dialogTruckCollectVisible = true
      })
    },
    truckDetail(row) {
      $carrierTruckInfo({ truckId: row.truckId }).then(response => {
        const truckInfo = []
        const data = response.data

        data.driverList && data.driverList.forEach(item => {
          truckInfo.push(item.userName + ' / ' + item.mobile)
        })
        row.balance = data.balance == null ? '未绑定账户' : data.balance
        row.driverInfo = truckInfo.join(' | ')
        this.detailRow = row
        this.detailRow._btn = []
        this.dialogTruckDetailVisible = true
      })
    },
    truckBindDriver(row) {
      $carrierDriverList({ page: 1, size: 100, param: { truckId: row.truckId } }).then(response => {
        const driverList = []
        const data = response.data

        data.records.forEach(item => {
          driverList.push({
            value: item.userId,
            label: item.userName + ' / ' + item.mobile
          })
        })
        this.bindSelect.driverList = driverList
        this.dialogTruckBindVisible = true
      })

      const truckInfo = []

      row._btn = this.bottonList
      row.truckDriverList && row.truckDriverList.forEach(item => {
        truckInfo.push(item.driverId)
      })
      this.$set(row, 'driverInfo', truckInfo)
      this.bindRow = row
      // this.$refs.tables.initSelectList()
    },
    onListEventBind(btnObj, row) {
      if (btnObj.type == 'ok') {
        let tmpDriverList = []
        const params = {
          orgId: row.orgId,
          truckId: row.truckId
        }

        tmpDriverList = row.truckDriverList
        row.driverInfo && row.driverInfo.forEach(driverId => {
          var isDriverFlag = true

          for (var i = 0; i < tmpDriverList.length; i++) {
            if (driverId == tmpDriverList[i].driverId) {
              isDriverFlag = false
              tmpDriverList.splice(i, 1)
            }
          }

          if (isDriverFlag) {
            this.bindSelect.driverList && this.bindSelect.driverList.forEach(item => {
              if (item.value == driverId) {
                params.driverId = driverId
                params.driverName = item.label
                this.truckBindDriverAdd(params)
              }
            })
          }
        })

        tmpDriverList.forEach(item => {
          params.driverId = item.driverId

          this.truckBindDriverDel(params)
        })

        this.$message.success('成功')
      }

      this.dialogTruckBindVisible = false
    },
    truckBindDriverAdd(params) {
      $carrierTruckDriverAdd(params).then((res) => {
        /* if (res.code == 0) {
          this.$message.success(res.message)
        } else {
          this.$message.error(res.message)
        } */
        this.$refs.tables.initDataList()
      })
    },
    truckBindDriverDel(params) {
      $carrierTruckDriverDel(params).then((res) => {
        /* if (res.code == 0) {
          this.$message.success(res.message)
        } else {
          this.$message.error(res.message)
        } */
        this.$refs.tables.initDataList()
      })
    },
    onListEventCollect(btnObj, row) {
      if (btnObj.type == 'ok') {
        if (Number(row.amount) > Number(row.balance)) {
          this.$message.error('资金归集的金额不能大于账户余额！')
          return false
        }
        this.$refs.collect.$refs.collectForm.validate((valid) => {
          if (valid) {
            const param = {
              amount: row.amount,
              carNumber: row.carNumber,
              orgId: row.orgId,
              orgName: row.orgName,
              truckId: row.truckId,
              truckName: row.truckName,
              type: 3,
              creater: row.creater,
              createrName: row.createrName
            }

            $truckCollect(param).then((res) => {
              if (res.code == 0) {
                this.$message.success(res.message)
              } else {
                this.$message.error(res.message)
              }
            })
          } else {
            console.log('error submit!!')
          }
        })
      }
      this.$refs.tables.initDataList()
      this.dialogTruckCollectVisible = false
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { orgType: 0 } })

      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
