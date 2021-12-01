<template>
  <div class="discounts-carrier template-main">
    <em-table-list :tableListName="'carrierRebate'" :authButtonList="authButtonList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" ref="tables" :page_status="page_status" :buttonsList="buttonsList" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @updateColumnValue="updateColumnValue" @onReqParams="onReqParams"></em-table-list>
    <el-dialog title="添加物流公司" :visible.sync="dialogCarrierAddVisible" width="80%" :append-to-body="true" @close="dialogClose">
      <nt-infinite-transfer v-if="dialogCarrierAddVisible"
                            :dataList="carrierList"
                            :selectedList="selectedList"
                            :primary="'orgId'"
                            :fields="'orgName'"
                            :dataTotal="carrierTotal"
                            @onload="onload"
                            @remote="remote "></nt-infinite-transfer>
       <!-- 按钮 -->
      <div class="el-del-btn-item">
        <div class="btn-item-footer">
          <el-button v-for="(btnItem, index) in formBtnList.list" :key="index" :type="btnItem.bType"
                     size="small"
                     :icon="btnItem.icon" @click="btnClickEvent(btnItem)">{{btnItem.label}}
          </el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog :title="rebateOptType == 'CLOSE' ? '确认关闭' : rebateOptType == 'OPEN' ? '确认开启' : ''" :append-to-body="true" :visible.sync="dialogVisibleRebateCloseOrOpen" :width="del_dialog" top="30vh">
      <div style="padding: 20px 0">{{rebateOptType == 'CLOSE' ? rebateCloseTip : rebateOptType == 'OPEN' ? rebateOpenTip : ''}}</div>
       <!-- 按钮 -->
      <div slot="footer" class="dialog-footer" v-if="rebateOptType == 'CLOSE'">
        <el-button v-for="(btnItem, index) in rebateCloseBtnList.list" :key="index" :type="btnItem.bType"
                    size="small"
                    :icon="btnItem.icon" @click="rebateBtnEvent(btnItem)">{{btnItem.label}}
        </el-button>
      </div>
      <div slot="footer" class="dialog-footer" v-else-if="rebateOptType == 'OPEN'">
        <el-button v-for="(btnItem, index) in rebateOpenBtnList.list" :key="index" :type="btnItem.bType"
                    size="small"
                    :icon="btnItem.icon" @click="rebateBtnEvent(btnItem)">{{btnItem.label}}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { initVueDataOptions, custFormBtnList, callbackPagesInfo, isTypeof } from '@/utils/tools'
