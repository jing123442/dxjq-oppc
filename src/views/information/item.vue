<template>
  <div class='mine-page-warp' v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="正在获取指标数据，请等待...">
    <div style="display: flex;justify-content: flex-start;align-items: center;padding-left: 60px;">
      <div style="font-size: 14px;color: #606266;">选择日期</div>
      <el-date-picker v-model="currDate" @change="updateEventDate" style="width: 200px;margin-left: 5px;" size="small" type="date" placeholder="选择日期"></el-date-picker>
    </div>
    <nt-form :rowData="row" :pageColumn="page_column" :axios="axios" :response_success="response_success" @onListEvent="onListEvent"></nt-form>
  </div>
</template>

<script>
import { custFormBtnList, formateTData, initVueDataOptions } from '@/utils/tools'
import { mapGetters } from 'vuex'
import { $informationFindItem, $informationSaveItem } from '@/service/information'
export default {
  data() {
    return initVueDataOptions(this, {
      row: {},
      initRow: {},
      fullscreenLoading: true,
      currDate: formateTData(new Date(), 'date')
    })
  },
  computed: {
    ...mapGetters({
      page_column: 'information_item_column',
      response_success: 'response_success',
      wopuser: 'wopuser'
    })
  },
  created() {
    this.initData(this.currDate)
  },
  methods: {
    async initData(date) {
      const tmpRow = {}
      this.fullscreenLoading = true
      tmpRow.northWestAvgPrice = await this.getItemInfo('northWestAvgPrice', date)
      tmpRow.slotBatch = await this.getItemInfo('slotBatch', date)
      tmpRow.northChina = await this.getItemInfo('northChina', date)
      tmpRow.eastChina = await this.getItemInfo('eastChina', date)
      tmpRow.southChina = await this.getItemInfo('southChina', date)
      tmpRow.liquidOwnership = await this.getItemInfo('liquidOwnership', date)
      tmpRow.operatingRate = await this.getItemInfo('operatingRate', date)

      tmpRow._btn = custFormBtnList()

      this.fullscreenLoading = false
      this.row = tmpRow
    },
    async getItemInfo(type, date) {
      const params = {
        infoDate: date,
        itemId: type
      }
      return await $informationFindItem(params).then(res => {
        res = res || {}
        if (res.code === 0) {
          return res.data && res.data.value ? res.data.value : ''
        } else {
          return ''
        }
      })
    },
    onListEvent(obj) {
      if (obj.type === 'ok') {
        const params = []
        const fieldList = ['eastChina', 'liquidOwnership', 'northChina', 'northWestAvgPrice', 'operatingRate', 'slotBatch', 'southChina']
        const fieldName = ['华东槽批量', '液厂保有量', '华北槽批量', '西北液厂均价', '液厂开工率', '槽批量', '华南槽批量']
        const fieldUnit = ['吨', '万方/日', '吨', '元/吨', '', '吨', '吨']

        fieldList.forEach((item, index) => {
          if (this.row[item]) {
            params.push({
              infoDate: formateTData(this.currDate, 'date'),
              itemId: item,
              itemName: fieldName[index],
              type: 'LNG',
              unit: fieldUnit[index],
              value: this.row[item]
            })
          }
        })

        $informationSaveItem(params).then(res => {
          this.$message.success(res.message)
        })
      }
    },
    updateEventDate() {
      this.initData(formateTData(this.currDate, 'date'))
    }
  }
}

</script>

<style lang='scss'>
.mine-page-warp {
  margin: 0;
  padding: 30px 0 80px;
  background-color: #ffffff;
}

</style>
