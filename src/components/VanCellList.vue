<template>
  <div>
    <van-cell-group v-for="(item, index) in list" :key="index" class="order-row-cell">
      <div v-for="(cItem, cIndex) in item.cell" :key="cIndex">
        <van-cell
          @click="clickEvent(cItem)"
          :is-link="cItem.isLink ? true : false"
          :class="['font-size-' + (cItem.size ? cItem.size : (item.size ? item.size : 13)), 'padding-height-' + (cItem.padding ? cItem.padding : (item.padding ? item.padding : 10))]">
          <template #title>
            <div v-if="cItem.filter !== 'right'" class="van-cell-title">
              <img v-if="cItem.image" :src="cItem.image" />
              <span>{{cItem.title}}</span>
            </div>
          </template>
          <template #right-icon>
            <div v-if="cItem.filter == 'right'" class="van-cell-right order-total">
              <div class="order-total">
                <span>{{cItem.title}}</span>
                <span class="sum-money">{{(data[cItem.key] ? data[cItem.key] : '') | currency(cItem.unit || '')}}</span>
              </div>
            </div>
            <div v-else class="van-cell-right">
              <span v-if="cItem.filter == 'formateTData'">{{(data[cItem.key] ? data[cItem.key] : '') | formateTData('all')}}</span>
              <span v-else-if="cItem.filter == 'currency'">{{(data[cItem.key] ? data[cItem.key] : '') | currency(cItem.unit || '')}}</span>
              <span v-else>{{(data[cItem.key] ? data[cItem.key] : '') + (cItem.unit ? ' ' + cItem.unit : '')}}</span>
              <van-icon v-if="cItem.isLink" name="arrow" />
            </div>
          </template>
        </van-cell>
      </div>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'VanCellList',
  props: {
    data: {
      type: Object,
      required: true
    },
    list: {
      type: Array,
      required: true
    }
  },
  methods: {
    clickEvent(item) {
      this.$emit('cellClick', item)
    }
  }
}
</script>

<style lang="scss">
  .order-row-cell {
    text-align: left;
    margin-bottom: 10px;
    padding: 0 5px;

    .padding-height-10 { padding-top: 10px; padding-bottom: 10px; }
    .padding-height-12 { padding-top: 12px; padding-bottom: 12px; }
    .padding-height-15 { padding-top: 15px; padding-bottom: 15px; }
    .padding-height-20 { padding-top: 20px; padding-bottom: 20px; }
    .font-size-12 { font-size: 12px; }
    .font-size-13 { font-size: 13px; }
    .font-size-14 { font-size: 14px; }
    .font-size-16 { font-size: 16px; }
    .font-size-18 { font-size: 18px; }
    .font-size-20 { font-size: 20px; }
    .font-size-24 { font-size: 24px; }
    .van-cell-title {
      display: flex;
      align-items: center;

      img {
        width: 28px;
        margin-right: 10px;
      }
    }
    .van-cell-right {
      display: flex;
      align-items: center;
      i.van-icon {
        color: #999999
      }
    }

    .order-total {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      height: 40px;
      line-height: 40px;

      .sum-money {
        font-size: 20px;
        font-weight: 800;
        margin-left: 10px;
      }
    }
  }
</style>