import { $strategyCarrierRebateGasNum, $strategyCarrierRebateAddCarriers, $strategyCarrierRebateUpdate } from '@/service/strategy'
import { $userOrgCarrier } from '@/service/user'
import { mapGetters } from 'vuex'
export default {
  data() {
    return initVueDataOptions(this, {
      queryCustURL: {
        list: {
          url: 'strategy/carrier_rebate/carrier_page',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '物流公司专享优惠'
      },
      buttonsList: [{ type: 'primary', icon: '', event: 'carrier_rebate_add', name: '添加物流公司' }, { type: 'primary', icon: '', event: 'rebate_order_detail', name: '优惠订单详情' }, { type: 'primary', icon: '', event: 'config_record', name: '配置记录' }],
      dialogCarrierAddVisible: false,
      carrierList: [],
      carrierTotal: 0,
      formBtnList: custFormBtnList(),
      pages: {
        page: 1,
        size: 10
      },
      selectedList: [],
      rebateCloseBtnList: {
        iShow: true,
        list: [{ bType: 'info', icon: '', type: 'cancel', label: '取消' }, { bType: 'primary', icon: '', type: 'ok', label: '确认关闭' }]
      },
      rebateOpenBtnList: {
        iShow: true,
        list: [{ bType: 'info', icon: '', type: 'cancel', label: '取消' }, { bType: 'primary', icon: '', type: 'ok', label: '确认开启' }]
      },
      dialogVisibleRebateCloseOrOpen: false,
      currentRow: {},
      rebateOptType: 'CLOSE',
      rebateCloseTip: '',
      rebateOpenTip: ''
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'discount_carrier_mode_list',
      page_status: 'discount_carrier_page_status',
      page_column: 'discount_carrier_column',
      select_list: 'discount_carrier_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  methods: {
    async updateColumnValue(dataList, cb) {
      for (const item of dataList) {
        await this.getStrategyCarrierRebateGasNum(item).then(res => {
          item.num = res
        })
      }
      cb(dataList)
    },
    getStrategyCarrierRebateGasNum(item) {
      return new Promise((resolve, reject) => {
        $strategyCarrierRebateGasNum({ carrierOrgId: item.carrierOrgId }).then(res => {
          resolve(res.data)
        }).catch(e => { reject(e) })
      })
    },
    onload(keyword) {
      var params = {
        page: this.pages.page,
        size: this.pages.size,
        param: {
          keyword,
          org: {
            orgSubType: 21
          }
        }
      }
      $userOrgCarrier(params).then(res => {
        this.carrierTotal = res.data.total
        this.carrierList.push(...res.data.records)
        this.pages.page++
      })
    },
    remote() {
      this.pages.page = 1
      this.carrierList = []
    },
    onListEvent(type, row) {
      if (type == 'carrier_rebate_add') {
        this.dialogCarrierAddVisible = true
      } else if (type == 'rebateClose') {
        this.rebateOptType = 'CLOSE'
        this.dialogVisibleRebateCloseOrOpen = true
        this.currentRow = row
        this.rebateCloseTip = `点击'确认关闭'，则${this.currentRow.carrierOrgName}在所有加气站的优惠都将取消，还请谨慎操作`
      } else if (type == 'rebateOpen') {
        this.rebateOptType = 'OPEN'
        this.dialogVisibleRebateCloseOrOpen = true
        this.currentRow = row
        this.rebateOpenTip = `点击'确认开启'，则${this.currentRow.carrierOrgName}在所有加气站的优惠都将开启，还请谨慎操作`
      } else if (type == 'rebateConfig') {
        this.$router.push({
          path: './discountsCarrier/rebateConfig',
          query: { carrierOrgId: row.carrierOrgId, carrierOrgName: row.carrierOrgName.trim() }
        })
      } else if (type == 'config_record') {
        this.$router.push({
          path: './discountsCarrier/rebateConfigRecords'
        })
      } else if (type == 'rebate_order_detail') {
        this.$router.push({
          path: './discountsCarrier/rebateOrder'
        })
      }
    },
    btnClickEvent(item) {
      if (item.type == 'ok') {
        if (this.selectedList.length === 0) {
          this.$message.error('请选择要添加的物流公司')
          return
        }
        const temp = []
        this.selectedList.forEach(item => {
          temp.push({
            carrierOrgId: item.orgId,
            carrierOrgName: item.orgName
          })
        })
        const params = [...temp]
        $strategyCarrierRebateAddCarriers(params).then(res => {
          this.dialogCarrierAddVisible = false
          this.$message.success('配置成功！')
          this.$refs.tables.initDataList()
        })
      } else {
        this.dialogCarrierAddVisible = false
      }
    },
    rebateBtnEvent(item) {
      if (item.type == 'ok') {
        if (this.rebateOptType == 'CLOSE') {
          const params = { id: this.currentRow.id, carrierOrgId: this.currentRow.carrierOrgId, status: 2 }
          $strategyCarrierRebateUpdate(params).then(res => {
            this.dialogVisibleRebateCloseOrOpen = false
            this.$message.success('关闭成功！')
            this.$refs.tables.initDataList()
          })
        } else if (this.rebateOptType == 'OPEN') {
          const params = { id: this.currentRow.id, carrierOrgId: this.currentRow.carrierOrgId, status: 1 }
          $strategyCarrierRebateUpdate(params).then(res => {
            this.dialogVisibleRebateCloseOrOpen = false
            this.$message.success('开启成功！')
            this.$refs.tables.initDataList()
          })
        }
      } else {
        this.dialogVisibleRebateCloseOrOpen = false
      }
    },
    dialogClose() {
      this.configRow = {}
      this.pages.page = 1
      this.carrierList = []
      this.selectedList = []
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { } })
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
<style lang="scss" scoped>
</style>
