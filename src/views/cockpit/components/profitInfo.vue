<template>
  <div class="rebate template-main">
    <div class="box-wrap">
      <div class="title">盘盈亏概况<em>最近 账存调整 时间：{{ formateTData(calInfo.updateDate, 'all') }}</em></div>
      <div v-if="stationInfo.djCode !== 'DJ000'" class="reset-btn" @click="resetClick">重新试算</div>

      <div class="content-box">
        <div class="item"><card-data name="当前实存" :value="calInfo.actualQty || '-'" unit="吨"></card-data></div>
        <div class="item"><card-data name="当前账存" :value="calInfo.accountQty || '-'" unit="吨"></card-data></div>
        <div class="item"><card-data name="当前盈亏量" :value="calInfo.lossQty || '-'" unit="公斤"></card-data></div>
        <div class="item" v-if="menuType === 'op'"><card-data name="盘盈亏价" :value="calInfo.avgPrice || '-'" unit="元/公斤"></card-data></div>
        <div class="item" v-if="menuType === 'op'"><card-data name="当前盈亏额" :value="calInfo.lossValue || '-'" unit="吨"></card-data></div>
      </div>
    </div>
<!--    <div class="time-wrapper">
      <el-date-picker
        v-model="trendDate"
        @change="changeTrendDate"
        size="mini"
        type="monthrange"
        range-separator="至"
        start-placeholder="开始月份"
        end-placeholder="结束月份">
      </el-date-picker>
    </div>-->
    <em-table-list :tableListName="'rebate'" :custTableTitle="'盘盈亏'" :axios="axios" :queryCustURL="queryCustURL"
                   :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" ref="tables"
                   :page_status="page_status" :buttonsList="buttonsList" :page_column="page_column"
                   :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
  </div>
</template>
<script>
import { initVueDataOptions, callbackPagesInfo, isTypeof, formatDate } from '@/utils/tools'
import { mapGetters } from 'vuex'
import CardData from '@/components/CardData.vue'
import { $strategyCalInfo, $strategyStationInfo } from '@/service/strategy'
import { formateTData } from '@/utils/filters'

export default {
  name: 'profitInfo',
  props: ['orgId', 'menuType'],
  components: { CardData },
  data() {
    return initVueDataOptions(this, {
      stationInfo: {},
      trendDate: [],
      calInfo: {},
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
      buttonsList: [],
      gasstationId: this.$store.state.app.stationId
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
      // 获取站信息
      $strategyStationInfo({ gasstationId: this.orgId }).then(res => {
        this.stationInfo = res.data || {}
      })

      $strategyCalInfo({ gasstationId: this.orgId }).then(res => {
        this.calInfo = res.data || {}
      })

      // 时间初始化
      const date = new Date()
      this.trendDate = [formatDate(new Date(date.getFullYear(), (date.getMonth() - 1), 1), 'yyyy-MM'), formatDate(new Date(date.getFullYear(), date.getMonth(), 1), 'yyyy-MM')]
    },
    changeTrendDate() {
      this.$refs.tables.initDataList()
    },
    resetClick() {
      this.initData()
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
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { dateParam: { createDateFrom: formatDate(this.trendDate[0], 'yyyy-MM'), createDateTo: formatDate(this.trendDate[1], 'yyyy-MM') }, gasstationId: this.orgId } })
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
    width: 33%;
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

.reset-btn {
  position: absolute;
  right: 20px;
  top: 14px;
  font-size: 14px;
  font-weight: 600;
  color: #3471FF;
  padding-left: 17px;
  cursor: pointer;

  &:before {
    content: '';
    width: 16px;
    height: 16px;
    position: absolute;
    top: 2px;
    left: 0;
    background: url(~@/assets/images/new/home/reset.png) no-repeat;
    background-size: contain;
  }
}

.time-wrapper {
  position: absolute;
  top: 290px;
  right: 30px;
  z-index: 10000;
}
</style>
