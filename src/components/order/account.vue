<template>
  <div class="truck-record-main">
    <van-pull-refresh v-model="order.loading" :head-height="80" @refresh="onRefresh">
      <van-list v-model="order.loading" :finished="order.finished" finished-text="没有更多了" @load="truckSettleOrder">
        <div v-for="(item,index) in order.list" :key="index">
          <order-list :item="item" :parse="parse" :cellType="'cell-box'"></order-list>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { $truckAccountStatement } from '@/service/settle'
import { OrderList } from '@/components'
import { monthTimeArea } from '@/utils/tools'

export default {
  data() {
    return {
      query: this.$route.query,
      pages: {
        page: 1,
        size: 10
      },
      order: {
        list: [],
        loading: false,
        finished: false
      },
      parse: {
        image: require('@/assets/component/orderlist/truck@3x.png'),
        title: { filed: 'gasstationName' },
        list: [[{
          name: '结算价',
          filed: 'actualPrice',
          filter: 'currency'
        }, {
          name: '加气量',
          filed: 'gasQty',
          unit: '公斤'
        }, {
          name: '结算金额',
          filed: 'amount',
          filter: 'currency'
        }], [{
          name: '优惠金额',
          filed: 'discountAmount',
          filter: 'currency'
        }, {
          name: '时间',
          filed: 'updateDate',
          filter: 'formateTData',
          dateType: 'date'
        }, {
          name: '司机',
          filed: 'driverName'
        }]]
      }
    }
  },
  components: { OrderList },
  created() { },
  methods: {
    onRefresh() {
      this.pages.page = 1
      this.order.list = []
      this.order.finished = false
      this.truckSettleOrder()
    },
    truckSettleOrder() {
      const month = monthTimeArea(this.query.currDate || new Date())
      var params = {
        page: this.pages.page,
        size: this.pages.size,
        param: {
          gasOrder: {
            truckId: this.query.truckId
          },
          dateParam: {
            createDateFrom: month.start,
            createDateTo: month.end
          }
        }
      }

      this.order.loading = true
      $truckAccountStatement(params).then(response => {
        this.order.loading = false
        this.order.list.push(...response.records)

        if (response.total <= this.order.list.length) {
          this.order.finished = true
        }
        this.pages.page++
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .truck-record-main {
    background-color: #F6F7F9;
  }
</style>
