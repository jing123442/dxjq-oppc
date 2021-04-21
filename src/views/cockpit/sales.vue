<template>
  <div class="template-main">
    <el-tabs v-model="active" type="card" @tab-click="handleClick">
      <el-tab-pane label="今日实时" name="0">
        <em-table-list ref="tables" :tableListName="'timeday'" :authButtonList="authButtonList" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :composeParam="composeParam" :rowKey="'menuId'" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :options="{ lazy: false }" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
      </el-tab-pane>
      <el-tab-pane label="历史时段" name="1">
        <em-table-list ref="tables" :tableListName="'timehistory'" :authButtonList="authButtonList" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :composeParam="composeParam" :rowKey="'menuId'" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :options="{ lazy: false }" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { initVueDataOptions } from '@/utils/tools'
import { mapGetters } from 'vuex'

export default {
  name: 'salestime',
  data() {
    return initVueDataOptions(this, {
      active: 0,
      queryCustURL: {
        add: {
          url: 'user/menu/add',
          method: 'post'
        },
        edit: {
          url: 'user/menu/update',
          method: 'post'
        },
        del: {
          url: 'user/menu/del',
          method: 'post',
          name: 'menuName',
          props: {
            menuId: 'menuId'
          }
        },
        list: {
          url: 'settle/gasstation_monitor/full_district_list',
          method: 'post',
          parse: {
            tableData: ['data']
          }
        },
        name: '菜单'
      },
      composeParam: ['menuId'],
      buttonsList: [{ type: 'primary', icon: '', event: 'add', name: '新建菜单' }],
      addChildRow: {},
      childrenTitle: '新增子菜单',
      dialogAddChildVisible: false,
      removeRow: {},
      dialogDelChildVisible: false
    })
  },
  computed: {
    ...mapGetters({
      page_column: 'cockpit_sales_column',
      mode_list: 'cockpit_sales_mode_list',
      mode_history_list: 'cockpit_history_column',
      page_status: 'cockpit_sales_page_status',
      select_list: 'cockpit_sales_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success',
      woporg: 'woporg'
    })
  },
  created: function () {},
  mounted: function () {},
  methods: {
    onListEvent(type, row) {

    },
    handleClick() {

    },
    onReqParams(type, _this, callback) {
      const params = { clientId: 'woperation' }
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
