<template>
  <div class="template-main">
    <em-table-list ref="tables" :authButtonList="authButtonList" :tableListName="'withdApply'" :axios="axios" :queryCustURL="queryCustURL" :buttonsList="buttonsList" :responseSuccess="response_success" :queryParam="queryParams" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams" @updateColumnValue="updateColumnValue"></em-table-list>
    <el-dialog title="操作日志" class="" :append-to-body="true" :visible.sync="orderDialogVisible" width="80%">
      <em-table-list v-if="orderDialogVisible" ref="tablesLog" :tableListName="'withdLog'" :axios="axios" :queryCustURL="queryLogCustURL" :responseSuccess="response_success" :queryParam="queryParams" :page_status="page_status" :page_column="page_log_column" :select_list="select_list"  @onReqParams="onReqParamsOrder"></em-table-list>
    </el-dialog>
    <el-dialog :title="optTitle" class="" :append-to-body="true" :visible.sync="dealDialog" width="80%">
      <el-row v-if="dealDialog">
        <div class="apply-status" :class="applyStatusToInfo(dealRow.applyStatus, 'cls')">
          {{ applyStatusToInfo(dealRow.applyStatus, 'name') }}
        </div>
        <el-col :span="dealRow.applyData.length > 0 ? 7 : 1" style="padding-top: 80px;">
          <div v-for="(item, index) of dealRow.applyData" :key="index" class="operate-comment-item">
            <span class="time">{{ item.createrDate | formateTData('all') }}</span>
            <span class="name">{{ item.createrName }}</span>
            <span class="comment">{{ item.operateComment }}</span>
          </div>
        </el-col>
        <el-col :span="dealRow.applyData.length > 0 ? 17 : 23" style="border-right: 1px dotted #e8e8e8;">
          <el-form ref="clientRow" :model="dealRow" :rules="dealRules" size="small" label-width="120px" class="rules-form-config" label-position="left" style="padding-left: 30px;">
            <el-form-item label="加气站" style="margin-bottom: 0;">{{ dealRow.gasstationName }}</el-form-item>
            <el-form-item label="账期" style="margin-bottom: 0;">{{ dealRow.startDate }} / {{ dealRow.endDate }}</el-form-item>
            <el-form-item label="服务费总金额" style="margin-bottom: 0;">{{ dealRow.serviceFee ? dealRow.serviceFee + ' 元' : '-' }}</el-form-item>
            <span v-for="(item, index) of dealRow.fapiaoInfoList" :key="index">
              <el-form-item label="发票文件" style="margin-bottom: 0;" v-if="!(dealRow.applyStatus == 1 && dealRow.optType === 'find')">
                <el-image style="width: 100px; height: 70px" :src="item.fapiaoUrl" :preview-src-list="[item.fapiaoUrl]"></el-image>
              </el-form-item>
            <el-form-item label="发票信息" style="margin-bottom: 0;" v-if="!(dealRow.applyStatus == 1 && dealRow.optType === 'find')">{{ item.fapiaoNum }} | {{ item.fapiaoAmount }}</el-form-item>
            </span>
            <el-form-item label="发票总金额" style="margin-bottom: 0;" v-if="!(dealRow.applyStatus == 1 && dealRow.optType === 'find')">{{ dealRow.totalAmount ? dealRow.totalAmount + ' 元' : '-' }}</el-form-item>
            <el-form-item label="" v-if="dealRow.optType === 'first' || dealRow.optType === 'review'">
              <el-radio v-model="optRadio" label="1">通过</el-radio>
              <el-radio v-model="optRadio" label="2">驳回</el-radio>
            </el-form-item>
            <el-form-item v-if="(dealRow.optType === 'first' || dealRow.optType === 'review') && optRadio == 2" label="驳回原因">
              <el-input type="textarea" v-model="dealRow.reason"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
       <div slot="footer" class="dialog-footer" >
        <el-button v-for="(btnItem, index) in formBtnList.list" :key="index" :type="btnItem.bType"
                    size="small"
                    :icon="btnItem.icon" @click="checkEvent(btnItem)">{{btnItem.label}}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { $upload } from '@/service/main'
import { $settleDirectApplyLog, $settleDirectApplyFapiao } from '@/service/settle'
import { initVueDataOptions, callbackPagesInfo, isTypeof, custFormBtnList } from '@/utils/tools'
import { mapGetters } from 'vuex'

