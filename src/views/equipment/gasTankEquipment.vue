<template>
  <div class="template-main">
    <em-table-list ref="tables" :tableListName="'gasTankEquipment'" :authButtonList="authButtonList" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
    <el-dialog title="位置" :visible.sync="dialogVisible" :width="add_edit_dialog" :append-to-body="true">
      <div style="width: 100%; height: 450px">
        <baidu-map :style="this.mapStyle" ref="map"  class="bm-view" :ak="this.akey"
                   :center="this.center"
                   :zoom="9"
                   :dragging="true"
                   :scroll-wheel-zoom="true">
          <bm-view style="width: 100%; height:100%;"></bm-view>
          <!--缩放按钮-->
          <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT" :offset="{height: 55}"></bm-navigation>
          <bm-marker :position="{lng: center.lng, lat: center.lat}" :dragging="true"
                     animation="BMAP_ANIMATION_BOUNCE"></bm-marker>
        </baidu-map>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { initVueDataOptions, callbackPagesInfo, isTypeof, exportBlobToFiles } from '@/utils/tools'
import { $gasdataLngContainerExport } from '@/service/gasdata'
import { mapGetters } from 'vuex'
import { BaiduMap, BmView, BmNavigation, BmMarker } from 'vue-baidu-map'

export default {
  name: 'gasTankEquipment',
  components: {
    BaiduMap,
    BmView,
    BmNavigation,
    BmMarker
  },
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
      buttonsList: [{ type: 'primary', icon: '', event: 'add', name: '添加' }, { type: 'primary', icon: '', event: 'export', name: '导出' }],
      dialogVisible: false,
      center: {
        lng: 115.692614,
        lat: 35.941008
      },
      akey: 'dfhycORtYDMz78dNLo9oNiDO1ufI2TZS',
      mapStyle: {
        width: '100%',
        height: '100%'
      }
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
      } else if (type === 'position') {
        this.center.lng = row.lng
        this.center.lat = row.lat
        this.dialogVisible = true
      } else if (type === 'analysis') {
        this.$message.warning('暂未开放')
      } else if (type === 'equipment') {
        this.$message.warning('暂无数据')
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
            params.param.carNumber = v || null
          } else {
            if (v !== '') params.param[k] = parseInt(v)
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
