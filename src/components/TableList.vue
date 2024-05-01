<template>
  <div class="order-list">
    <div class="order-data-available" v-if="data.length == 0">暂无订单数据</div>
    <div v-else class="order-item" v-for="(item, index) in data" :key="index">
      <span class="updateDate">{{item.updateDate}}</span>
      <span class="orderId">{{item.orderId}}</span>
      <span class="gasQty">{{item.gasQty}}</span>
      <span class="amount">{{item.amount}}</span>
      <span class="carNumber">{{item.carNumber}}</span>
      <el-tooltip class="item" effect="dark" :content="item.carrierOrgName" placement="top">
        <span class="carrierOrgName">{{item.carrierOrgName}}</span>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" :content="item.gasstationName" placement="top">
        <span class="gasstationName">{{item.gasstationName}}</span>
      </el-tooltip>
      <span :class="item.orderStatus == 1 ? 'unpaid' : item.orderStatus == 2 ? 'paid' : 'payCancel'">{{item.orderStatus == 1 ? '待支付' : item.orderStatus == 2 ? '已支付' : item.orderStatus == 3 ? '已取消' : '未知'}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TableList',
  props: {
    data: {
      type: Array,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
  .order-list {
    padding: 1rem 0;
    overflow-y: auto;
    width: 83.5rem;
    height: 100%;
    background: #fff;
    border-radius: 8px;
    .order-data-available {
      height: 100%;
      display: flex;
      font-size: 3rem;
      color: rgba(0, 0, 0, .2);
      align-items: center;
      justify-content: center;
    }
    .order-item {
      margin: 1.2rem auto;
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 78.4rem;
      height: 4.2rem;
      background: #EDF1F9;
      font-size: 1.4rem;
      color: #1D1919;
      border-radius: 8px;
      .carrierOrgName, .gasstationName {
        width: 9rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .unpaid {
        color: #F6BD16;
      }
      .paid {
        color: #5B8FF9;
      }
      .payCancel {
        color: #1D1919;
      }
    }
  }
</style>
