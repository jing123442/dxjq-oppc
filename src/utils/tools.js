export function formatDate(date, fmt) {
  var padLeftZero = function (str) {
    return ('00' + str).substr(str.length)
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (var k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      var str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }

  return fmt
}

export function isTypeof(option) {
  var value = Object.prototype.toString.call(option)

  if (value === '[object Undefined]') return 'undefined'
  else if (value === '[object String]') return 'string'
  else if (value === '[object Boolean]') return 'boolean'
  else if (value === '[object Number]') return 'number'
  else if (value === '[object Null]') return 'null'
  else if (value === '[object Object]') return 'object'
  else if (value === '[object Array]') return 'array'
  else if (value === '[object Date]') return 'date'
  else if (value === '[object RegExp]') return 'regexp'
  else if (value === '[object Function]') return 'function'
}

export function inArray(value, array) {
  if (Array.prototype.indexOf) {
    return array.indexOf(value)
  } else {
    for (var i = 0; i < array.length; i++) {
      if (array[i] === value) return i
    }
  }

  return -1
}

export function monthTimeArea(now) {
  var nowYear = now.getFullYear()
  var nowMonth = now.getMonth()

  var monthStartDate = new Date(nowYear, nowMonth, 1)
  var monthEndDate = new Date(nowYear, nowMonth + 1, 1)

  return {
    start: formatDate(monthStartDate, 'yyyy-MM-dd 00:00:00'),
    end: formatDate(monthEndDate, 'yyyy-MM-dd 00:00:00')
  }
}

/* 对象深度合并 */
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach((property) => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })

  return target
}

// 请求头文件
export function axiosRequestParams(_this) {
  return {
    timeout: 20000,
    baseURL: process.env.VUE_APP_BASE_URL,
    headers: {
      Authorization: 'Bearer ' + _this.$store.getters.woptoken,
      Identifier: _this.$store.getters.wopidntf
    }
  }
}

// 请求默认参数
export function queryDefaultParams(_this, param) {
  let queryParams = objectMerge({}, _this.$store.getters.query_params)

  if (isTypeof(queryParams) !== 'array') {
    queryParams = []
  }

  if (isTypeof(param) === 'array') {
    queryParams.push(...param)
  } else if (isTypeof(param) === 'object') {
    queryParams.push(param)
  }

  return queryParams
}

// 弹出确认窗
export function messageBox(_this, params) {
  _this.$confirm(params.message, params.title, {
    confirmButtonText: params.confirmButtonText,
    cancelButtonText: params.cancelButtonText,
    type: params.type
  }).then(() => {
    params.cb().then(res => {
      if (res.code === 0) {
        _this.$message({
          type: 'success',
          message: res.message
        })
        params.renderList(_this)
      } else {
        _this.$message({
          type: 'error',
          message: res.message
        })
      }
    })
  }).catch(() => {})
}

// 新增默认参数
export function createParams() {
  return {
    creater: JSON.parse(localStorage.getItem('wopuser')).user_id,
    createrName: JSON.parse(localStorage.getItem('wopuser')).user_name
  }
}

// 回调函数分页信息
export function callbackPagesInfo(_this) {
  return {
    page: _this.pages.pageNum,
    size: _this.pages.pageSize
  }
}

// 自定义按钮
export function custFormBtnList() {
  const bottonList = {
    iShow: true,
    list: [
      { bType: 'info', icon: '', type: 'cancel', label: '取消' },
      { bType: 'primary', icon: '', type: 'ok', label: '确认' }
    ]
  }

  return bottonList
}

// blob导出excel文件
export function exportBlobToFiles(content, fileName, fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
  try {
    const blob = new Blob([content], { type: fileType })

    if ('download' in document.createElement('a')) { // 非IE下载
      const url = window.URL.createObjectURL(blob)
      const aLink = document.createElement('a')

      aLink.style.display = 'none'
      aLink.href = url
      aLink.setAttribute('download', fileName)
      document.body.appendChild(aLink)
      aLink.click()
      document.body.removeChild(aLink) // 下载完成移除元素
      window.URL.revokeObjectURL(url) // 释放掉blob对象
    } else { // IE10+下载
      navigator.msSaveBlob(blob, fileName)
    }
  } catch (e) {
    console.error(e)
  }
}
/*
export default {
  // Vue.js的插件应当有一个公开方法 install。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象。
  install: function (Vue) {
    Vue.prototype.exportBlobToFiles = (content, fileName) => exportBlobToFiles(content, fileName)
    Vue.prototype.custFormBtnList = () => custFormBtnList()
    Vue.prototype.callbackPagesInfo = (_this) => callbackPagesInfo(_this)
  }
} */

export function routeImport() {
  if (process.env.NODE_ENV == 'prod') {
    return './product.js'
  } else {
    return './development.js'
  }
}
