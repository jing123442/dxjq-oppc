<template>
  <div class="template-main" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="正在计算平台挂牌价，请等待...">
    <em-table-list :tableListName="'listing'" :authButtonList="authButtonList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" ref="tables" :page_status="page_status" :buttonsList="buttonsList" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>

    <el-dialog title="发布申请" :visible.sync="dialogReleaseVisible" width="50%" :append-to-body="true">
      <nt-form v-if="dialogReleaseVisible" ref="release" :formRef="'releaseForm'" :rowData="releaseRow" :pageColumn="release_page_column" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="onListEventRelease"></nt-form>
    </el-dialog>
    <el-dialog title="配置液源地" :visible.sync="dialogFromVisible" width="50%" :append-to-body="true">
      <nt-form v-if="dialogFromVisible" ref="from" :formRef="'fromForm'" :rowData="fromRow" :pageColumn="from_page_column" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="onListEventFrom"></nt-form>
    </el-dialog>
    <el-dialog title="气价调节" :visible.sync="dialogMeasureVisible" width="50%" :append-to-body="true">
      <nt-form v-if="dialogMeasureVisible" ref="from" :formRef="'measureForm'" :rowData="measureRow" :pageColumn="measure_page_column" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="onMeasureEventFrom"></nt-form>
    </el-dialog>
    <el-dialog title="变更记录" :visible.sync="dialogChangeVisible" :width="add_edit_dialog" :append-to-body="true">
      <em-table-list v-if="dialogChangeVisible" :custTableTitle="'变更记录'" :tableListName="'listingLog'" :authButtonList="authButtonList" :axios="axios" :queryCustURL="queryLogCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="log_page_column" :select_list="select_list" @onReqParams="onReqParams"></em-table-list>
    </el-dialog>
  </div>
</template>
<script>
import { initVueDataOptions, callbackPagesInfo, isTypeof, custFormBtnList, formatDate } from '@/utils/tools'
import { $priceRelease, $listingPriceAlg, $updateGasstationPriceConfig, $gasstationUpdatePrice } from '@/service/strategy'
import { mapGetters } from 'vuex'

export default {
  name: 'listing',
  data() {
    return initVueDataOptions(this, {
      releaseRow: [],
      dialogReleaseVisible: false,
      fromRow: {},
      dialogFromVisible: false,
      logRow: [],
      dialogChangeVisible: false,
      measureRow: [],
      dialogMeasureVisible: false,
      fullscreenLoading: false,
      queryCustURL: {
        list: {
          url: 'strategy/price_config/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '平台挂牌价'
      },
      queryLogCustURL: {
        list: {
          url: 'strategy/release_detail/release_history',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: ''
      },
      buttonsList: [{ type: 'primary', icon: '', event: 'calc_rate', name: '平台挂牌价计算' }, { type: 'primary', icon: '', event: 'release', name: '发布申请' }]
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'price_listing_mode_list',
      page_status: 'price_listing_page_status',
      page_column: 'price_listing_column',
      select_list: 'price_listing_select_list',
      log_page_column: 'price_listing_log_column',
      from_page_column: 'price_listing_from_column',
      measure_page_column: 'price_listing_measure_column',
      release_page_column: 'price_listing_release_column',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () {},
  methods: {
    onListEvent(type, row) {
      row._btn = {}
      if (type == 'calc_rate') {
        this.algListingPrice()
      } else if (type == 'release') {
        row._btn = custFormBtnList()
        this.$set(row, 'releaseTime', new Date())
        this.releaseRow = row
        this.dialogReleaseVisible = true
      } else if (type == 'config_source') {
        row._btn = custFormBtnList()
        this.fromOldRow = Object.assign({}, row)
        this.fromRow = row
        this.dialogFromVisible = true
      } else if (type == 'config_gas_price') {
        row._btn = custFormBtnList()
        this.measureRow = row
        this.dialogMeasureVisible = true
      } else {
        this.currRow = row
        this.dialogChangeVisible = true
      }
    },
    algListingPrice() {
      this.fullscreenLoading = true
      $listingPriceAlg().then(response => {
        this.fullscreenLoading = false
        this.$refs.tables.initDataList()
      }).catch(() => {
        this.fullscreenLoading = false
      })
    },
    onListEventFrom(btnObj, row) {
      if (btnObj.type == 'ok') {
        this.$refs.from.$refs.fromForm.validate((valid) => {
          if (valid) {
            if (this.fromOldRow.lngFromId == row.lngFromId) {
              return false
            }
            const params = {
              gasstationId: row.gasstationId,
              lngFromId: row.lngFromId,
              lngFromName: row.lngFromName
            }

            $updateGasstationPriceConfig(params).then((res) => {
              this.$message.success(res.message)

              const data = res.data

              row.platformPrice = data.platformPrice
              row.harbourPrice = data.harbourPrice
              row.benefit = data.benefit
              row.freight = data.freight
              row.profit = data.profit
              row.gasprice = data.gasprice
            })
          } else {
            console.log('error submit!!')
          }
        })
      } else {
        row.lngFromId = this.fromOldRow.lngFromId
        row.lngFromName = this.fromOldRow.lngFromName
      }
      this.dialogFromVisible = false
    },
    onMeasureEventFrom(btnObj, row) {
      if (btnObj.type == 'ok') {
        this.$refs.from.$refs.measureForm.validate((valid) => {
          if (valid) {
            const params = {
              gasstationId: row.gasstationId,
              preGasprice: row.measureMoney
            }

            $gasstationUpdatePrice(params).then((res) => {
              this.$message.success(res.message)

              row.gasprice = row.measureMoney
            })
            this.dialogMeasureVisible = false
          } else {
            console.log('error submit!!')
          }
        })
      } else {
        this.dialogMeasureVisible = false
      }
    },
    onListEventRelease(btnObj, row) {
      if (btnObj.type == 'ok') {
        this.$refs.release.$refs.releaseForm.validate((valid) => {
          if (valid) {
            var releaseTime = formatDate(row.releaseTime, 'yyyy-MM-dd') + ' 00:00:00'

            const params = {
              releaseTime: releaseTime
            }

            $priceRelease(params).then((res) => {
              this.$message.success(res.message)

              this.$refs.tables.initDataList()
            })
          } else {
            console.log('error submit!!')
          }
        })
      }
      this.dialogReleaseVisible = false
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { } })

      if (_this.tableListName == 'listingLog') {
        params.param.gasstationId = this.currRow.gasstationId
      }
      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (v !== '') params.param[k] = v
        }
      }
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
