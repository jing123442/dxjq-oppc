<template>
  <div>
    <div class="record-top">
      <div class="date-select" @click="date.status = !date.status">
        <span class="select-title">{{date.currDate | formatDate('yyyy年MM月')}}</span>
        <van-icon class="select-right-image" name="arrow-down" />
      </div>
    </div>

    <van-popup v-model="date.status" position="bottom" :style="{ height: '40%' }">
      <van-datetime-picker
        v-model="date.currDate"
        type="year-month"
        :min-date="date.minDate"
        :max-date="date.maxDate"
        :formatter="formatter"
        @cancel="onCancel"
        @confirm="onConfirm" />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'DatePicker',
  data() {
    return {
      date: {
        status: false,
        currDate: new Date(),
        minDate: new Date(2019, 0, 1),
        maxDate: new Date()
      }
    }
  },
  methods: {
    onConfirm() {
      this.date.status = false
      this.$emit('confirm', this.date.currDate)
    },
    onCancel() {
      this.date.status = false
    },
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`
      } else if (type === 'month') {
        return `${value}月`
      }
      return value
    }
  }
}
</script>

<style lang="scss">
  .record-top {
    padding: 15px;
    background: #F4F4F4;

    .date-select {
      display: flex;
      align-items: center;
      justify-content: center;
      background: white;
      height: 30px;
      border-radius: 15px;
      line-height: 30px;
      width: 130px;

      .select-right-image {
        margin-left: 8px;
        width: 20px;
        color: #cccccc;
      }
    }
  }
</style>
