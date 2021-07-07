<template>
  <div class="orderManage template-main">
    <em-table-list :custTableTitle="'订单列表'" :tableListName="'order'" ref="order" :axios="axios" :queryCustURL="queryTableCustURL" :responseSuccess="response_success" :buttonsList="buttonsList" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onReqParams="onReqParams" @onListEvent="onListTableEvent"></em-table-list>
    <el-dialog title="选择上传类型" :append-to-body="true" :visible.sync="dialogVisible" :width="add_edit_dialog">
      <el-form v-if="dialogVisible" size="small" label-position="left">
        <el-form-item>
          <div>
            <i class="el-icon-download"></i>
            <span style="display: inline-block;padding-left: 2px;">下载模板</span>
          </div>
          <div style="padding-left: 20px;">为提高导入的成功率，请下载并使用系统提供的模板</div>
          <el-button size="small" type="primary" style="margin: 10px 20px;" @click="shopExcelDownload(2, '实物类发货单模板')">下载实物类发货单模板</el-button>
          <el-button size="small" type="primary" style="margin: 10px 20px;" @click="shopExcelDownload(3, '卡密类发货单模板')">下载卡密类发货单模板</el-button>
          <el-button size="small" type="primary" style="margin: 10px 20px;" @click="shopExcelDownload(4, '充值类发货单模板')">下载充值类发货单模板</el-button>
        </el-form-item>
        <el-form-item>
          <div>
            <i class="el-icon-upload"></i>
            <span style="display: inline-block;padding-left: 2px;">上传文件</span>
          </div>
          <div style="padding-left: 20px;">
            <span style="display: block">请选择要上传的模板类型</span>
            <el-radio-group v-model="currentRadio" style="margin: 20px 0;">
              <el-radio :label="0">实物类发货单模板</el-radio>
              <el-radio :label="2">卡密类发货单模板</el-radio>
              <el-radio :label="1">充值类发货单模板</el-radio>
            </el-radio-group>
            <el-upload
              class="upload-demo"
              ref="upload"
              name="file"
              :limit="1"
              :headers="headers"
              accept=".xls,.xlsx"
              action="/shop/excel/import/order"
              :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary">选取上传文件</el-button>
              <div slot="tip" class="el-upload__tip">只能上传xlsx，且不超过10Mb</div>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item>
          <div>建议使用 <a style="color: #409EFF" href="https://pacakge.cache.wpscdn.cn/wps/download/W.P.S.10072.12012.2019.exe">WPS Office 2019 PC</a> 版本</div>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="el-del-btn-item">
          <div class="btn-item-footer">
            <el-button v-for="(btnItem, index) in btnList.list" :key="index" :type="btnItem.bType"
                       size="small"
                       :icon="btnItem.icon" @click="btnClickEvent(btnItem)">{{btnItem.label}}
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="订单详情" :append-to-body="true" :visible.sync="dialogVisibleOrderDetail" :width="add_edit_dialog">
      <nt-form ref="orderDetail" v-if="dialogVisibleOrderDetail" :rowData="orderDetailData" :pageColumn="order_detail_page_column" :modeList="order_detail_mode_list" :selectList="order_detail_select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success"></nt-form>
    </el-dialog>
  </div>
