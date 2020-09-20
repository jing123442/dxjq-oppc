<template>
  <div class="template-main">
     <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="物流公司" name="carrier">
        <em-table-list :tableListName="'carrierConfig'" :axios="axios" :queryCustURL="carrierConfig.queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="carrier_mode_list" :page_status="carrier_page_status" :page_column="carrier_page_column" :select_list="carrier_select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
      </el-tab-pane>
      <el-tab-pane label="加气站" name="gasstation">
         <em-table-list :tableListName="'gasstationConfig'" :axios="axios" :queryCustURL="gasstationConfig.queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="gasstation_mode_list" :page_status="gasstation_page_status" :page_column="gasstation_page_column" :select_list="gasstation_select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { axiosRequestParams, queryDefaultParams } from '@/utils/tools'
import { mapGetters } from 'vuex'

export default {
  name: 'marketingManager',
  data() {
    return {
      activeName: 'carrier',
      isShow: false,
      carrierConfig: {
        queryCustURL: {
          edit: {
            url: 'strategy/carrier/configure_manager',
            method: 'post'
          },
          list: {
            url: 'strategy/carrier/list',
            method: 'post',
            parse: {
              tableData: ['data', 'records'],
              totalCount: ['data', 'total']
            }
          },
          name: '营销合作经理配置'
        }
      },
      gasstationConfig: {
        queryCustURL: {
          edit: {
            url: 'strategy/gasstation/configure_manager',
            method: 'post'
          },
          list: {
            url: 'strategy/gasstation/list',
            method: 'post',
            parse: {
              tableData: ['data', 'records'],
              totalCount: ['data', 'total']
            }
          },
          name: '营销合作经理配置'
        }
      },
      axios: axiosRequestParams(this),
      queryParams: queryDefaultParams(this, { type: 2, key: 'param', value: { purchase: {} } })
    }
  },
  computed: {
    ...mapGetters({
      carrier_mode_list: 'market_carrierManConfig_mode_list',
      carrier_page_status: 'market_carrierManConfig_page_status',
      carrier_page_column: 'market_carrierManConfig_column',
      carrier_select_list: 'market_carrierManConfig_select_list',
      gasstation_mode_list: 'market_gasstationConfig_mode_list',
      gasstation_page_status: 'market_gasstationConfig_page_status',
      gasstation_page_column: 'market_gasstationConfig_column',
      gasstation_select_list: 'market_gasstationConfig_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  mounted: function () { },
  methods: {
    onListEvent(type, row) {
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
    handleClick(tab, event) {
      // console.log(tab, event)
    }
  }
}
</script>
