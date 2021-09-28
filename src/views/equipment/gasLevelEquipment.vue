<template>
  <div class="template-main">
    <em-table-list ref="tables" :tableListName="'gasLevelEquipment'" :authButtonList="authButtonList" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"  @updateColumnValue="updateColumnValue"></em-table-list>
  </div>
</template>

<script>
import { initVueDataOptions, callbackPagesInfo, isTypeof, exportBlobToFiles } from '@/utils/tools'
import { mapGetters } from 'vuex'
import { $gasdataGaugeExport } from '@/service/gasdata'
export default {
  name: 'gasLevelEquipment',
  data() {
    return initVueDataOptions(this, {
      queryCustURL: {
        list: {
          url: 'gasdata/gauge/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        add: {
          url: 'gasdata/gauge/add',
          method: 'post'
        },
        del: {
          url: 'gasdata/gauge/remove',
          method: 'post',
          title: '删除液位计信息',
          name: 'carNumber',
          props: {
            id: 'id'
          }
        },
        edit: {
          url: 'gasdata/gauge/update',
          method: 'post'
        },
        name: '智能液位计管理'
      },
      buttonsList: [{ type: 'primary', icon: '', event: 'add', name: '添加' }, { type: 'primary', icon: '', event: 'export', name: '导出' }]
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'equipment_gasLevelEquipment_mode_list',
      page_status: 'equipment_gasLevelEquipment_page_status',
      page_column: 'equipment_gasLevelEquipment_column',
      select_list: 'equipment_gasLevelEquipment_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () { },
  methods: {
    onListEvent(type, row) {
      if (type === 'export') {
        this.gaugeExport()
      } else if (type === 'messageLog' || type === 'setting') {
        this.$message.warning('暂未开放')
      }
    },
    gaugeExport() {
      $gasdataGaugeExport().then(res => {
        const fileName = '智能液位计数据' + Date.parse(new Date()) + '.xlsx'

        exportBlobToFiles(res, fileName)
      })
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: {} })
      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (k === 'carNumberSearch') {
            params.param.carNumber = v
          } else {
            if (v !== '') params.param[k] = v
          }
        }
      }
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    },
    updateColumnValue(tableData, callback) {
      tableData.forEach(item => {
        item.cooperationType = item.cooperationType + ''
      })
      callback(tableData)
    }
  }
}
</script>

<style scoped>

</style>
