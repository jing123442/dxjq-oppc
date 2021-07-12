<template>
  <div>
    <nt-form ref="battleForm" v-if="optType === 'add'" :rowData="battleRow" :pageColumn="page_column" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :initSelect="true" :responseSuccess="response_success" @onListEvent="onSubmitEvent"></nt-form>
    <el-tabs v-if="optType === 'edit'" v-model="active" type="card">
      <el-tab-pane label="站点编辑">
        <nt-form ref="battleForm" :rowData="battleRow" :inputType="'update'" :pageColumn="page_column" :selectList="select_log_list" :axios="axios" :queryURL="queryCustURL" :initSelect="true" :responseSuccess="response_success" @onListEvent="onSubmitEditEvent"></nt-form>
      </el-tab-pane>
      <el-tab-pane label="站点变更记录">
        <em-table-list v-if="active == 1" :custTableTitle="'站点变更记录'" :tableListName="'battleGasLog'" :axios="axios" :queryCustURL="queryCustGasURL" :responseSuccess="response_success" :queryParam="queryGasParams" :mode_list="mode_log_list" :page_status="page_log_status" :page_column="page_gas_log_item_column" :select_list="select_log_list" @onReqParams="onReqParams"></em-table-list>
      </el-tab-pane>
    </el-tabs>
    <el-tabs v-if="optType === 'info'" v-model="active" type="card">
      <el-tab-pane label="情报编辑">
        <nt-form ref="battleForm" :rowData="battleRow" :inputType="infoInputType" :pageColumn="page_column" :selectList="select_log_list" :axios="axios" :queryURL="queryCustURL" :initSelect="true" :responseSuccess="response_success" @onListEvent="onSubmitInfoEvent"></nt-form>
      </el-tab-pane>
      <el-tab-pane label="情报变更记录">
        <em-table-list v-if="active == 1" :custTableTitle="'站点变更记录'" :tableListName="'battleGasLog'" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_log_list" :page_status="page_log_status" :page_column="page_log_item_column" :select_list="select_log_list" @onReqParams="onReqParams"></em-table-list>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { custFormBtnList, initVueDataOptions, objectDepthAssignment, queryDefaultParams } from '@/utils/tools'
import {
  $gasdataGasstationBattleAdd,
  $gasdataGasstationBattleDelete, $gasdataGasstationBattleInfoUpdate,
  $gasdataGasstationBattleUpdate
} from '@/service/gasdata'

export default {
  name: 'battle',
  props: {
    optType: {
      type: String,
      required: true
    },
    rowData: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data: function () {
    return initVueDataOptions(this, {
      active: 0,
      queryCustURL: {
        list: {
          url: 'gasdata/gasstation_info_log/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '情报变更记录'
      },
      queryCustGasURL: {
        list: {
          url: 'gasdata/gasstation_log/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '站点变更记录'
      },
      queryParams: queryDefaultParams(this, { type: 2, key: 'param', value: { gasstationId: this.rowData.gasstationId } }),
      queryGasParams: queryDefaultParams(this, { type: 2, key: 'param', value: { gasstationId: this.rowData.gasstationId } }),
      battleRow: {}
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'cockpit_battle_mode_list',
      page_status: 'cockpit_battle_page_status',
      page_column: 'cockpit_battle_column',
      select_list: 'cockpit_battle_select_list',
      mode_log_list: 'cockpit_battle_log_mode_list',
      page_log_status: 'cockpit_battle_log_page_status',
      page_log_item_column: 'cockpit_battle_log_item_column',
      page_gas_log_item_column: 'cockpit_battle_gas_log_item_column',
      select_log_list: 'cockpit_battle_log_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  watch: {},
  created() {
    this.initData()
  },
  methods: {
    initData() {
      this.battleRow = objectDepthAssignment(this.rowData)
      this.battleRow.pointAddress = this.rowData.longitude + ',' + this.rowData.latitude
      this.battleRow._btn = custFormBtnList()
      if (this.optType === 'edit') {
        this.battleRow._btn.list.unshift({ bType: 'danger', icon: 'el-icon-delete', type: 'delete', label: '删除' })
      } else if (this.optType === 'info') {
        const type = this.rowData.gasType
        if (type === 2001 || type === 2002 || type === 2003 || type === 2004) {
          this.battleRow.gasQtyTotal = Number(Number(this.battleRow.gasQty) + Number(this.battleRow.offlineGasQty)).toFixed(2)
          this.infoInputType = 'dxinfo'
        } else {
          this.infoInputType = 'info'
        }
        this.battleRow.credentials = ''
      }
    },
    onReqParams() {

    },
    gasstationParams(row, type) {
      const pointAddress = row.pointAddress.split(',')
      const params = {
        address: row.address,
        city: row.city,
        gasType: row.gasType,
        nickName: row.nickName,
        offlineGasQty: row.offlineGasQty,
        offlinePrice: row.offlinePrice,
        longitude: pointAddress[0],
        latitude: pointAddress[1]
      }

      if (type === 'add') {
        const tmpList = []
        row.credentials.forEach(item => {
          tmpList.push(item.name)
        })
        params.credentials = tmpList.join(',')
        params.gasstationName = row.nickName
      } else {
        params.gasstationId = row.gasstationId
      }

      return params
    },
    onSubmitEvent(obj, row) {
      if (obj.type === 'ok') {
        this.$refs.battleForm.$children[0].validate(valid => {
          if (valid) {
            $gasdataGasstationBattleAdd(this.gasstationParams(row, 'add')).then(response => {
              this.$message.success('成功！')
              this.$emit('click')
            })
          }
        })
      } else {
        this.$parent.$parent.dialogBattleVisible = false
      }
    },
    onSubmitEditEvent(obj, row) {
      if (obj.type === 'ok') {
        this.$refs.battleForm.$children[0].validate(valid => {
          if (valid) {
            $gasdataGasstationBattleUpdate(this.gasstationParams(row, 'edit')).then(response => {
              this.$message.success('成功！')
              this.$emit('click')
            })
          }
        })
      } else if (obj.type === 'delete') {
        $gasdataGasstationBattleDelete({ gasstationId: row.gasstationId }).then(response => {
          this.$message.success('成功！')
          this.$emit('click')
        })
      } else {
        this.$parent.$parent.dialogBattleVisible = false
      }
    },
    onSubmitInfoEvent(obj, row) {
      if (obj.type === 'ok') {
        this.$refs.battleForm.$children[0].validate(valid => {
          if (valid) {
            const params = {
              gasstationId: row.gasstationId,
              offlineGasQty: row.offlineGasQty,
              offlinePrice: row.offlinePrice
            }

            const tmpList = []
            row.credentials.forEach(item => {
              tmpList.push(item.name)
            })
            params.credentials = tmpList.join(',')

            $gasdataGasstationBattleInfoUpdate(params).then(response => {
              this.$message.success('成功！')
              this.$emit('click')
            })
          }
        })
      } else {
        this.$parent.$parent.dialogBattleVisible = false
      }
    }
  }
}
</script>
