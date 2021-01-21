<template>
  <div class="template-main">
    <em-table-list ref="tables" :tableListName="'order'" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :composeParam="composeParam" :rowKey="'id'" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
    <el-dialog :title="childrenTitle" :visible.sync="dialogAddChildVisible" :width="add_edit_dialog" :append-to-body="true">
      <nt-form v-if="dialogAddChildVisible" ref="addChild" :formRef="'addChildForm'" :rowData="addChildRow" :inputType="'show-child'" :pageColumn="page_column" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="onListEventAddChild"></nt-form>
    </el-dialog>
    <el-dialog title="子分类详情" :visible.sync="dialogDetailChildVisible" :width="add_edit_dialog" :append-to-body="true">
      <nt-form v-if="dialogDetailChildVisible" ref="detailChild" :formRef="'detailChildForm'" :rowData="detailChildRow" :inputType="'detail-child'" :pageColumn="page_column" :selectList="select_list" :axios="axios" :queryURL="queryCustURL" :responseSuccess="response_success" @onListEvent="onListEventDetailChild"></nt-form>
    </el-dialog>
  </div>
</template>
<script>
import { axiosRequestParams, callbackPagesInfo, custFormBtnList } from '@/utils/tools'
import { $addQACatalogs, $editQACatalogs, $childQACatalogsList } from '@/service/message'
import { mapGetters } from 'vuex'

export default {
  name: 'order',
  data() {
    return {
      queryCustURL: {
        add: {
          url: 'message/qa_catalogs/add',
          method: 'post'
        },
        edit: {
          url: 'message/qa_catalogs/update',
          method: 'post'
        },
        del: {
          url: 'message/qa_catalogs/delete',
          method: 'post',
          title: ['删除问题分类', '删除子分类'],
          name: 'name',
          props: {
            id: 'id',
            parentId: 'parentId'
          }
        },
        list: {
          url: 'message/qa_catalogs/page',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        children: {
          url: 'message/qa_catalogs/list',
          method: 'post',
          param: {
            parentKey: 'parentId',
            parentValue: 'id'
          },
          parse: {
            tableData: ['data']
          }
        },
        name: '问题分类'
      },
      composeParam: ['id', 'parentId'],
      buttonsList: [{ type: 'primary', icon: '', event: 'add', name: '新建分类' }],
      axios: axiosRequestParams(this),
      queryParams: Function,
      addChildRow: {},
      childrenTitle: '新增子分类',
      dialogAddChildVisible: false,
      detailChildRow: {},
      dialogDetailChildVisible: false
    }
  },
  computed: {
    ...mapGetters({
      mode_list: 'customer_type_mode_list',
      page_status: 'customer_type_page_status',
      page_column: 'customer_type_column',
      select_list: 'customer_type_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () {},
  methods: {
    onListEvent(type, row) {
      this.currType = type
      if (type === 'detail-child') {
        this.detailChildRow = row
        this.detailChildRow._btn = custFormBtnList(1)
        this.dialogDetailChildVisible = true
      } else if (type === 'add-child' || type === 'edit-child') {
        this.addChildRow = type === 'add-child' ? { parentId: row.id } : row
        this.childrenTitle = type === 'add-child' ? '新增子分类' : '编辑子分类'
        this.addChildRow._btn = custFormBtnList()
        this.dialogAddChildVisible = true
      }
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { parentId: 0 } })

      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    },
    onListEventAddChild(btn, row) {
      if (btn.type == 'ok') {
        this.$refs.addChild.$refs.addChildForm.validate((valid) => {
          if (valid) {
            const params = {
              name: row.name,
              status: row.status,
              parentId: row.parentId,
              sortOrder: row.sortOrder
            }

            if (this.currType == 'edit-child') {
              params.id = row.id
              $editQACatalogs(params).then((res) => {
                this.$message.success(res.message)

                this.reloadChildList(row.parentId)
              })
            } else {
              $addQACatalogs(params).then((res) => {
                this.$message.success(res.message)

                this.reloadChildList(row.parentId)
              })
            }
            this.dialogAddChildVisible = false
          }
        })
      } else {
        this.dialogAddChildVisible = false
      }
    },
    reloadChildList(parentId) {
      const params = { parentId: parentId }

      $childQACatalogsList(params).then(response => {
        const list = response.data

        this.$refs.tables.tableData.forEach(item => {
          if (item.id === parentId) {
            item.children = list
            return true
          }
        })
      })
    },
    onListEventDetailChild() {
      this.dialogDetailChildVisible = false
    }
  }
}
</script>
