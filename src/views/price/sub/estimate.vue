<template>
  <div class="template-main">
    <el-tabs v-model="active" type="card" @tab-click="handleClick">
      <el-tab-pane v-for="(item, index) in tabsList" :key="index" :label="item.name" :name="index.toString()">
        <em-table-list v-if="active == index && nextTick" :tableListName="'estimate'" :axios="axios" :buttonsList="buttonsList" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { axiosRequestParams, callbackPagesInfo } from '@/utils/tools'
import { $lngFormList } from '@/service/strategy'
import { mapGetters } from 'vuex'

export default {
  name: 'estimate',
  data() {
    return {
      active: '0',
      tabsList: [],
      nextTick: false,
      buttonsList: [{ type: 'primary', icon: '', event: 'add', name: '设置出港价格' }],
      queryCustURL: {
        list: {
          url: 'strategy/carriage_log/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: ''
      },
      axios: axiosRequestParams(this),
      queryParams: Function
    }
  },
  computed: {
    ...mapGetters({
      mode_list: 'price_estimate_mode_list',
      page_status: 'price_estimate_page_status',
      page_column: 'price_estimate_column',
      select_list: 'price_estimate_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    }),
    currLngForm() {
      return this.tabsList[this.active]
    }
  },
  created() {
    this.initTabsData()
  },
  mounted: function () { },
  methods: {
    initTabsData() {
      $lngFormList().then(response => {
        this.tabsList = response.data
        this.initTableList()
      })
    },
    initTableList() {
      this.$nextTick(() => {
        this.nextTick = true
      })
    },
    onListEvent(type, row) {},
    handleClick(tab, event) {
      this.nextTick = false
      this.initTableList()
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { lngFromId: this.currLngForm.code } })

      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
