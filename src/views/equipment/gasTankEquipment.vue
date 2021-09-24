<template>
  <div class="template-main">
    <em-table-list ref="tables" :tableListName="'gasTankEquipment'" :authButtonList="authButtonList" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
  </div>
</template>

<script>
import { initVueDataOptions, callbackPagesInfo, isTypeof, exportBlobToFiles } from '@/utils/tools'
import { $gasdataLngContainerExport } from '@/service/gasdata'
import { mapGetters } from 'vuex'

export default {
  name: 'gasTankEquipment',
  data() {
    return initVueDataOptions(this, {
      queryCustURL: {
        list: {
          url: 'gasdata/lng_container/page',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        add: {
          url: '/gasdata/lng_container/add',
          method: 'post'
        },
        del: {
          url: '/gasdata/lng_container/remove',
          method: 'post',
          title: '删除LNG气瓶信息',
          name: 'carNumber',
          props: {
            id: 'id'
          }
        },
        edit: {
          url: 'gasdata/lng_container/update',
          methods: 'post'
        },
        name: '车载LNG气瓶管理'
      },
      buttonsList: [{ type: 'primary', icon: '', event: 'add', name: '添加' }, { type: 'primary', icon: '', event: 'export', name: '导出' }]
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'equipment_gasTankEquipment_mode_list',
      page_status: 'equipment_gasTankEquipment_page_status',
      page_column: 'equipment_gasTankEquipment_column',
      select_list: 'equipment_gasTankEquipment_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () { },
  methods: {
    onListEvent(type, row) {
      if (type === 'export') {
        this.lngContainerExport()
      }
    },
    lngContainerExport() {
      $gasdataLngContainerExport().then(res => {
        const fileName = '车载LNG气瓶数据' + Date.parse(new Date()) + '.xlsx'

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
    }
  }
}
</script>

<style scoped>

</style>
