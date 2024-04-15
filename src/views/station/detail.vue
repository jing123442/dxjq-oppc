<template>
  <div class="rebate template-main">
    <div class="handoverTime">交班时间：{{ historyInfo.handoverTime }}</div>
    <em-table-list :tableListName="'rebate'" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" ref="tables" :page_status="page_status" :buttonsList="buttonsList" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
  </div>
</template>
<script>
import { initVueDataOptions, callbackPagesInfo, isTypeof } from '@/utils/tools'
import { mapGetters } from 'vuex'
export default {
  data() {
    return initVueDataOptions(this, {
      times: null,
      historyInfo: { handoverTime: '' },
      queryCustURL: {
        list: {
          url: 'strategy/flag_station_info/get_overview_history',
          method: 'post',
          parse: {
            tableData: ['data', 'page', 'records'],
            totalCount: ['data', 'page', 'total']
          }
        },
        name: '交班日概况'
      }
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'home_detail_modeList',
      page_status: 'home_detail_page_status',
      page_column: 'home_detail_column',
      select_list: 'home_detail_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success',
      woporg: 'woporg'
    })
  },
  created() {},
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      const response = this.$refs.tables.tableListResponse

      if (response) {
        clearTimeout(this.times)
        if (response.code === 0) {
          if (response.data) {
            this.historyInfo = { ...response.data }
          } else {
            this.historyInfo = { handoverTime: '' }
          }
        }
      } else {
        this.times = setTimeout(() => {
          this.initData()
        }, 200)
      }
    },
    onListEvent(type, row) {
      // if (type == 'order') {
      //   this.$router.push({
      //     path: './direct/directOrder'
      //   })
      // } else if (type == 'url') {
      //   window.open(row.url)
      // }
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { gasstationId: this.woporg } })
      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (k === 'handDate') {
            params.param.start = v[0].split(' ')[0]
            params.param.end = v[1].split(' ')[0]
          } else if (v !== '') {
            params.param[k] = v
          }
        }
      }

      callback(params)
    }
  }
}
</script>
<style lang="scss" scoped>
.handoverTime {
  position: absolute;
  top: 36px;
  left: 430px;
  font-size: 14px;
  color: rgba(140, 140, 140, 1);
}
</style>
