<template>
  <div class="template-main">
    <el-tabs v-model="active" type="card">
      <el-tab-pane label="情报变更记录">
        <em-table-list v-if="active == 0" :custTableTitle="'情报变更记录'" :tableListName="'battleInfoLog'" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_log_list" :page_status="page_log_status" :page_column="page_log_column" :select_list="select_log_list" @onReqParams="onReqParams"></em-table-list>
      </el-tab-pane>
      <el-tab-pane label="站点变更记录">
        <em-table-list v-if="active == 1" :custTableTitle="'站点变更记录'" :tableListName="'battleGasLog'" :axios="axios" :queryCustURL="queryCustGasURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_log_list" :page_status="page_log_status" :page_column="page_gas_log_column" :select_list="select_log_list" @onReqParams="onReqParams"></em-table-list>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { initVueDataOptions, queryDefaultParams } from '@/utils/tools'

export default {
  name: 'battle',
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
      queryParams: queryDefaultParams(this, { type: 2, key: 'param', value: { } })
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
      page_log_column: 'cockpit_battle_log_column',
      page_gas_log_column: 'cockpit_battle_gas_log_column',
      select_log_list: 'cockpit_battle_log_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  watch: {},
  created() {},
  mounted() {
    // 重置地图高度
    this.mapHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  },
  methods: {
    onReqParams() {

    }
  }
}
</script>
