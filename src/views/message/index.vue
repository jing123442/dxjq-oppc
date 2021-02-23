<template>
  <div class="template-main" style="display: flex">
    <div style="width: 260px;margin-right: 10px;margin-bottom: 25px;border-radius: 5px;background-color: #fff;">
      <div style="height: 65px;line-height: 65px;border-radius: 5px 5px 0 0;font-size: 20px;font-weight: bold;padding-left: 10px;background-color: #e8e8e8;">分类导航栏</div>
      <el-tree :props="defaultProps" accordion :load="loadTreeNode" lazy @node-click="reloadTableList"></el-tree>
    </div>
    <em-table-list ref="tables" :tableListName="'order'" style="flex: 1;" :authButtonList="authButtonList" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
    <el-dialog title="新增QA" :visible.sync="dialogAddInfoVisible" width="80%" :append-to-body="true">
      <nt-form ref="addInfo" :formRef="'addInfoForm'" v-if="dialogAddInfoVisible" :rowData="addInfoRow" :modeList="mode_list" :inputType="'show'" :pageColumn="page_column" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="onEventAddInfo"></nt-form>
    </el-dialog>
    <el-dialog title="匹配客户端" :visible.sync="dialogClientVisible" width="40%" :append-to-body="true">
      <el-form ref="clientRow" v-if="dialogClientVisible" :model="clientRow" :rules="clientRowRules" size="small" label-position="left">
        <el-form-item prop="clients" style="margin-bottom: 50px;">
          <el-checkbox-group v-model="clientRow.clients" style="padding: 10px 20px;">
            <el-checkbox v-for="(item, index) in clientList" :key="index" class="checkbox-client" :label="item.clientId" name="clients">{{item.clientName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="el-del-btn-item">
          <div class="btn-item-footer">
            <el-button v-for="(btnItem, index) in clientRow._btn.list" :key="index" :type="btnItem.bType"
                       size="small"
                       :icon="btnItem.icon" @click="btnClickEvent(btnItem, clientRow)">{{btnItem.label}}
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { initVueDataOptions, callbackPagesInfo, isTypeof, custFormBtnList } from '@/utils/tools'
import { $qaClientUpdate, $contentToclientList, $qaClientList, $qaContentAddInfo } from '@/service/message'
import { utilsQATreeList } from '@/utils/select'
import { mapGetters } from 'vuex'

export default {
  name: 'customer',
  data() {
    return initVueDataOptions(this, {
      defaultProps: {
        children: 'children',
        label: 'name',
        isLeaf: 'leaf'
      },
      queryCustURL: {
        edit: {
          url: 'message/qa_content/update',
          method: 'post',
          rowType: true
        },
        byid: {
          url: 'message/qa_content/find',
          method: 'post',
          parse: ['data'],
          concat: ['qaContent', 'catalogsResult']
        },
        detail: {
          url: 'message/qa_content/find',
          method: 'post',
          parse: ['data'],
          concat: ['qaContent', 'catalogsResult']
        },
        del: {
          url: 'message/qa_content/delete',
          method: 'post',
          name: 'title'
        },
        list: {
          url: 'message/qa_content/page',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '发布管理'
      },
      dialogAddInfoVisible: false,
      currMenuInfo: {
        parentId: '',
        catalogsId: ''
      },
      addInfoRow: {
        parentId: '',
        catalogsId: ''
      },
      clientList: [],
      buttonsList: [{ type: 'primary', icon: '', event: 'add_info', name: '增加QA' }],
      dialogClientVisible: false,
      clientRow: {
        clients: []
      },
      clientRowRules: {
        clients: [{ required: true, message: '请选择匹配客户端！', trigger: 'blur' }]
      }
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'customer_list_mode_list',
      page_status: 'customer_list_page_status',
      page_column: 'customer_list_column',
      select_list: 'customer_list_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () {
    this.initData()
  },
  methods: {
    initData() {
      $qaClientList({}).then(response => {
        this.clientList = response.data
      })
    },
    loadTreeNode(node, resolve) {
      utilsQATreeList(node, resolve)
    },
    onListEvent(type, row) {
      if (type === 'client') {
        $contentToclientList({ id: row.id }).then(response => {
          const data = response.data || []

          this.clientRow = row
          // eslint-disable-next-line no-prototype-builtins
          if (!this.clientRow.hasOwnProperty('clients')) {
            this.$set(this.clientRow, 'clients', data)
          } else {
            this.clientRow.clients = data
          }
          this.clientRow._btn = custFormBtnList()
          this.dialogClientVisible = true
        })
      } else if (type === 'add_info') {
        this.addInfoRow = Object.assign({}, { parentId: this.currMenuInfo.parentId, catalogsId: this.currMenuInfo.catalogsId })
        this.addInfoRow._btn = custFormBtnList()
        this.dialogAddInfoVisible = true
      }
    },
    btnClickEvent(btn, row) {
      if (btn.type == 'ok') {
        this.$refs.clientRow.validate((valid) => {
          if (valid) {
            const params = {
              contentId: row.id,
              clientIds: row.clients
            }
            $qaClientUpdate(params).then(response => {
              this.$message.success('匹配客户端成功！')
              this.$refs.tables.initDataList()
            })
            this.dialogClientVisible = false
          }
        })
      } else {
        this.dialogClientVisible = false
      }
    },
    onEventAddInfo(btn, row) {
      if (btn.type == 'ok') {
        this.$refs.addInfo.$refs.addInfoForm.validate((valid) => {
          if (valid) {
            if (row.catalogsIds.length == 1) {
              this.$message.error('请选择子分类')
              return false
            }
            const params = {
              qaContent: {
                catalogsId: row.catalogsIds[1],
                content: row.content,
                sortOrder: Number(row.sortOrder),
                title: row.title
              }
            }

            $qaContentAddInfo(params).then(response => {
              this.$message.success('增加QA信息成功！')
              this.$refs.tables.initDataList()
            })
            this.dialogAddInfoVisible = false
          }
        })
      } else {
        this.dialogAddInfoVisible = false
      }
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { qaContent: { } } })

      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (v !== '') {
            if (k == 'clientId') {
              params.param[k] = v
            } else {
              params.param.qaContent[k] = v
            }
          }
        }
      }

      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    },
    reloadTableList(data) {
      if (data.parentId !== 0) {
        // 增值分类默认选择
        this.currMenuInfo.parentId = data.parentId
        this.currMenuInfo.catalogsId = data.id

        this.$refs.tables.finds = { catalogsId: data.id }
        this.$refs.tables.initDataList()
      }
    }
  }
}
</script>
