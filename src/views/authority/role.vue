<template>
    <div class="template-main">
      <em-table-list ref="tables" :tableListName="'settingrole'" :mode_list="mode_list" :authButtonList="authButtonList" :buttonsList="buttonsList" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :page_column="page_column" :select_list="select_list" :page_status="page_status" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>
      <el-dialog title="权限配置" :visible.sync="dialogConfigVisible" :width="add_edit_dialog" :append-to-body="true">
        <el-form ref="configRow" v-if="dialogConfigVisible" size="small" label-position="left">
          <el-form-item prop="roleList" style="margin-bottom: 50px;">
            <el-cascader-panel ref="cascader" v-model="configRow.roleList" :options="initMenuTree" :props="props" class="nt-cascader-panel"></el-cascader-panel>
          </el-form-item>
          <!-- 按钮 -->
          <el-form-item class="el-del-btn-item">
            <div class="btn-item-footer">
              <el-button v-for="(btnItem, index) in configRow._btn.list" :key="index" :type="btnItem.bType"
                         size="small"
                         :icon="btnItem.icon" @click="btnClickEvent(btnItem, configRow)">{{btnItem.label}}
              </el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
</template>
<script>
import { $menuListTree, $menuListCheckTree, $menuToButtonList, $roleToMenuList } from '@/service/user'
import { initVueDataOptions, callbackPagesInfo, custFormBtnList, isTypeof } from '@/utils/tools'
import { mapGetters } from 'vuex'

