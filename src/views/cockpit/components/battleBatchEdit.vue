<template>
  <div>
    <table-total-data :dataList="dataList" :rowData="dataInfo" :headerStyle="'top: 162px;'"></table-total-data>
    <em-table-list ref="batchEditTable" :custTableTitle="'情报批量编辑'" :tableListName="'battleBatchEdit'" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" :options="options" @onReqParams="onReqParams" @onUpdateEvent="onUpdateEvent" @updateColumnValue="updateColumnValue"></em-table-list>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { TableTotalData } from '@/components'
import { initVueDataOptions, callbackPagesInfo, isTypeof } from '@/utils/tools'
import {
  $gasdataGasstationList,
  $gasdataGasstationBattleInfoUpdate
} from '@/service/gasdata'
export default {
  name: 'battleBatchEdit',
  data: function () {
    return initVueDataOptions(this, {
      queryCustURL: {
        list: {
          url: 'gasdata/gasstation/page',
          method: 'post',
          parse: {
            tableData: ['data', 'page', 'records'],
            totalCount: ['data', 'page', 'total']
          }
        },
        name: '情报批量编辑'
      },
      dataList: [{
        name: '最新保存时间：',
        field: 'lastUpdateTime'
      }],
      dataInfo: { lastUpdateTime: '' },
      queryParams: Function,
      options: {
        finds: {
          districtId: Number(sessionStorage.getItem('wopUserDistrictId')) === 0 ? '' : Number(sessionStorage.getItem('wopUserDistrictId'))
        }
      }
    })
  },
  components: { TableTotalData },
  computed: {
    ...mapGetters({
      mode_list: 'batch_edit_mode_list',
      page_status: 'batch_edit_page_status',
      page_column: 'batch_edit_column',
      select_list: 'batch_edit_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  methods: {
    onReqParams(type, _this, callback) {
      const that = this
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { districtId: '' } })
      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          params.param[k] = v
        }
      }
      var t = setInterval(() => {
        if (_this.tableListResponse) {
          clearInterval(t)
          that.dataInfo.lastUpdateTime = _this.tableListResponse.data.saveTime
        }
      }, 100)
      callback(params)
    },
    onUpdateEvent(item, obj) {
      const field = obj.field
      const val = item[field]
      const reg = /(?:^[1-9]([0-9]+)?(?:\.[0-9]{1,2})?$)|(?:^(?:0)$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/
      if (!reg.test(val) || !val || val == 0) {
        this.$message.error('当前输入的值必须大于0或者小数点后保留2位的数')
      } else {
        // 判断值是否更改,不变则不更改
        const params = this.finds
        $gasdataGasstationList(params).then(response => {
          const res = [...new Set(response.data)] || []
          const currItem = res.filter(it => item.gasstationId == it.gasstationId)[0]
          if (currItem[field] != val) {
            $gasdataGasstationBattleInfoUpdate(item).then(res => {
              this.$message.success('保存成功')
            })
          }
        })
      }
    },
    updateColumnValue(tableData, cb) {
      cb(tableData)
    }
  }
}
</script>
<style lang="scss">
.last-update {
  padding-bottom: 12px;
}
</style>
