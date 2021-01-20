import file from '@/store/modules/file'
import { utilsQATreeList } from '@/utils/select'

const columns = {
  customer: [
    { field: 'id', name: 'ID', fixed: 'left', show: { type: 'span', parent: 'qaContent', ou: 1 }, detail: { type: 'span', ou: 1 } },
    { field: 'createDate', name: '创建时间', ispush: false, hide: true, show: { type: 'span', ou: 1, formatFun: 'formateTData all', stype: 'format' }, detail: { type: 'span', ou: 1, formatFun: 'formateTData all', stype: 'format' } },
    { field: 'sortOrder', name: '排序', show: { type: 'text', serial: 2, ou: 1, parent: 'qaContent', style: 'width: 95%', placeholder: '请输入排序' }, detail: { type: 'span', serial: 2, ou: 1 }, rules: [{ required: true, message: '请输入排序！', trigger: 'blur' }] },
    { field: 'catalogsIds', name: '分类', hide: true, show: { type: 'cascader', serial: 2, ou: 1, iType: 'string', parent: 'qaContent', mulField: { parentId: 0, catalogsId: 1 }, props: { lazy: true, value: 'id', label: 'name', lazyLoad (node, resolve) { utilsQATreeList(node, resolve) } }, style: 'width: 95%', placeholder: '请输入排序' }, detail: { type: 'span', model: 'cascader', serial: 2, ou: 1, iType: 'string', mulField: { parentCatalogsName: 0, catalogsName: 1 } }, rules: [{ required: true, message: '请输入分类！', trigger: 'change' }] },
    { field: 'title', name: 'QA标题', show: { type: 'text', style: 'width: 95%', ou: 2, parent: 'qaContent', placeholder: '请输入QA标题' }, search: { type: 'text', placeholder: '请输入要搜索的内容' }, detail: { type: 'span', ou: 2 }, rules: [{ required: true, message: '请输入QA标题！', trigger: 'blur' }] },
    { field: 'content', name: '问题描述', lg: 24, xl: 24, nameSpan: 2, hide: true, show: { type: 'ueditor', style: 'width: 98%', ou: 2, parent: 'qaContent', placeholder: '请输入问题描述', config: file.state.fileUEditorConfig }, detail: { type: 'span', model: 'html', style: 'width: 97%', ou: 2 }, rules: [{ required: true, message: '请输入问题描述！', trigger: 'blur' }] },
    { field: 'clientId', stype: 'mapping', mapping: 'clientNames', name: '客户端', ispush: false, search: { type: 'select', obj: 'clientList', placeholder: '请选择客户端' } },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 260, list: [{ type: 'client', name: '匹配客户端' }, { type: 'details', name: '详情' }, { type: 'edit', name: '编辑' }, { type: 'del', name: '删除' }] }
  ],
  type: [
    { field: 'id', name: '', hide: true, show: { type: 'hide' } },
    { field: 'parentId', name: '', hide: true, show: { type: 'hide', value: 0 } },
    { field: 'sortOrder', name: '排序', fixed: 'left', show: { type: 'text', serial: 2, style: 'width: 95%', placeholder: '请输入排序' }, 'show-child': { type: 'text', serial: 2, style: 'width: 95%', placeholder: '请输入排序' }, detail: { type: 'span', serial: 2 }, 'detail-child': { type: 'span', serial: 2 }, rules: [{ required: true, message: '请输入排序！', trigger: 'blur' }] },
    { field: 'name', name: '分类名称', show: { type: 'text', serial: 1, style: 'width: 95%', placeholder: '请输入分类名称' }, 'show-child': { type: 'text', serial: 1, style: 'width: 95%', placeholder: '请输入分类名称' }, detail: { type: 'span', serial: 1 }, 'detail-child': { type: 'span', serial: 1 }, rules: [{ required: true, message: '请输入分类名称！', trigger: 'blur' }] },
    { field: 'iconUrl', name: '图标', filefield: 'file', hide: true, show: { type: 'file', serial: 3, iType: 'string', btnType: true, paramField: 'url', props: { url: 'data', name: 'data' }, params: { url: 'data', name: 'data' }, action: file.state.fileUrl, headers: (typeof file.state.fileHeaders == 'function' ? file.state.fileHeaders() : file.state.fileHeaders), success: file.state.fileSuccess, listType: 'picture', style: 'width: 90%;', fileHost: file.state.fileHost, placeholder: '请上传分类图标', node: [], rules: [{ required: true, message: '请上传分类图标！', trigger: 'change' }] }, detail: { type: 'span', model: 'img', serial: 3 } },
    { field: 'status', name: '分类状态', formatter: 'status', stype: 'formatter-style', show: { type: 'radio', serial: 4, value: 1, obj: 'status', placeholder: '请输入分类状态' }, 'show-child': { type: 'radio', serial: 4, value: 1, obj: 'status', placeholder: '请输入分类状态' }, detail: { type: 'span', model: 'select', obj: 'status', serial: 4 }, 'detail-child': { type: 'span', model: 'select', obj: 'status', serial: 4 }, rules: [{ required: true, message: '请选择分类状态！', trigger: 'change' }] },
    { field: 'useropts', stype: 'opt', ispush: false, name: '操作', fixed: 'right', width: 260, list: function(scope) { return scope.row.parentId === 0 ? [{ type: 'add-child', name: '新建子分类' }, { type: 'edit', name: '编辑' }, { type: 'del', name: '删除' }, { type: 'details', name: '详情' }] : [{ type: 'edit-child', name: '编辑' }, { type: 'del', name: '删除' }, { type: 'detail-child', name: '详情' }] } }
  ]
}

export default columns
