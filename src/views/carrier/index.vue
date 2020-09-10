<template>
  <div class="template-main">
    <em-table-list :tableListName="'carrier'" ref="carrier" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>

    <el-dialog title="物流公司详情" :visible.sync="dialogDetailVisible" :width="add_edit_dialog">
      <nt-form v-if="dialogDetailVisible" :rowData="detailRow" :pageColumn="page_column_detail" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success"></nt-form>
    </el-dialog>

     <el-dialog title="添加车辆" :visible.sync="dialogAddCarVisible" :width="add_edit_dialog">
      <nt-form v-if="dialogAddCarVisible" ref="addCar" :rowData="addCarRow" :pageColumn="page_column_addCar" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="onListEventAddCar"></nt-form>
    </el-dialog>
 </div>
</template>
<script>
import { axiosRequestParams, queryDefaultParams, createParams, callbackPagesInfo } from '@/utils/tools'
import { mapGetters } from 'vuex'
import {
  $carrierTruckAdd
} from '@/service/carrier.js'

export default {
  name: 'carrier',
  data() {
    return {
      isShow: false,
      queryCustURL: {
        add: {
          url: '/user/org/add',
          method: 'post',
          params: {
            orgType: 2,
            ...createParams()
          }
        },
        edit: {
          url: '/user/org/edit',
          method: 'post'
        },
        list: {
          url: 'user/org/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '物流公司'
      },
      buttonsList: [{ type: 'primary', icon: '', event: 'add', name: '添加公司' }],
      axios: axiosRequestParams(this),
      queryParams: queryDefaultParams(this, { type: 2, key: 'param', value: { orgType: 2 } }),
      dialogDetailVisible: false,
      detailRow: {},
      dialogAddCarVisible: false,
      addCarRow: {}
    }
  },
  computed: {
    ...mapGetters({
      mode_list: 'carrier_logistics_mode_list',
      page_status: 'carrier_logistics_page_status',
      page_column: 'carrier_logistics_column',
      page_column_detail: 'carrier_logisticsDetail_column',
      page_column_addCar: 'carrier_addCar_column',
      select_list: 'carrier_logistics_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () {},
  methods: {
    onListEvent(type, row) {
      row._btn = {}
      if (type === 'addCar') {
        // 添加车辆
        this.addCarEvent(row)
      } else if (type === 'detail') {
        this.dialogDetailVisible = true
        this.detailRow = row
      }
    },
    addCarEvent(row) {
      this.addCarRow._btn = {
        iShow: true,
        list: [
          {
            bType: 'primary',
            label: '确定',
            icon: ''
          },
          {
            bType: 'default',
            label: '取消',
            icon: ''
          }
        ]
      }
      this.addCarRow.orgId = row.orgId
      this.addCarRow.orgName = row.orgName
      this.dialogAddCarVisible = true
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { orgType: 0 } })

      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    },
    onListEventAddCar(obj) {
      if (obj.label === '确定') {
        const self = this
        this.$refs.addCar.$children[0].validate(valid => {
          if (valid) {
            const params = {
              ...createParams(),
              ...self.addCarRow,
              purchaseDate: self.addCarRow.purchaseDate.split(' ')[0],
              engineNumber: ''
            }
            delete params._btn
            $carrierTruckAdd(params).then(res => {
              if (res.code === 0) {
                self.$message.success(res.message)
                self.$refs.carrier.initDataList()
                self.dialogAddCarVisible = false
              } else {
                self.$message.error(res.message)
                self.dialogAddCarVisible = false
              }
            })
          }
        })
      } else {
        this.dialogAddCarVisible = false
      }
    }
  }
}
</script>
