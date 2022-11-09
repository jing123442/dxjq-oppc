<template>
  <div class="template-main" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="正在计算平台挂牌价，请等待...">
    <em-table-list :tableListName="'listing'" :authButtonList="authButtonList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" ref="tables" :page_status="page_status" :buttonsList="buttonsList" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
    <el-dialog title="发布申请" :visible.sync="dialogReleaseVisible" width="50%" :append-to-body="true">
      <nt-form v-if="dialogReleaseVisible" ref="release" :formRef="'releaseForm'" :rowData="releaseRow" :pageColumn="release_page_column" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="onListEventRelease"></nt-form>
    </el-dialog>
    <el-dialog title="配置液源地" :visible.sync="dialogFromVisible" width="50%" :append-to-body="true">
      <nt-form v-if="dialogFromVisible" ref="from" :formRef="'fromForm'" :rowData="fromRow" :pageColumn="from_page_column" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="onListEventFrom"></nt-form>
    </el-dialog>
    <el-dialog :title="`${currRow?.gasstationName}站 单站调价（单位：元/公斤）`" :visible.sync="dialogMeasureVisible" width="80%" :append-to-body="true">
      <el-form :inline="true" :model="formInline" :rules="rules" class="demo-form-inline">
        <el-form-item label="零售价" prop="retailPrice">
          <el-input v-model="formInline.retailPrice" placeholder="零售价"></el-input>
        </el-form-item>
        <el-form-item>=</el-form-item>
        <el-form-item label="总利润" prop="profit">
          <el-input v-model="formInline.profit" placeholder="总利润"></el-input>
        </el-form-item>
        <el-form-item>+</el-form-item>
        <el-form-item label="运费" prop="freight">
          <el-input v-model="formInline.freight" placeholder="运费"></el-input>
        </el-form-item>
        <el-form-item>+</el-form-item>
        <el-form-item label="出港价" prop="harbourPrice">
          <el-input v-model="formInline.harbourPrice" placeholder="出港价"></el-input>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item>
          <el-radio v-model="radio" label="1">立即执行</el-radio>
          <span class="grey-text">（作废 执行中、已预约未执行 调价）</span>
        </el-form-item>
        <br />
        <el-form-item>
          <el-radio v-model="radio" label="1">预约执行</el-radio>
          <el-form-item prop="updateDate">
            <el-date-picker
              v-model="formInline.updateDate"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <span>执行</span>
          <span class="grey-text">（作废 执行中、已预约未执行 调价）</span>
        </el-form-item>
        <br />
        <el-form-item style="text-align: right; display: block;">
          <el-button @click="onCancel">取消</el-button>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :title="`${currRow?.gasstationName}站 调价记录`" :visible.sync="dialogChangeVisible" :width="add_edit_dialog" :append-to-body="true">
      <em-table-list v-if="dialogChangeVisible" :custTableTitle="`${currRow?.gasstationName}站 调价记录`" :tableListName="'listingLog'" :authButtonList="authButtonList" :axios="axios" :queryCustURL="queryLogCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="log_page_column" :select_list="log_select_list" @onReqParams="onReqParams"></em-table-list>
    </el-dialog>
  </div>
</template>
<script>
import { initVueDataOptions, callbackPagesInfo, isTypeof, formatDate } from '@/utils/tools'
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
      currRow: {},
      dialogMeasureVisible: false,
      fullscreenLoading: false,
      queryCustURL: {
        list: {
          // url: 'strategy/price_config_snp/find',
          url: 'strategy/price_config/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        add: {
          url: 'strategy/price_config_snp_plan/add',
          method: 'post'
        },
        del: {
          url: 'strategy/price_config_snp_plan/remove',
          name: ['gasstationName'],
          method: 'post',
          props: {
            gasstationId: 'gasstationId'
          }
        },
        name: '中石化零售价'
      },
      queryLogCustURL: {
        list: {
          url: 'strategy/price_config_snp_plan/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: ''
      },
      buttonsList: [{ type: 'primary', icon: '', event: 'add', name: '添加名单' }],
      dialogAddVisible: false,
      formInline: {
        retailPrice: '',
        profit: '',
        freight: '',
        harbourPrice: '',
        updateDate: ''
      },
      radio: '1',
      rules: {
        retailPrice: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        profit: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        freight: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        harbourPrice: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ]
      }
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'price_snpRetail_mode_list',
      page_status: 'price_snpRetail_page_status',
      page_column: 'price_snpRetail_column',
      select_list: 'price_snpRetail_select_list',
      log_page_column: 'price_snpRetail_log_column',
      log_select_list: 'price_snpRetail_log_select_list',
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
      this.currRow = row
      if (type === 'change_price_list') {
        this.dialogChangeVisible = true
      } else if (type === 'change_price') {
        this.dialogMeasureVisible = true
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
    },
    onCancel() {
      console.log('--')
    },
    onSubmit() {
      console.log('--')
    }
  }
}
</script>
<style lang="scss" scoped>
:deep(.el-divider--horizontal) {
  margin: 0 0 16px;
}
.demo-form-inline {
  padding-bottom: 5px;
  .grey-text {
    color: #999;
  }
}
</style>
