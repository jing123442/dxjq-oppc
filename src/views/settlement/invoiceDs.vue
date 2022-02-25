<template>
  <div class="template-main">
    <em-table-list ref="tables" :authButtonList="authButtonList" :tableListName="'log'" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams" @updateColumnValue="updateColumnValue"></em-table-list>
    <el-dialog title="订单列表" class="" :append-to-body="true" :visible.sync="orderDialog" width="80%">
      <em-table-list v-if="orderDialog" ref="tablesOrder" :tableListName="'orderList'" :axios="axios" :queryCustURL="queryCustURLOrder" :responseSuccess="response_success" :queryParam="queryParams" :page_status="order_page_status" :page_column="order_page_column" :select_list="order_select_list"  @onReqParams="onReqParamsOrder"></em-table-list>
    </el-dialog>
    <el-dialog title="审核处理" class="" :append-to-body="true" :visible.sync="dealDialog" width="80%">
      <nt-form v-if="dealDialog" ref="delTables" :rowData="dealRow" :pageColumn="page_column" :inputType="'detail'" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success"></nt-form>
      <div class="opt-box">
        <el-radio v-model="optRadio" label="1">已开票</el-radio>
        <el-radio v-model="optRadio" label="2">驳回</el-radio>
        <div class="kp" v-if="optRadio == 1">
          <div class="q">已开票凭证(请上传图片，最多三张)</div>
          <div class="img-box">
            <el-upload
              v-for="(item, index) in imgList"
              :key="index"
              :action="'#'"
              class="fileBox"
              list-type="none"
              accept=".jpg,.png"
              :multiple="true"
              :limit="3"
              :show-file-list="false"
              :on-change="(file, fileList) => changeFile(file, fileList, index)"
              :auto-upload="false">
              <div slot="default">
                <img :src="item.path ? item.path : item.defaultPath" alt="">
              </div>
            </el-upload>
          </div>
        </div>
        <div class="bh" v-if="optRadio == 2">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="驳回原因">
              <el-input type="textarea" v-model="form.reason"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
       <div slot="footer" class="dialog-footer" >
        <el-button v-for="(btnItem, index) in formBtnList.list" :key="index" :type="btnItem.bType"
                    size="small"
                    :icon="btnItem.icon" @click="checkEvent(btnItem)">{{btnItem.label}}
        </el-button>
      </div>
    </el-dialog>
    <el-dialog title="驳回原因" class="" :append-to-body="true" :visible.sync="reasonDialog" :width="add_edit_dialog" >
      <el-form v-if="reasonDialog">
       <el-form-item label="驳回原因">
          <el-input type="textarea" v-model="reason" disabled></el-input>
        </el-form-item>
      </el-form>
      <el-button v-for="(btnItem, index) in formBtnList.list" :key="index" :type="btnItem.bType"
                  size="small"
                  style="margin-bottom: 20px"
                  :icon="btnItem.icon" @click="reasonDialog = false">{{btnItem.label}}
      </el-button>
    </el-dialog>
      <el-dialog title="查看凭证" class="" :append-to-body="true" :visible.sync="voucherDialog" :width="add_edit_dialog" >
      <div class="voucher-box">
        <img v-for="(item, index) in imgVoucher" :key="index" :src="fileHost + item" alt="">
      </div>
      <el-button v-for="(btnItem, index) in formBtnList.list" :key="index" :type="btnItem.bType"
                  size="small"
                  style="margin-bottom: 20px"
                  :icon="btnItem.icon" @click="voucherDialog = false">{{btnItem.label}}
      </el-button>
    </el-dialog>
  </div>
</template>
<script>
import { $upload } from '@/service/main'
import { $dsReceiptAuditApply } from '@/service/settle'
import { initVueDataOptions, callbackPagesInfo, isTypeof, custFormBtnList } from '@/utils/tools'
import { mapGetters } from 'vuex'

