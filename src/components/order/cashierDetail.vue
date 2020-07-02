<template>
  <div class="order-detail-warp-page">
    <van-loading type="spinner" class="detail-loading" v-if="loading" size="40" />
    <div v-else>
      <van-cell-list :data="orderInfo" :list="cellList"></van-cell-list>
    </div>

    <div class="prepay-bottom">
      <van-button @click="cancelOrder()" class="cancel">取消订单</van-button>
      <van-button @click="$router.go(-1)" class="makesure">返回首页</van-button>
    </div>
  </div>
</template>

<script>
import { $orderDatail, $cancelGasOrder } from '@/service/business'
import { VanCellList } from '@/components'

export default {
  data() {
    return {
      loading: true,
      orderInfo: {},
      cellList: [{
        cell: [{
          title: '订单号',
          key: 'orderId'
        }, {
          title: '车牌号',
          key: 'carNumber'
        }, {
          title: '本次加气',
          key: 'gasQty',
          unit: '公斤'
        }, {
          title: '挂牌价',
          key: 'listPrice',
          filter: 'currency',
          unit: '元/公斤'
        }, {
          title: '小计',
          key: 'amount',
          filter: 'right'
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
    },
    cancelOrder() {
      $cancelGasOrder({ orderId: this.$route.query.orderId }).then((res) => {
        this.$toast('取消成功！')
        setTimeout(() => {
          this.$router.go(-1)
        }, 2000)
      })
    }
  }
}
</script>
<style lang="scss">
  .order-detail-warp-page {
    .detail-loading{
      height: 80px;
      line-height: 80px;
      background-color: #ffffff;
    }

    .prepay-bottom {
      position: fixed;
      width: 100%;
      height: 80px;
      bottom: 0;
      font-size: 16px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      background-color: #ffffff;

      .cancel {
        color: #0077ff;
        border: 1px solid #0077ff;
        width: 40%;
      }

      .makesure {
        background: #0077ff;
        border: 1px solid #0077ff;
        color: white;
        width: 40%;
      }
    }
  }
</style>