export default {
  name: 'settingrole',
  data() {
    return initVueDataOptions(this, {
      queryCustURL: {
        list: {
          url: 'user/role/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        add: {
          url: 'user/role/add',
          method: 'post'
        },
        edit: {
          url: 'user/role/update',
          method: 'post'
        },
        name: '角色'
      },
      buttonsList: [{ type: 'primary', icon: '', event: 'add', name: '新建角色' }],
      configRow: {},
      dialogConfigVisible: false,
      initMenuTree: [],
      props: {
        multiple: true,
        value: 'menuId',
        label: 'menuName'
      }
    })
  },
  computed: {
    ...mapGetters({
      page_column: 'authority_role_column',
      mode_list: 'authority_role_mode_list',
      page_status: 'authority_role_page_status',
      select_list: 'authority_role_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success',
      woporg: 'woporg',
      woprole: 'woprole'
    })
  },
  created: function () {
    this.initData()
  },
  methods: {
    initData() {
      if (this.woprole === 'administrator') {
        $menuListTree({ clientId: 'woperation' }).then(response => {
          this.initMenuTree = response.data || []
          this.parseInitDataMenuTree(this.initMenuTree)
        })
      } else {
        const menuString = JSON.parse(this.$getSessionStorage('menu_tree'))
        this.initMenuTree = [...menuString]
        this.parseInitDataMenuTree(this.initMenuTree)
      }
    },
    onListEvent(type, row) {
      $menuListCheckTree({ clientId: row.clientId, roleId: row.roleId }).then(response => {
        const tmpRoleList = []
        this.parseMenuTree(response.data, tmpRoleList)

        row.roleList = []
        tmpRoleList.forEach(item => {
          if (isTypeof(item) === 'array') {
            const lastButton = item.pop()
            row.roleList.push(item)
            if (lastButton) {
              const buttonList = lastButton.split('$')
              buttonList.forEach(button => {
                const tmpItem = Array(...new Set(item))

                tmpItem.push('b#0' + button)
                row.roleList.push(tmpItem)
              })
            } else {
              row.roleList.push(item)
            }
          }
        })
        this.configRow = row
        this.configRow._btn = custFormBtnList()
        this.dialogConfigVisible = true
      })
    },
    parseInitDataMenuTree(data) {
      data && isTypeof(data) === 'array' && data.forEach(item => {
        // eslint-disable-next-line no-prototype-builtins
        if (item.hasOwnProperty('children') && item.children.length > 0) {
          this.parseInitDataMenuTree(item.children)
        } else {
          // 页节点
          $menuToButtonList({ menuId: item.menuId }).then(response => {
            const resData = response.data || []
            resData.forEach(leafItem => {
              leafItem.menuId = 'b#0' + leafItem.button
              leafItem.menuName = leafItem.buttonName
              leafItem.leaf = 'leaf'
            })
            if (resData.length > 0) {
              item.children = resData
            } else {
              item.leaf = 'leaf'
            }
          })
        }
      })
    },
    parseMenuTree(data, list) {
      data && isTypeof(data) === 'array' && data.forEach(item => {
        // eslint-disable-next-line no-prototype-builtins
        if (item.hasOwnProperty('children') && item.children.length > 0) {
          // 按钮值不为空，有权限配置
          if (item.buttons) {
            let tmpList = []
            if (Number(item.parentId) !== 0) {
              tmpList = isTypeof(item.parentList) === 'array' ? Array(...new Set(item.parentList)) : []
            }
            tmpList.push(item.menuId)
            tmpList.push(item.buttons)
            list.push(tmpList)
          }
          // 为子节点配置父节点的menuId
          isTypeof(item.children) === 'array' && item.children.forEach(node => {
            if (node.parentList) {
              node.parentList.push(item.menuId)
            } else {
              node.parentList = [item.menuId]
            }
            if (item.parentList) {
              node.parentList.unshift(...new Set(item.parentList))
            }
          })
          this.parseMenuTree(item.children, list)
        } else {
          // 页节点
          const tmpList = isTypeof(item.parentList) === 'array' ? item.parentList : []
          tmpList.push(item.menuId)
          tmpList.push(item.buttons)
          list.push(tmpList)
        }
      })
    },
    getButtonToString(index, lastIndex, button = '', oldValue = '') {
      if (index === lastIndex) {
        return oldValue ? oldValue + '$' + button : button
      } else {
        return oldValue
      }
    },
    btnClickEvent(btn, row) {
      if (btn.type === 'ok') {
        if (row.roleList && row.roleList.length > 0) {
          const roleList = []
          const tmpRole = {}

          row.roleList.forEach(item => {
            // 解释按钮字符串
            let lastValue = isTypeof(item) === 'array' ? item[item.length - 1] : ''
            if (lastValue.indexOf('b#0') === 0) {
              const tmpValue = item.pop()
              lastValue = tmpValue.substring(3)
            } else {
              lastValue = ''
            }
            // 授权数组
            for (let i = 0; i < item.length; i++) {
              // eslint-disable-next-line no-prototype-builtins
              if (tmpRole.hasOwnProperty(item[i])) {
                tmpRole[item[i]] = this.getButtonToString(i, (item.length - 1), lastValue, tmpRole[item[i]])
              } else {
                tmpRole[item[i]] = this.getButtonToString(i, (item.length - 1), lastValue)
              }
            }
          })

          for (const [k, v] of Object.entries(tmpRole)) {
            roleList.push({
              clientId: row.clientId,
              roleId: row.roleId,
              menuId: k,
              buttons: v
            })
          }

          $roleToMenuList(roleList).then(response => {
            this.$message.success('成功')

            this.$refs.tables.initDataList()
          })
          this.dialogConfigVisible = false
        } else {
          this.$message.error('请求选择菜单项进行授权')
        }
      } else {
        this.dialogConfigVisible = false
      }
    },
    onReqParams(type, _this, callback) {
      const params = Object.assign({}, callbackPagesInfo(_this), { param: { clientId: 'woperation' } })

      if (isTypeof(_this.finds) === 'object') {
        for (var [k, v] of Object.entries(_this.finds)) {
          if (v !== '') {
            params.param[k] = v
          }
        }
      }
      // eslint-disable-next-line standard/no-callback-literal
      callback(params)
    }
  }
}
</script>