export default {
  name: 'msgList',
  data() {
    return initVueDataOptions(this, {
      fileHost: this.$store.state.file.fileHost,
      dialogVisible: false,
      queryCustURL: {
        list: {
          url: '/settle/direct_sales_receipt/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '开票记录'
      },
      queryCustURLOrder: {
        list: {
          url: 'settle/gas_order/list_withtime',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '订单列表'
      },
      formBtnList: custFormBtnList(),
      orderDialog: false,
      currOrderRow: {},
      dealRow: {},
      dealDialog: false,
      optRadio: '1',
      imgList: [{
        field: '',
        path: '',
        isDisabled: false,
        defaultPath: require('@/assets/images/main/license@2x.png'),
        text: ''
      }],
      form: { reason: '' },
      reasonDialog: false,
      reason: '',
      voucherDialog: false,
      imgVoucher: []
    })
  },
  computed: {
    ...mapGetters({
      page_status: 'invoice_ds_log_page_status',
      page_column: 'invoice_ds_log_column',
      select_list: 'invoice_ds_log_select_list',
      order_page_status: 'order_list_page_status',
      order_page_column: 'invoice_order_column',
      order_select_list: 'order_list_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success',
      woporg: 'woporg'
    })
  },
  mounted: function () {
  },
  methods: {
    onListEvent(type, row) {
      // 事件
      if (type == 'audit') {
        this.dealRow = row
        this.dealDialog = true
      } else if (type == 'totalCount') {
        this.orderDialog = true
        this.currOrderRow = row
      } else if (type == 'reason') {
        this.reason = row.note
        this.reasonDialog = true
      } else if (type == 'voucher') {
        this.voucherDialog = true
        this.imgVoucher = row.proofUrl.split(',')
      }
    },
    updateColumnValue(tableData, callback) {
      tableData.forEach(item => {
        item.payDateRound = item.dateStart + ' - ' + item.dateEnd
      })
      callback(tableData)
    },
    changeFile(file, fileList, index) {
      const fileD = new FormData()
      fileD.append('file', file.raw)
      $upload(fileD).then(res => {
        if (res.data.code === 0) {
          var pathUrl = this.$store.state.file.fileHost + res.data.data
          this.imgList[index].path = pathUrl
          if (this.imgList.length < 3) {
            this.$set(this.imgList, this.imgList.length, {
              field: '',
              path: '',
              isDisabled: false,
              defaultPath: require('@/assets/images/main/license@2x.png'),
              text: ''
            })
          }
        }
      })
    },
    checkEvent(btnItem) {
      if (this.optRadio == 1) {
        // 已开票
        if (btnItem.type == 'ok') {
          const url = []
          this.imgList.forEach(item => {
            if (item.path) {
              url.push(item.path.replace(this.$store.state.file.fileHost, ''))
            }
          })
          if (url.length == 0) {
            this.$message.info('请上传开票凭证')
            return
          }
          $dsReceiptAuditApply({ applyId: this.dealRow.id, proofUrl: url.join(','), status: 2 }).then(res => {
            this.$message.success('操作成功')
            this.$refs.tables.initDataList()
            this.dealDialog = false
          })
        } else {
          this.dealDialog = false
        }
      } else if (this.optRadio == 2) {
        // 驳回
        if (btnItem.type == 'ok') {
          if (!this.form.reason) {
            this.$message.info('请填写驳回原因')
            return
          }
          $dsReceiptAuditApply({ applyId: this.dealRow.id, note: this.form.reason, status: 3 }).then(res => {
            this.$message.success('操作成功')
            this.$refs.tables.initDataList()
            this.dealDialog = false
          })
        } else {
          this.dealDialog = false
        }
      }
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { dateParam: {} } })
      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (k == 'createDate') {
            if (_this.finds.createDate) {
              params.param.dateParam.createDateFrom = v[0]
              params.param.dateParam.createDateTo = v[1]
            }
          } else if (k == 'updateDate') {
            if (_this.finds.updateDate) {
              params.param.dateParam.updateDateFrom = v[0]
              params.param.dateParam.updateDateTo = v[1]
            }
          } else {
            if (!v && v != 0) {
              params.param[k] = ''
            } else {
              params.param[k] = v
            }
          }
        }
      }
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    },
    onReqParamsOrder(type, _this, callback) {
      const row = this.currOrderRow
      var createDateFrom = row.dateStart + ' 00:00:00'
      var createDateTo = row.dateEnd + ' 23:59:59'
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { gasOrder: { carrierOrgId: this.currOrderRow.carrierOrgId, tradeType: 2 }, dateParam: { createDateFrom, createDateTo } } })

      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
<style lang="scss" scoped>
.title {
  text-align: center;
  font-size: 20px;
  color: #1c2d1c;
  font-weight: 600;
}
.publishTime {
  margin: 12px 0;
  text-align: right;
  font-size: 12px;
  color: #868b9a;
}
.main {
  font-size: 14px;
  /deep/ img {
    max-width: 100%;
  }
}
.opt-box {
  margin: 10px 50px;
  .kp {
    margin: 20px 0 40px 0px;
  }
}
.img-box {
  margin-top: 10px;
  display: flex;
}
.fileBox {
  position: relative;
  margin: 0 12px;
  width: 160px;
  height: 110px;
  border: dashed 1px #ccc;
  margin-bottom: 20px;
  &::v-deep .el-upload {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 160px;
    height: 110px;
  }
  img {
    width: 160px;
    height: 110px;
  }
}
.voucher-box {
  display: flex;
  margin: 10px;
  img {
    margin: 8px 0;
    margin-right: 12px;
    display: block;
    width: 200px;
    height: 100px;
  }
}
</style>