export default {
  name: 'msgList',
  data() {
    return initVueDataOptions(this, {
      fileHost: this.$store.state.file.fileHost,
      orderDialogVisible: false,
      queryCustURL: {
        list: {
          url: 'settle/direct_gasstation_fee_apply/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '提现申请'
      },
      queryLogCustURL: {
        list: {
          url: 'settle/direct_gasstation_fee_apply_log/find_by_user',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '操作日志'
      },
      buttonsList: [{ type: 'primary', icon: '', event: 'log', name: '变更记录' }],
      formBtnList: custFormBtnList(),
      dealRow: {},
      dealRules: {},
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
      reason: '',
      optTitle: '查看'
    })
  },
  computed: {
    ...mapGetters({
      page_status: 'settlement_direct_withd_apply_page_status',
      page_column: 'settlement_direct_withd_apply_column',
      select_list: 'settlement_direct_withd_apply_select_list',
      page_log_column: 'settlement_direct_withd_apply_log_column',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success',
      woporg: 'woporg'
    })
  },
  mounted: function () {
  },
  methods: {
    async onListEvent(type, row) {
      // 事件
      if (type == 'log') {
        this.orderDialogVisible = true
      } else {
        const params = { applyId: row.id }
        const data = await $settleDirectApplyLog(params).then(response => {
          return response.data
        })
        if (type == 'first') {
          this.optTitle = '初审中'
        } else if (type == 'review') {
          this.optTitle = '复审中'
        }
        const fapiaoAmountObj = row.fapiaoAmount ? JSON.parse(row.fapiaoAmount) : {}
        const fapiaoNumObj = row.fapiaoNum ? JSON.parse(row.fapiaoNum) : {}

        // 重定义发票信息
        const fapiaoInfoList = []
        Object.keys(fapiaoAmountObj).forEach(item => {
          fapiaoInfoList.push({
            fapiaoAmount: fapiaoAmountObj[item] || '-',
            fapiaoNum: item,
            fapiaoUrl: fapiaoNumObj[item]
          })
        })
        row.fapiaoInfoList = fapiaoInfoList

        this.optRadio = '1'
        row.applyData = data
        this.dealRow = row
        this.dealRow.optType = type
        this.dealDialog = true
      }
    },
    applyStatusToInfo(status, type) {
      const result = {
        cls: 'default',
        name: '待申请'
      }
      if (status == 5) {
        result.cls = 'fail'
        result.name = '驳回'
      } else if (status == 4) {
        result.cls = 'success'
        result.name = '申请通过'
      } else if (status == 3) {
        result.cls = 'review'
        result.name = '复审中'
      } else if (status == 2) {
        result.cls = 'first'
        result.name = '初审中'
      }

      return result[type]
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
      // 通过和驳回
      if (btnItem.type == 'ok') {
        const params = {
          applyId: this.dealRow.id,
          applyStatus: this.optRadio == 2 ? 5 : (this.dealRow.applyStatus == 2 ? 3 : 4)
        }
        if (this.optRadio == 2) {
          if (!this.dealRow.reason) {
            this.$message.info('请填写驳回原因')
            return
          }
          params.note = this.dealRow.reason
        }
        $settleDirectApplyFapiao(params).then(res => {
          this.$message.success('操作成功')
          this.$refs.tables.initDataList()
          this.dealDialog = false
        })
      } else {
        this.dealDialog = false
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
      const params = Object.assign({}, callbackPagesInfo(_this), { params: {} })

      callback(params)
    }
  }
}
</script>
<style lang="scss" scoped>
.operate-comment-item {
  display: flex;
  padding: 5px 0 5px 20px;
  span {
    display: inline-block;
    margin-right: 10px;
    &.time {
      width: 140px;
    }
    &.name {
      width: 60px;
    }
    &.comment {
      flex: 1;
    }
  }
}
.apply-status {
  border: 1px dashed transparent;
  background-color: transparent;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  text-align: center;
  line-height: 70px;
  font-size: 12px;
  transform: rotate(-45deg);
  position: absolute;
  &.default {
    color: rgba(0, 0, 0, .9);
    border-color: rgba(0, 0, 0, .9);
    background-color: rgba(0, 0, 0, .1);
  }
  &.first {
    color: rgba(2, 125, 180, .9);
    border-color: rgba(2, 125, 180, .9);
    background-color: rgba(2, 125, 180, .2);
  }
  &.review {
    color: rgba(0, 0, 191, .7);
    border-color: rgba(0, 0, 191, .9);
    background-color: rgba(0, 0, 191, .1);
  }
  &.success {
    color: rgba(75, 121, 2, .9);
    border-color: rgba(75, 121, 2, .9);
    background-color: rgba(75, 121, 2, .1);
  }
  &.fail {
    color: rgba(184, 116, 26, .9);
    border-color: rgba(184, 116, 26, .9);
    background-color: rgba(184, 116, 26, .1);
  }
}
</style>
