<template>
  <div class="order-detail-warp-page">
    <van-loading type="spinner" class="detail-loading" v-if="loading" size="40" />
    <div v-else>
      <van-cell-list :data="orderInfo" :list="cellList"></van-cell-list>
    </div>
  </div>
</template>

<script>
import { $orderDatail } from '@/service/business'
import { VanCellList } from '@/components'

export default {
  data() {
    return {
      loading: true,
      orderInfo: {},
      cellList: [{
        cell: [{
          title: '物流公司名称',
          key: 'carrierOrgName'
        }, {
          title: '车牌号',
          key: 'carNumber'
        }, {
          title: '司机',
          key: 'driverName'
        }]
      }, {
        cell: [{
          title: '加气量',
          key: 'gasQty',
          unit: '公斤'
        }, {
          title: '挂牌价',
          key: 'listPrice',
          filter: 'currency',
          unit: '元/公斤'
        }, {
          title: '结算价',
          key: 'actualPrice',
          filter: 'currency',
          unit: '元/公斤'
        }, {
          title: '总价',
          key: 'orderTotal',
          filter: 'currency'
        }, {
          title: '优惠金额',
          key: 'discountAmount',
          filter: 'currency'
        }, {
          title: '小计',
          key: 'amount',
          filter: 'right'
        }]
      }, {
        cell: [{
          title: '加气站名称',
          key: 'gasstationName'
        }, {
          title: '收银员',
          key: 'cashierName'
        }]
      }, {
        cell: [{
          title: '订单号',
          key: 'orderId'
        }, {
          title: '创建时间',
          key: 'createDate',
          filter: 'formateTData'
        }, {
          title: '付款时间',
          key: 'updateDate',
          filter: 'formateTData'
        }]
      }]
    }
  },
  components: { VanCellList },
  created() {
    this.initOrderInfo()
  },
  methods: {
    initOrderInfo() {
      var params = {
        orderId: this.$route.query.orderId
      }
      $orderDatail(params).then(response => {
        this.loading = false
        this.orderInfo = response
        this.orderInfo.orderTotal = Number(response.discountAmount) + Number(response.amount)
      })
    }
  }
}
</script>
<style lang="scss">
  .order-detail-warp-page {
    background: #F6F7F9;
    padding-bottom: 1px;

    .detail-loading{
      height: 80px;
      line-height: 80px;
      background-color: #ffffff;
    }
  }
</style>
