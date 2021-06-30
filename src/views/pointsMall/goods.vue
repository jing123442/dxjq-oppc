<template>
  <div class="goods template-main">
    <div class="left-tree">
      <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </div>
    <div class="right-goods">
      <em-table-list :custTableTitle="'商品列表'" :tableListName="'goods'" ref="goods" :axios="axios" :buttonsList="buttonsList" :queryCustURL="queryTableCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onReqParams="onReqParams" @onListEvent="onListTableEvent"></em-table-list>
    </div>
    <el-dialog title="批量操作" :append-to-body="true" :visible.sync="dialogVisible" :width="add_edit_dialog">
      <el-form v-if="dialogVisible" size="small" label-position="left">
        <el-form-item>
          <div>
            <i class="el-icon-download"></i>
            <span style="display: inline-block;padding-left: 2px;">下载模板</span>
          </div>
          <div style="padding-left: 20px;">为提高导入的成功率，请下载并使用系统提供的模板</div>
          <el-button size="small" type="primary" style="margin: 10px 20px;" @click="shopExcelDownload(0, '实物商品模板')">下载实物商品模板</el-button>
          <el-button size="small" type="primary" style="margin: 10px 20px;" @click="shopExcelDownload(1, '虚拟商品模板')">下载虚拟商品模板</el-button>
        </el-form-item>
        <el-form-item>
          <div>
            <i class="el-icon-upload"></i>
            <span style="display: inline-block;padding-left: 2px;">上传文件</span>
          </div>
          <span style="display: block">请选择要上传的模板类型</span>
          <el-radio-group v-model="currentRadio" style="margin: 20px 0;">
            <el-radio :label="0">实物商品</el-radio>
            <el-radio :label="1">虚拟商品</el-radio>
          </el-radio-group>
          <div style="padding-left: 20px;">
            <el-upload
              class="upload-demo"
              ref="upload"
              name="file"
              :limit="1"
              :headers="headers"
              accept=".xls,.xlsx"
              action="/shop/excel/import/goods"
              :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary">批量上传商品</el-button>
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
  </div>
</template>
<script>
import { $shopCategoryList, $shopExcelImportGoods, $shopExcelDownload } from '@/service/shop'
import { initVueDataOptions, queryDefaultParams, toolsFileHeaders, callbackPagesInfo, isTypeof, custFormBtnList, formateTData, exportBlobToFiles } from '@/utils/tools'
import { mapGetters } from 'vuex'
export default {
  data() {
    return initVueDataOptions(this, {
      queryTableCustURL: {
        edit: {
          url: 'shop/goods/update',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        add: {
          url: 'shop/goods/add',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        list: {
          url: 'shop/goods/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '商品'
      },
      btnList: custFormBtnList(),
      buttonsList: [{ type: 'primary', icon: '', event: 'batch', name: '批量操作' }],
      headers: toolsFileHeaders(this),
      queryParams: queryDefaultParams(this, { type: 2, key: 'param', value: { } }),
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      currentRadio: 0,
      dialogVisible: false
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'goods_mode_list',
      page_status: 'goods_page_status',
      page_column: 'goods_column',
      select_list: 'goods_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      response_success: 'response_success'
    })
  },
  created() {
    this.getCategoryList()
  },
  methods: {
    onListTableEvent(type) {
      if (type == 'batch') {
        this.dialogVisible = true
      }
    },
    getCategoryList() {
      const params = { page: 1, size: 1000, param: {} }
      $shopCategoryList(params).then(res => {
        console.log(res)
        this.treeData = this.treeDataDeal(res.data.records)
      })
    },
    treeDataDeal(data = []) {
      // 获取商品类型
      const temp = [...new Set(data.map(item => item.goodsType))]
      var res = []
      temp.forEach(item => {
        if (item == 0) {
          res.push({ label: '实物商品', children: [] })
        } else if (item == 1) {
          res.push({ label: '虚拟商品', children: [] })
        }
      })
      data.forEach(item => {
        temp.forEach((iItem, index) => {
          if (iItem === item.goodsType) {
            res[index].children.push({ label: item.categoryName, isLeaf: 'leaf', id: item.id })
          }
        })
      })
      return res
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

        $shopExcelImportGoods(formData).then(response => {
          if (response.type === 'application/json') {
            const reader = new FileReader()
            reader.onload = function() {
              const jsonData = JSON.parse(this.result)
              if (jsonData.code !== 0) {
                that.$message.error(jsonData.message)
              } else {
                that.$message.success('导入成功')
                that.$refs.goods.initDataList()
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
    handleNodeClick(data) {
      // 点击商品分类切换商品列表
      if (data.isLeaf) {
        this.$refs.goods.finds.categoryId = data.id
        this.$refs.goods.initDataList()
      }
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { } })
      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          params.param[k] = v
        }
      }
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
<style lang="scss" scoped>
.goods {
  display: flex;
  .left-tree {
    min-height: 500px;
    width: 200px;
    min-width: 140px;
    background: #fff;
  }
  .right-goods {
    margin-left: 12px;
  }
}
</style>
