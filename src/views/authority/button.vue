<template>
  <div class="template-main" style="display: flex">
    <div style="width: 260px;margin-right: 10px;margin-bottom: 25px;border-radius: 5px;background-color: #fff;">
      <div style="height: 65px;line-height: 65px;border-radius: 5px 5px 0 0;font-size: 20px;font-weight: bold;padding-left: 10px;background-color: #e8e8e8;">菜单导航栏</div>
      <el-tree :props="defaultProps" :data="treeData" @node-click="reloadTableList"></el-tree>
    </div>
    <em-table-list ref="tables" :tableListName="'settingbutton'" style="flex: 1;" :authButtonList="authButtonList" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
    <el-dialog :title="childrenTitle" :visible.sync="dialogAddChildVisible" :width="add_edit_dialog" :append-to-body="true">
      <nt-form v-if="dialogAddChildVisible" ref="addChild" :formRef="'addChildForm'" :rowData="addChildRow" :inputType="'show'" :pageColumn="page_column" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="onListEventAddChild"></nt-form>
    </el-dialog>
  </div>
</template>
<script>
import { $menuListTree, $buttonAdd } from '@/service/user'
import { initVueDataOptions, callbackPagesInfo, isTypeof } from '@/utils/tools'
import { mapGetters } from 'vuex'

export default {
  name: 'settingbutton',
  data() {
    return initVueDataOptions(this, {
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'menuName'
      },
      currMenuInfo: {
        parentId: '',
        catalogsId: ''
      },
      queryCustURL: {
        list: {
          url: 'user/button/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        del: {
          url: 'user/button/del',
          method: 'post',
          name: 'buttonName'
        },
        add: {
          url: 'user/button/add',
          method: 'post'
        },
        edit: {
          url: 'user/button/update',
          method: 'post'
        },
        name: '按钮'
      },
      buttonsList: [{ type: 'primary', icon: '', event: 'add-btn', name: '增加按钮' }],
      addChildRow: {},
      childrenTitle: '增加按钮',
      dialogAddChildVisible: false
    })
  },
  computed: {
    ...mapGetters({
      page_column: 'authority_button_column',
      mode_list: 'authority_button_mode_list',
      page_status: 'authority_button_page_status',
      select_list: 'authority_button_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success',
      woporg: 'woporg'
    })
  },
  created: function () {
    this.initTreeData()
  },
  methods: {
    initTreeData() {
      $menuListTree({ clientId: 'woperation' }).then(response => {
        this.treeData = response.data
      })
    },
    onListEvent(type, row) {
      this.currType = type
      if (type === 'add-btn') {
        if (this.currMenuInfo.menuId) {
          this.addChildRow.menuId = this.currMenuInfo.menuId
          this.addChildRow.menuName = this.currMenuInfo.menuName
          this.addChildRow._btn = this.formBtnList
          this.dialogAddChildVisible = true
        } else {
          this.$message.error('请求选择左边菜单后，进行增加按钮操作！')
        }
      }
    },
    onListEventAddChild(btn, row) {
      if (btn.type == 'ok') {
        this.$refs.addChild.$refs.addChildForm.validate((valid) => {
          if (valid) {
            const params = {
              clientId: row.clientId,
              clientName: row.clientName,
              menuId: row.menuId,
              menuName: row.menuName,
              button: row.button,
              buttonName: row.buttonName
            }

            $buttonAdd(params).then((res) => {
              this.$message.success(res.message)

              this.$refs.tables.initDataList()
            })
            this.dialogAddChildVisible = false
          }
        })
      } else {
        this.dialogAddChildVisible = false
      }
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: {} })

      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (v !== '') {
            params.param[k] = v
          }
        }
      }
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    },
    reloadTableList(data) {
      // 当前操作节点
      this.currMenuInfo = data

      this.$refs.tables.finds = { menuId: data.menuId }
      this.$refs.tables.initDataList()
    }
  }
}
</script>
