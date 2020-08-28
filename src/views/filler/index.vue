<template>
  <div class="template-main">
    <em-table-list ref="gasList" :tableListName="'filler'" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
    <el-dialog title="添加加气站" :visible.sync="dialogAddGasStationVisible" :width="add_edit_dialog">
      <nt-form ref="addGap" v-if="dialogAddGasStationVisible" :rowData="gasStationRow" :modeList="mode_list_addGasStation" :pageColumn="page_column_addGasStation" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="onListEventAddGasStation"></nt-form>
    </el-dialog>
  </div>
</template>
<script>
import { axiosRequestParams, queryDefaultParams } from '@/utils/tools'
import { mapGetters } from 'vuex'
import { $gasStationAdd } from '@/service/gasstation'
import { CodeToText } from 'element-china-area-data'

export default {
  name: 'filler',
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
        name: '加气站企业'
      },
      buttonsList: [{ type: 'primary', icon: 'el-icon-plus', event: 'add', name: '增加企业' }],
      axios: axiosRequestParams(this),
      queryParams: queryDefaultParams(this, { type: 2, key: 'param', value: { orgType: 1 } }),
      dialogAddGasStationVisible: false,
      gasStationRow: {}
    }
  },
  computed: {
    ...mapGetters({
      mode_list: 'filler_firmList_mode_list',
      mode_list_addGasStation: 'filler_addGasStation_mode_list',
      page_status: 'filler_firmList_page_status',
      page_column: 'filler_firmList_column',
      page_column_addGasStation: 'filler_addGasStation_column',
      select_list: 'filler_firmList_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () {},
  methods: {
    onListEvent(type, row) {
      if (type === 'addGas') {
        this.dialogAddGasStationVisible = true
        this.gasStationRow = row
        this.gasStationRow._btn = {
          iShow: true,
          list: [{
            bType: 'primary',
            label: '确定',
            icon: ''
          }]
        }
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
    onListEventAddGasStation(obj) {
      const self = this
      if (obj.label === '确定') {
        this.$refs.addGap.$children[0].validate(valid => {
          if (valid) {
            const params = {
              address: self.gasStationRow.gasAddress,
              businessHoursBegin: self.gasStationRow.timerPicker[0],
              businessHoursEnd: self.gasStationRow.timerPicker[1],
              orgId: self.gasStationRow.orgId,
              orgName: self.gasStationRow.orgName,
              gasstationName: self.gasStationRow.gasstationName,
              selectedOptions: self.gasStationRow.selectedOptions,
              province: CodeToText[self.gasStationRow.selectedOptions[0]],
              city: CodeToText[self.gasStationRow.selectedOptions[1]],
              region: CodeToText[self.gasStationRow.selectedOptions[2]],
              creater: JSON.parse(localStorage.getItem('wopuser')).user_id,
              createrName: JSON.parse(localStorage.getItem('wopuser')).user_name
            }
            $gasStationAdd(params).then(res => {
              if (res.code === 0) {
                self.$message.success(res.message)
                self.dialogAddGasStationVisible = false
                self.$refs.gasList.initDataList()
              } else {
                self.$message.error(res.message)
              }
            })
          }
        })
      }
    }
  }
}
</script>
