<template>
  <div class="rebate template-main">
    <div class="box-wrap">
      <div class="title">气价概况<em>当前交班日：{{ currentInfo.handoverDate || '-' }}（{{ currentInfo.handoverStart || '-' }} 至 {{ currentInfo.handoverEnd || '-' }}）</em></div>
      <div class="content-box">
        <el-row :gutter="20">
          <el-col :span="8"><card-data name="当日销售均价" :value="currentInfo.avgPrice" :isDiff="true" :compare="currentInfo.avgPriceStatus" :avgPrice="currentInfo.diffAvgPrice" :avgPercent="currentInfo.diffAvgPricePercent" unit="元/公斤"></card-data></el-col>
          <el-col :span="8"><card-data name="当前平台价" :value="currentInfo.currentPlatformPrice" :isDiff="true" :compare="currentInfo.platformPriceStatus" :avgPrice="currentInfo.diffPlatformPrice" :avgPercent="currentInfo.diffPlatformPricePercent" unit="元/公斤"></card-data></el-col>
          <el-col :span="8"><card-data name="当前挂牌价" :value="currentInfo.currentListPrice || '-'" unit="元/公斤"></card-data></el-col>
        </el-row>
      </div>
    </div>
    <em-table-list :tableListName="'rebate'" :custTableTitle="'当前特价'" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" ref="tables" :page_status="page_status" :buttonsList="buttonsList" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
  </div>
</template>
<script>
import { initVueDataOptions, callbackPagesInfo, isTypeof } from '@/utils/tools'
import { mapGetters } from 'vuex'
import CardData from '@/components/CardData.vue'
import { $strategyPriceInfo } from '@/service/strategy'
export default {
  components: { CardData },
  data() {
    return initVueDataOptions(this, {
      currentInfo: {},
      queryCustURL: {
        list: {
          url: 'strategy/flag/price/get_price_page',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: ''
      },
      buttonsList: [],
      gasstationId: this.$store.state.app.stationId
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'home_control_modeList',
      page_status: 'home_control_page_status',
      page_column: 'home_control_column',
      select_list: 'home_control_select_list',
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
    initData() {
      $strategyPriceInfo({ gasstationId: this.gasstationId }).then(res => {
        this.currentInfo = res.data || {}
      })
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
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { gasstationId: this.gasstationId } })
      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (v !== '') params[k] = v
        }
      }
      // 排序
      console.log(_this.order, params)
      if (_this.order.price === 'ascending') {
        params.param.orderBy = 0
      } else if (_this.order.price === 'descending') {
        params.param.orderBy = 1
      }

      callback(params)
    }
  }
}
</script>
<style lang="scss" scoped>
.content-box {
  padding: 20px;
}
.box-wrap .title em {
  margin-left: 28px;
  font-style: normal;
  font-size: 14px;
  font-weight: 500;
  color: #8C8C8C;
}
</style>
