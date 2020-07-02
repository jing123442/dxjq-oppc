<template>
  <div class="item-warp">
    <div class="item-left">
      <img :src="item.url | gasstationImage" alt="">
    </div>
    <div class="item-content-right">
      <div class="item-center">
        <span class="cmp-name">{{item.gasstationName }}</span>
        <div class="location">
          <van-icon name="location-o" />
          <span class="address"> {{item.province + item.city + item.region+ item.address}}</span>
        </div>
        <div class="distance"> {{item.distance}} km</div>
        <div class="price">
          <span>挂牌价</span>
          <span class="new-price"> {{item.listPrice}} </span>
          <span>元/公斤</span>
        </div>
      </div>
      <div @click="openTxMap(item)" class="item-right">
        <img src="@/assets/component/gasstationlist/location-navigation.png" alt="">
        <div class="daohang">导航</div>
      </div>
    </div>
  </div>
</template>

<script>
import wxShare from '@/utils/mixins/wechat'
import coordinate from '@/utils/wscoordinate'
export default {
  name: 'GasstationList',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  mixins: [wxShare],
  methods: {
    openTxMap(item) {
      console.log(item)
      var point = coordinate.transformFromBaiduToGCJ(item.latitude, item.longitude)
      var options = {
        la: parseFloat(point.latitude),
        lo: parseFloat(point.longitude),
        name: item.gasstationName,
        desc: item.address,
        url: ''
      }
      this.openLocation(options)
    }
  }
}
</script>

<style scoped lang="scss">
  .item-warp {
    display: flex;
    padding: 10px 0;
    justify-content: space-between;

    .item-left {
      img {
        width: 90px;
      }
    }

    .item-content-right {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .item-center {
      text-align: left;
      padding: 0 10px;
      font-size: 13px;

      .cmp-name {
        font-size: 16px;
        line-height: 17px;
        font-weight: 800;
        display: -webkit-box;
        /*作为弹性伸缩盒子模型显示*/
        -webkit-line-clamp: 1;
        /*显示的行数；如果要设置2行加...则设置为2*/
        overflow: hidden;
        /*超出的文本隐藏*/
        text-overflow: ellipsis;
        /* 溢出用省略号*/
        -webkit-box-orient: vertical;
        /*伸缩盒子的子元素排列：从上到下*/
      }

      .location {
        display: flex;
        margin-top: 6px;
        color: #666666;
        height: 13px;
        line-height: 15px;

        .address {
          width: 100%;
          display: -webkit-box;
          /*作为弹性伸缩盒子模型显示*/
          -webkit-line-clamp: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          /*伸缩盒子的子元素排列：从上到下*/
        }
      }

      .distance {
        margin-top: 6px;
        width: 30%;
        color: #666666;
      }

      .price {
        margin-top: 8px;
        color: #666666;

        .new-price {
          color: #ff720f;
          font-size: 18px;
        }
      }
    }

    .item-right {
      margin-right: 10px;

      img {
        width: 30px;
      }

      .daohang {
        margin-top: 5px;
        font-size: 13px;
      }
    }
  }
</style>
