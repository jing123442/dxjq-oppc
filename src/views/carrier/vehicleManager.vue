<template>
  <div class="template-main">
    <em-table-list ref="tables" :tableListName="'vehicleManager'" :authButtonList="authButtonList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
    <el-dialog title="车辆资金归集" :visible.sync="dialogTruckCollectVisible" :width="'50%'" :append-to-body="true">
      <nt-form v-if="dialogTruckCollectVisible" ref="collect" :formRef="'collectForm'" :rowData="collectRow" :pageColumn="collect_page_column" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="onListEventCollect"></nt-form>
    </el-dialog>
    <el-dialog title="绑定司机" :visible.sync="dialogTruckBindVisible" :width="'50%'" :append-to-body="true">
      <nt-form v-if="dialogTruckBindVisible" ref="bind" :formRef="'bindForm'" :rowData="bindRow" :pageColumn="bind_page_column" :selectList="bindSelect" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="onListEventBind"></nt-form>
    </el-dialog>
  </div>
</template>
<script>
import { initVueDataOptions, queryDefaultParams, callbackPagesInfo } from '@/utils/tools'
import { $strategyTruckInfo, $strategyDriverList, $strategyTruckDriverAdd, $strategyTruckDriverDel } from '@/service/strategy'
import { $truckCollect } from '@/service/pay'
import { mapGetters } from 'vuex'

export default {
  name: 'vehicleManager',
  data() {
    return initVueDataOptions(this, {
      collectRow: {},
      dialogTruckCollectVisible: false,
      bindRow: {},
      bindSelect: {},
      dialogTruckBindVisible: false,
      queryCustURL: {
        edit: {
          url: 'strategy/truck/edit',
          method: 'post'
        },
        detail: {
          extend: {
            url: 'account/truck_account/get_balance',
            key: 'truckId',
            method: 'post',
            parse: ['data'],
            extendLabel: [{ key: 'balance', label: 'balance' }]
          }
        },
        list: {
          url: 'strategy/truck/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '车辆管理'
      },
      queryParams: queryDefaultParams(this, { type: 2, key: 'param', value: { orgType: 0 } })
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'carrier_vehicle_mode_list',
      page_status: 'carrier_vehicle_page_status',
      page_column: 'carrier_vehicle_column',
      select_list: 'carrier_vehicle_select_list',
      collect_page_column: 'carrier_vehicle_collect_column',
      bind_page_column: 'carrier_vehicle_bind_column',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () {},
  methods: {
    onListEvent(type, row) {
      switch (type) {
        case 'money' :
          this.truckCollect(row)
          break
        case 'bind' :
          this.truckBindDriver(row)
          break
      }
    },
    truckCollect(row) {
      $strategyTruckInfo({ truckId: row.truckId }).then(response => {
        const data = response.data

        row._btn = this.formBtnList
        this.$set(row, 'amount', data.balance == null ? '未绑定账户' : data.balance)
        row.balance = data.balance == null ? '未绑定账户' : data.balance
        row.balanceInfo = data.balance == null ? '未绑定账户' : '账号余额：' + data.balance + ' 元'
        this.collectRow = row
        this.dialogTruckCollectVisible = true
      })
    },
    truckBindDriver(row) {
      $strategyDriverList({ page: 1, size: 100, param: { truckId: row.truckId } }).then(response => {
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

      row._btn = this.formBtnList
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
                var tmpParams = Object.assign({}, params)

                tmpParams.driverId = driverId
                tmpParams.driverName = item.label
                this.truckBindDriverAdd(tmpParams)
              }
            })
          }
        })

        tmpDriverList.forEach(item => {
          var tmpParams = Object.assign({}, params)
          tmpParams.driverId = item.driverId

          this.truckBindDriverDel(tmpParams)
        })

        this.$message.success('成功')
        this.$refs.tables.initDataList()
      }

      this.dialogTruckBindVisible = false
    },
    truckBindDriverAdd(params) {
      $strategyTruckDriverAdd(params).then((res) => {
        /* if (res.code == 0) {
          this.$message.success(res.message)
        } else {
          this.$message.error(res.message)
        } */
        // this.$refs.tables.initDataList()
      })
    },
    truckBindDriverDel(params) {
      $strategyTruckDriverDel(params).then((res) => {
        /* if (res.code == 0) {
          this.$message.success(res.message)
        } else {
          this.$message.error(res.message)
        } */
        // this.$refs.tables.initDataList()
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
