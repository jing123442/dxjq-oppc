<template>
  <div class="template-main">
    <em-table-list :tableListName="'carrier'" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>

    <el-dialog title="物流公司详情" :visible.sync="dialogDetailVisible" :width="add_edit_dialog">
      <nt-form v-if="dialogDetailVisible" :rowData="detailRow" :pageColumn="page_column_detail" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success"  @reload="initDataList" @clear="subClearBtn"></nt-form>
    </el-dialog>
 </div>
</template>
<script>
import { axiosRequestParams, queryDefaultParams } from '@/utils/tools'
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
          method: 'post'
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
      queryParams: queryDefaultParams(this, { type: 2, key: 'param', value: { orgType: 0 } }),
      dialogDetailVisible: false,
      detailRow: {}
    }
  },
  computed: {
    ...mapGetters({
      mode_list: 'carrier_logistics_mode_list',
      page_status: 'carrier_logistics_page_status',
      page_column: 'carrier_logistics_column',
      page_column_detail: 'carrier_logisticsDetail_column',
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
        this.formAddCar.orgId = row.orgId
        this.formAddCar.orgName = row.orgName
        this.dialogAddCarVisible = true
      } else if (type === 'detail') {
        this.dialogDetailVisible = true
        this.detailRow = row
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
    dialogAddCarConfirm(formData) {
      var self = this
      this.$refs.formAddCar.validate((valid) => {
        console.log(valid)
        if (valid) {
          console.log('添加成功', this.formAddCar)
          this.dialogAddCarVisible = false
          $carrierTruckAdd(this.formAddCar).then((res) => {
            if (res.code == 0) {
              self.$message({
                message: res.message,
                type: 'success'
              })
            } else {
              self.$message.error(res.message)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    initDataList() {},
    subClearBtn() {}
  }
}
</script>
