<template>
  <div class="rebate-config template-main">
    <em-table-list :tableListName="'rebateConfig'" :authButtonList="authButtonList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" ref="tables" :page_status="page_status" :buttonsList="buttonsList" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
    <el-dialog title="添加优惠加气站" :visible.sync="dialogfillerAddVisible" width="80%" :append-to-body="true" @close="dialogClose">
      <nt-infinite-transfer v-if="dialogfillerAddVisible"
                            :dataList="carrierList"
                            :selectedList="selectedList"
                            :primary="'orgId'"
                            :fields="'orgShortName'"
                            :dataTotal="carrierTotal"
                            @onload="onload"
                            @remote="remote "></nt-infinite-transfer>
        <div style="margin: 24px 0 0 60px">将选中的加气站优惠设定为</div>
        <nt-form v-if="dialogfillerAddVisible" ref="config" :formRef="'rebateFillerAddRow'" :rowData="rebateFillerAddRow" :pageColumn="form_page_column" :selectList="form_select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="btnClickEvent"></nt-form>
    </el-dialog>
    <el-dialog title="优惠编辑" :append-to-body="true" :visible.sync="dialogVisibleRebateEdit" width="80%">
      <nt-form v-if="dialogVisibleRebateEdit" ref="configEdit" :formRef="'rebateEditRow'" :rowData="rebateEditRow" :pageColumn="rebate_edit_page_column" :selectList="rebate_edit_select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="btnClickEventRebateEdit"></nt-form>
    </el-dialog>
    <el-dialog title="确认关闭" :append-to-body="true" :visible.sync="dialogVisibleRebateClose" :width="del_dialog" top="30vh">
      <div style="padding: 20px 0">点击'确认关闭'，则{{currentRow.carrierOrgName}}在所有加气站的优惠都将取消，还请谨慎操作</div>
      <div slot="footer" class="dialog-footer" >
        <el-button v-for="(btnItem, index) in rebateCloseBtnList.list" :key="index" :type="btnItem.bType"
                    size="small"
                    :icon="btnItem.icon" @click="rebateCloseEvent(btnItem)">{{btnItem.label}}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { initVueDataOptions, custFormBtnList, callbackPagesInfo, isTypeof } from '@/utils/tools'
import { $strategyCarrierGasstationRebateDelete, $strategyCarrierRebateAddGasstations, $strategyCarrierGasstationRebateUpdate } from '@/service/strategy'
import { $userOrgList } from '@/service/user'
import { mapGetters } from 'vuex'
export default {
  data() {
    return initVueDataOptions(this, {
      queryCustURL: {
        list: {
          url: 'strategy/carrier_gasstation_rebate/gasstation_page',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '物流公司优惠配置'
      },
      buttonsList: [{ type: 'primary', icon: '', event: 'rebate_gasstation_add', name: '新增优惠加气站' }],
      dialogfillerAddVisible: false,
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
      dialogVisibleRebateClose: false,
      currentRow: {},
      rebateFillerAddRow: {},
      dialogVisibleRebateEdit: false,
      rebateEditRow: {}
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'rebate_config_mode_list',
      page_status: 'rebate_config_page_status',
      page_column: 'rebate_config_column',
      select_list: 'rebate_config_select_list',
      form_page_column: 'rebate_filler_add_column',
      form_select_list: 'rebate_filler_add_select_list',
      rebate_edit_page_column: 'rebate_edit_column',
      rebate_edit_select_list: 'rebate_edit_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created() {
  },
  methods: {
    onload(keyword) {
      var params = {
        page: this.pages.page,
        size: this.pages.size,
        param: {
          org: {
            orgName: keyword,
            orgType: 1
          }
        }
      }
      $userOrgList(params).then(res => {
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
      if (type == 'rebate_gasstation_add') {
        this.rebateFillerAddRow._btn = custFormBtnList()
        this.dialogfillerAddVisible = true
      } else if (type == 'gasRebateClose') {
        this.dialogVisibleRebateClose = true
        this.currentRow = row
      } else if (type == 'rebateEdit') {
        this.dialogVisibleRebateEdit = true
        this.rebateEditRow = row
        this.rebateEditRow._btn = custFormBtnList()
      }
    },
    btnClickEvent(item) {
      if (item.type == 'ok') {
        if (this.selectedList.length === 0) {
          this.$message.error('请选择要添加的优惠加气站')
          return
        }
        if (this.rebateFillerAddRow.rebate <= 0) {
          this.$message.error('享受优惠额度必须大于0')
          return
        }
        const temp = []
        this.selectedList.forEach(item => {
          temp.push({
            rebate: this.rebateFillerAddRow.rebate,
            truckType: this.rebateFillerAddRow.truckType,
            gasstationId: item.orgId,
            gasstationShortName: item.orgShortName,
            carrierOrgId: this.$route.query.carrierOrgId,
            carrierOrgName: this.$route.query.carrierOrgName
          })
        })
        const params = [...temp]
        this.$refs.config.$refs.rebateFillerAddRow.validate(valid => {
          if (valid) {
            $strategyCarrierRebateAddGasstations(params).then(response => {
              this.dialogfillerAddVisible = false
              this.$message.success('添加成功！')
              this.$refs.tables.initDataList()
            })
          }
        })
      } else {
        this.dialogfillerAddVisible = false
      }
    },
    btnClickEventRebateEdit(item) {
      if (item.type == 'ok') {
        if (this.rebateEditRow.rebate <= 0) {
          this.$message.error('享受优惠额度必须大于0')
          return
        }
        this.$refs.configEdit.$refs.rebateEditRow.validate(valid => {
          if (valid) {
            const params = {
              id: this.rebateEditRow.id,
              rebate: this.rebateEditRow.rebate,
              truckType: this.rebateEditRow.truckType,
              gasstationId: this.rebateEditRow.gasstationId,
              gasstationShortName: this.rebateEditRow.gasstationShortName,
              carrierOrgId: this.$route.query.carrierOrgId,
              carrierOrgName: this.$route.query.carrierOrgName
            }
            $strategyCarrierGasstationRebateUpdate(params).then(response => {
              this.dialogVisibleRebateEdit = false
              this.$message.success('编辑成功')
              this.$refs.tables.initDataList()
            })
          }
        })
      } else {
        this.dialogVisibleRebateEdit = false
      }
    },
    rebateCloseEvent(item) {
      if (item.type == 'ok') {
        const params = { id: this.currentRow.id, carrierOrgId: this.currentRow.carrierOrgId }
        $strategyCarrierGasstationRebateDelete(params).then(res => {
          this.dialogVisibleRebateClose = false
          this.$message.success('关闭成功！')
          this.$refs.tables.initDataList()
        })
      } else {
        this.dialogVisibleRebateClose = false
      }
    },
    dialogClose() {
      this.configRow = {}
      this.pages.page = 1
      this.carrierList = []
      this.selectedList = []
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { carrierOrgId: this.$route.query.carrierOrgId } })
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