</template>
<script>
import { initVueDataOptions, isTypeof, callbackPagesInfo, exportBlobToFiles, formateTData, custFormBtnList, toolsFileHeaders } from '@/utils/tools'
import { $shopExcelExport, $shopExcelDownload, $shopExcelImportOrder, $shopOrderDetail } from '@/service/shop'
import { mapGetters } from 'vuex'
export default {
  data() {
    return initVueDataOptions(this, {
      queryTableCustURL: {
        list: {
          url: 'shop/order/page',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        }
      },
      headers: toolsFileHeaders(this),
      points: {},
      btnList: custFormBtnList(),
      buttonsList: [{ type: 'primary', icon: '', event: 'deliveryDownload', name: '导出待发货订单' }, { type: 'primary', icon: '', event: 'batch', name: '批量下载上传模板' }],
      queryParams: Function,
      dialogVisible: false,
      dialogVisibleOrderDetail: false,
      orderDetailData: {},
      currentRadio: 0
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'pointsConfig_mode_list',
      page_status: 'order_page_status',
      page_column: 'order_column',
      select_list: 'order_select_list',
      order_detail_mode_list: 'order_detail_mode_list',
      order_detail_page_column: 'order_detail_column',
      order_detail_select_list: 'order_detail_select_list',
      response_success: 'response_success',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form'
    })
  },
  created() {
  },
  methods: {
    onListTableEvent(type, row) {
      switch (type) {
        case 'deliveryDownload':
          this.deliveryDownload()
          break
        case 'batch':
          this.dialogVisible = true
          break
        case 'orderDetail':
          this.getOrderDetail(row)
          break
        default:
          break
      }
    },
    getOrderDetail(row) {
      const params = { id: row.orderId }
      $shopOrderDetail(params).then(res => {
        console.log(res)
        this.goodsTypeDeal(res.data.goodsType)
        res.data.addr = res.data.province + res.data.city + res.data.area + res.data.address
        this.orderDetailData = res.data
        this.dialogVisibleOrderDetail = true
      })
    },
    goodsTypeDeal(goodsType = 0) {
      // 商品类型判断处理
      // 商品类型 0 实体商品 1 充值虚拟商品 2 抵扣券虚拟商品
      const orderDetail = [
        { ou: 1, name: '基本信息', status: 3 },
        { ou: 2, name: '商品信息', status: 3 },
        { ou: 3, name: '收货信息', status: 3 },
        { ou: 4, name: '物流信息', status: 3 },
        { ou: 5, name: '充值信息', status: 3 },
        { ou: 6, name: '优惠券信息', status: 3 }
      ]
      this.$store.commit('pointsMall/CHANGE_MODE_ORDER_DETAIL', orderDetail)
      var modeList = this.$store.state.pointsMall.app.mode.orderDetail
      if (goodsType == 0) {
        modeList = modeList.filter(item => item.ou !== 5 && item.ou !== 6)
      } else if (goodsType == 1) {
        modeList = modeList.filter(item => item.ou !== 3 && item.ou !== 4 && item.ou !== 6)
      } else if (goodsType == 2) {
        modeList = modeList.filter(item => item.ou !== 3 && item.ou !== 4 && item.ou !== 5)
      }
      this.$store.commit('pointsMall/CHANGE_MODE_ORDER_DETAIL', modeList)
    },
    resMergeDeal(res) {
      // 合并对象 带前缀，防止覆盖
      var result = {}
      Object.keys(res).forEach(key => {
        var obj = {}
        Object.keys(res[key]).forEach(ckey => {
          const newcKey = key + ckey.substr(0, 1).toUpperCase() + ckey.substr(1)
          obj[newcKey] = res[key][ckey]
        })
        result = Object.assign(result, obj)
      })
      if (result.orderAddressAddress) {
        result.orderAddressAddr = result.orderAddressProvince + result.orderAddressCity + result.orderAddressArea + result.orderAddressAddress
      }
      return result
    },
    deliveryDownload() {
      // 导出当天待发货订单
      this.$confirm('确定要导出当天待发货订单吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        $shopExcelExport({}).then(res => {
          const filename = '待发货订单' + formateTData(Date.now(), 'date')
          exportBlobToFiles(res, filename)
          this.$message.success('导出成功')
        })
      }).catch(() => {})
    },
    shopExcelDownload(excelType, info = '') {
      const params = { value: excelType }
      $shopExcelDownload(params).then(res => {
        const filename = info + formateTData(Date.now(), 'date')
        exportBlobToFiles(res, filename)
        this.$message.success('下载成功！')
      })
    },
    btnClickEvent(btnObj, row) {
      const that = this
      if (btnObj.type === 'ok') {
        var files = document.getElementsByName('file')[0].files[0]

        var formData = new FormData()

        formData.append('file', files)
        formData.append('goodsType', this.currentRadio)

        $shopExcelImportOrder(formData).then(response => {
          if (response.type === 'application/json') {
            const reader = new FileReader()
            reader.onload = function() {
              const jsonData = JSON.parse(this.result)
              if (jsonData.code !== 0) {
                that.$message.error(jsonData.message)
              } else {
                that.$message.success('导入成功')
                that.$refs.order.initDataList()
                that.dialogVisible = false
              }
            }
            reader.readAsText(response)
          }
        })
      } else {
        this.dialogVisible = false
      }
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { } })
      console.log(_this.finds)
      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (k == 'createTime') {
            if (!_this.finds.createTime) {
              params.param.startCreateTime = ''
              params.param.endCreateTime = ''
            } else {
              params.param.startCreateTime = v[0]
              params.param.endCreateTime = v[1]
            }
          } else {
            if (!v && v !== 0) {
              if (params.param.k) {
                Reflect.deleteProperty(params.param.k)
              }
            } else {
              params.param[k] = v
            }
          }
        }
      }
      console.log(params.param)
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
