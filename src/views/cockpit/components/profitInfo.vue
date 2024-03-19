<template>
  <div class="rebate template-main">
    <em-table-list :tableListName="'rebate'" :tableButtonStatus="false" :axios="axios" :queryCustURL="queryCustURL"
                   :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" ref="tables"
                   :page_status="page_status" :buttonsList="buttonsList" :page_column="page_column"
                   :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
  </div>
</template>
<script>
import { initVueDataOptions, callbackPagesInfo, isTypeof } from '@/utils/tools'
import { mapGetters } from 'vuex'
import { formateTData } from '@/utils/filters'

export default {
  name: 'profitInfo',
  props: ['orgId'],
  data() {
    return initVueDataOptions(this, {
      queryCustURL: {
        list: {
          url: '/strategy/flag/adjust/page',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: ''
      },
      buttonsList: []
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'home_profit_modeList',
      page_status: 'home_profit_page_status',
      page_column: 'home_profit_column',
      select_list: 'home_profit_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success',
      woporg: 'woporg'
    })
  },
  created() {
    this.initData()
  },
  methods: {
    formateTData,
    initData() {
      // 时间初始化
    },
    onListEvent(type, row) {
      if (type === 'order') {
        this.$router.push({
          path: './direct/directOrder'
        })
      } else if (type === 'url') {
        window.open(row.url)
      }
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { dateParam: {}, gasstationId: this.orgId } })
      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (v !== '') params.param[k] = v
        }
      }

      callback(params)
    }
  }
}
</script>
<style lang="scss" scoped>
.content-box {
  padding: 20px 0 20px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .item {
    width: 20%;
    padding-right: 20px;
  }
}
.box-wrap .title em {
  margin-left: 10px;
  font-style: normal;
  font-size: 14px;
  font-weight: 500;
  color: #8C8C8C;
}

.time-wrapper {
  position: absolute;
  top: 220px;
  right: 30px;
  z-index: 10000;
}
</style>
