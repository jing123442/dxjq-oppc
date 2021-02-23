import { buttonMenuList } from '@/utils/button'

const columns = {
  menu: [
    { field: 'menuId', name: '菜单ID', fixed: 'left', detail: { type: 'span', placeholder: '菜单ID' } },
    { field: 'menuName', name: '菜单名称', show: { type: 'text', serial: 3, placeholder: '请输入菜单名称' }, rules: [{ required: true, message: '请输入菜单名称', tigger: 'blur' }] },
    { field: 'clientId', name: '客户端ID', show: { type: 'span', serial: 1, isDisabled: true, placeholder: '请输入客户姓名', value: 'woperation' } },
    { field: 'clientName', name: '客户端名', show: { type: 'span', serial: 2, isDisabled: true, placeholder: '请输入客户姓名', value: '运营平台' } },
    { field: 'routePath', name: '路由路径', show: { type: 'text', serial: 5, placeholder: '请输入路由路径' }, rules: [{ required: true, message: '请输入路由路径', tigger: 'blur' }] },
    { field: 'routeName', name: '路由名称', show: { type: 'text', serial: 6, placeholder: '请输入路由名称' }, rules: [{ required: true, message: '请输入路由名称', tigger: 'blur' }] },
    { field: 'parentId', name: '', hide: true, show: { type: 'hide', value: '0', dataType: 'string' } },
    { field: 'menuIcon', name: '菜单图标', hide: true, show: { type: 'text', serial: 7, placeholder: '请输入菜单图标' } },
    { field: 'menuIconFont', name: '图标样式', hide: true, show: { type: 'text', serial: 8, placeholder: '请输入图标样式' } },
    { field: 'rank', name: '序号', show: { type: 'text', serial: 4, placeholder: '请输入序号', dataType: 'number' } },
    { field: 'noCache', name: '是否缓存', hide: true, show: { type: 'radio', obj: 'noCache', serial: 10, value: 0, dataType: 'boolean' } },
    { field: 'menuopts', stype: 'opt', ispush: false, name: '操作', align: 'center', fixed: 'right', list: params => buttonMenuList(params) }
  ],
  role: [
    { field: 'id', name: 'ID', fixed: 'left', hide: true, show: { type: 'hide' } },
    { field: 'clientId', name: '客户端ID', fixed: 'left', show: { type: 'span', placeholder: '请输入客户ID', value: 'woperation' } },
    { field: 'clientName', name: '客户端名', show: { type: 'span', placeholder: '请输入客户姓名', value: '运营平台' } },
    { field: 'orgId', name: '组织名称', stype: 'mapping', mapping: 'orgName', show: { type: 'select', subField: 'orgName', obj: 'orgId', placeholder: '请选择组织名称' }, rules: [{ required: true, message: '请选择组织名称', tigger: 'blur' }] },
    { field: 'roleId', name: '角色ID', show: { type: 'text', placeholder: '请输入角色ID' }, search: { type: 'text', placeholder: '请输入角色ID' }, rules: [{ required: true, message: '请输入角色ID', tigger: 'blur' }] },
    { field: 'roleName', name: '角色名称', show: { type: 'text', placeholder: '请输入角色名称' }, rules: [{ required: true, message: '请输入角色名称', tigger: 'blur' }] },
    { field: 'roleopts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 160, list: [{ type: 'config', name: '配置权限' }, { type: 'edit', name: '编辑' }] }
  ],
  button: [
    { field: 'id', name: 'ID', fixed: 'left', hide: true, show: { type: 'hide' } },
    { field: 'clientId', name: '客户端ID', fixed: 'left', show: { type: 'span', placeholder: '请输入客户ID', value: 'woperation' } },
    { field: 'clientName', name: '客户端名', show: { type: 'span', placeholder: '请输入客户姓名', value: '运营平台' } },
    { field: 'menuId', name: '菜单ID', show: { type: 'span', placeholder: '请输入菜单ID' } },
    { field: 'menuName', name: '菜单名称', show: { type: 'span', placeholder: '请输入菜单名称' } },
    { field: 'button', name: '按钮ID', show: { type: 'text', placeholder: '请输入按钮ID' }, rules: [{ required: true, message: '请输入按钮ID', tigger: 'blur' }] },
    { field: 'buttonName', name: '按钮名称', show: { type: 'text', placeholder: '请输入按钮' }, rules: [{ required: true, message: '请输入按钮名称', tigger: 'blur' }] },
    { field: 'buttonopts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 160, list: [{ type: 'edit', name: '编辑' }, { type: 'del', name: '删除' }] }
  ],
  user: [
    { field: 'userId', name: '', stype: 'checkbox', align: 'center', hide: true, fixed: 'left', width: 50 },
    { field: 'orgId', stype: 'mapping', name: '企业名称', mapping: 'orgName', fixed: 'left', show: { type: 'select', remote: true, subField: 'orgName', findKey: 'orgName', paramKey: ['param', 'org'], ou: 1, obj: 'orgId', isDisabled: true, style: 'width: 90%;', placeholder: '请选择企业名称' }, search: { type: 'text', field: 'orgName', placeholder: '请输入企业名称' }, rules: [{ required: true, message: '请选择企业名称！', trigger: 'blur' }] },
    { field: 'userName', name: '姓名', show: { type: 'text', ou: 1, style: 'width: 90%;', placeholder: '请输入姓名' }, search: { type: 'text', placeholder: '请输入姓名' }, rules: [{ required: true, message: '请输入姓名！', trigger: 'blur' }] },
    { field: 'userCode', name: '登录账户', show: { type: 'text', ou: 1, isCompare: true, style: 'width: 90%;', placeholder: '请输入登录账户' } },
    { field: 'mobile', name: '手机号码', show: { type: 'text', ou: 1, isCompare: true, style: 'width: 90%;', placeholder: '请输入手机号码' }, search: { type: 'text', placeholder: '请输入手机号码' }, rules: [{ required: true, message: '请输入手机号码！', trigger: 'blur' }] },
    { field: 'userType', hide: true, name: '', show: { type: 'hide', value: 0 } },
    { field: 'baseRole', name: '账号角色', formatter: 'baseRole', show: { type: 'select', style: 'width: 90%;', ou: 1, obj: 'roleList', placeholder: '请选择账号角色' }, rules: [{ required: true, message: '请选择账号角色', trigger: 'blur' }] },
    { field: 'status', name: '账号状态', formatter: 'status', width: 120, filters: [{ value: 0, text: '启用' }, { value: 1, text: '停用' }], show: { type: 'radio', value: 0, ou: 1, obj: 'status', placeholder: '请选择账号状态' }, rules: [{ required: true, message: '请选择账号状态！', trigger: 'blur' }] },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 140, list: [{ type: 'edit', name: '编辑' }, { type: 'resetpwd', name: '重置密码' }] }
  ]
}

export default columns
