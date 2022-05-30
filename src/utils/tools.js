import { getSessionStorage } from '@/utils/storage'

export function formateTData(date, fmt) { // 字符串
  if (date) {
    if (fmt == 'date') {
      return formatDate(date, 'yyyy-MM-dd')
    } else if (fmt == 'all') {
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    } else if (fmt == 'hour') {
      return formatDate(date, 'yyyy-MM-dd hh')
    } else {
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  }

  return ''
}
export function formatDate(date, fmt) { // date对象
  if (!date) return '-'
  var padLeftZero = function (str) {
    return ('00' + str).substr(str.length)
  }
  if (isTypeof(date) === 'string') {
    let tmpDate = date.replace(/-/g, '/')
    tmpDate = tmpDate.replace(/T/g, ' ')

    date = new Date(tmpDate)
  } else if (isTypeof(date) == 'number') {
    date = new Date(date)
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

// data-pick时间限制
export function toolPickerOptions(number = 1) {
  const timeOptions = {
    disabledDate: (time) => {
      const taday = number * 24 * 60 * 60 * 1000
      const data = formateTData(new Date(), 'date') + ' 00:00:00'
      const timers = new Date(data).getTime() + taday

      return time.getTime() >= timers
    }
  }

  return timeOptions
}

// 获取当前账期
export function formatPeriodDate(date, number = 24) {
  if (date) {
    const periodYear = new Date(date).getFullYear()
    const periodMonth = new Date(date).getMonth() + 1
    return {
      periodYear,
      periodMonth
    }
  } else {
    const dateNow = Date.now()
    let periodYear = new Date(dateNow).getFullYear()
    let periodMonth = new Date(dateNow).getMonth() + 1
    const periodDate = new Date(dateNow).getDate()
    if (periodMonth == 1) {
      if (periodDate <= number) {
        periodYear--
        periodMonth = 12
      }
    } else {
      if (periodDate <= number) {
        periodMonth--
      }
    }
    return {
      periodYear,
      periodMonth
    }
  }
}

// 获取当前账期时间段
export function formatPeriodDateTime(year, month, number = 24) {
  if (year && month) {
    const startPeriodTime = month == 1 ? ((Number(year) - 1) + '-12-' + (number + 1) + ' 00:00:00') : (year + '-' + (Number(month) - 1) + '-' + (number + 1) + ' 00:00:00')
    const endPeriodTime = year + '-' + month + '-' + number + ' 23:59:59'

    return startPeriodTime + ' 至 ' + endPeriodTime
  }

  return ''
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

export function monthTimeArea(now, fmt = '') {
  var nowYear = now.getFullYear()
  var nowMonth = now.getMonth()

  var monthStartDate = new Date(nowYear, nowMonth, 1)
  var monthEndDate = new Date(nowYear, nowMonth + 1, 0)

  return {
    start: fmt ? formatDate(monthStartDate, fmt) : formatDate(monthStartDate, 'yyyy-MM-dd 00:00:00'),
    end: fmt ? formatDate(monthEndDate, fmt) : formatDate(monthEndDate, 'yyyy-MM-dd 23:59:59')
  }
}

export function dataPickerDefault(now, number = 30, fmt = 'yyyy-MM-dd hh:mm:ss', space = 0) {
  const nowYear = now.getFullYear()
  const nowMonth = now.getMonth()
  const nowDate = now.getDate()

  const monthStartDate = new Date(nowYear, nowMonth, (nowDate - number - space + 1))
  const monthEndDate = new Date(nowYear, nowMonth, nowDate - space)

  return {
    start: formatDate(monthStartDate, fmt),
    end: formatDate(monthEndDate, fmt)
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

// 上传文件头文件
export function toolsFileHeaders(_this) {
  const userInfo = _this.$store.getters.wopuser

  return {
    userId: userInfo.user_id,
    userName: userInfo.user_name,
    Identifier: _this.$store.getters.wopidntf,
    Authorization: _this.$store.getters.woptoken
  }
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

// 对象深度赋值
export function objectDepthAssignment(source) {
  const sourceCopy = Object.prototype.toString.call(source) === '[object Array]' ? [] : {}

  for (const item in source) {
    sourceCopy[item] = typeof source[item] === 'object' ? objectDepthAssignment(source[item]) : source[item]
  }

  return sourceCopy
}

// 数组根据某个字段排序
export function arrayResetSort(sourceColumn, key = 'serial', order = 'asc') {
  const arrayList = objectDepthAssignment(sourceColumn)

  if (order == 'asc') {
    arrayList.sort((arr1, arr2) => {
      return Number(arr1[key]) - Number(arr2[key])
    })
  } else if (order == 'desc') {
    arrayList.sort((arr1, arr2) => {
      return Number(arr2[key]) - Number(arr1[key])
    })
  }

  return arrayList
}

// 请求默认参数
export function queryDefaultParams(_this, param) {
  let queryParams = objectDepthAssignment(_this.$store.getters.query_params)

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

// 获取授权按钮数组
function authButtonInfo(sign = '$') {
  const buttons = getSessionStorage('curr_auth_button')

  return buttons && isTypeof(buttons) === 'string' ? buttons.split(sign) : []
}

// vue data默认值初始化
export function initVueDataOptions(_this, options) {
  let result = {}
  const option = {
    authButtonList: authButtonInfo(),
    axios: axiosRequestParams(_this),
    buttonsList: [],
    formBtnList: custFormBtnList(),
    queryParams: Function,
    queryCustURL: {},
    inputType: 'show'
  }

  if (options && isTypeof(options) === 'object') {
    result = Object.assign({}, option, options)
  }

  return result
}

// 新增默认参数
export function createParams() {
  const userInfo = JSON.parse(getSessionStorage('wopuser'))

  return {
    creater: userInfo.user_id,
    createrName: userInfo.user_name
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
export function custFormBtnList(type = 3) {
  const bottonList = {
    iShow: true,
    list: []
  }
  const btnList = []

  if ((type & 1) == 1) {
    btnList.push({ bType: 'info', icon: 'el-icon-close', type: 'cancel', label: '取消' })
  }

  if ((type & 2) == 2) {
    btnList.push({ bType: 'primary', icon: 'el-icon-check', type: 'ok', label: '确认' })
  }

  bottonList.list = btnList

  return bottonList
}

// 校验URL地址是否是http://或https://开头的
export function isHttpHeaderURL(url) {
  if (url && isTypeof(url) === 'string' && (url.indexOf('http://') === 0 || url.indexOf('https://') === 0)) {
    return true
  }

  return false
}

// blob导出excel文件
export function exportBlobToFiles(content, fileName, fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
  /*
    // 其他类型
    .doc     application/msword
    .docx   application/vnd.openxmlformats-officedocument.wordprocessingml.document
    .rtf       application/rtf
    .xls     application/vnd.ms-excel application/x-excel
    .xlsx    application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
    .ppt     application/vnd.ms-powerpoint
    .pptx    application/vnd.openxmlformats-officedocument.presentationml.presentation
    .pps     application/vnd.ms-powerpoint
    .ppsx   application/vnd.openxmlformats-officedocument.presentationml.slideshow
    .pdf     application/pdf
    .swf    application/x-shockwave-flash
    .dll      application/x-msdownload
    .exe    application/octet-stream
    .msi    application/octet-stream
    .chm    application/octet-stream
    .cab    application/octet-stream
    .ocx    application/octet-stream
    .rar     application/octet-stream
    .tar     application/x-tar
    .tgz    application/x-compressed
    .zip    application/x-zip-compressed
    .z       application/x-compress
    .wav   audio/wav
    .wma   audio/x-ms-wma
    .wmv   video/x-ms-wmv
    .mp3 .mp2 .mpe .mpeg .mpg     audio/mpeg
    .rm     application/vnd.rn-realmedia
    .mid .midi .rmi     audio/mid
    .bmp     image/bmp
    .gif     image/gif
    .png    image/png
    .tif .tiff    image/tiff
    .jpe .jpeg .jpg     image/jpeg
    .txt      text/plain
    .xml     text/xml
    .html     text/html
    .css      text/css
    .js        text/javascript
    .mht .mhtml   message/rfc822
   */
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
// 临时使用
export function currency(value, unit, currency, decimals) {
  const digitsRE = /(\d{3})(?=\d)/g
  value = parseFloat(value)
  if (!isFinite(value) || (!value && value === 0)) return ''
  currency = currency != null ? currency : '￥'
  decimals = decimals != null ? decimals : 2
  var stringified = Math.abs(value).toFixed(decimals)
  var _int = decimals
    ? stringified.slice(0, -1 - decimals)
    : stringified
  var i = _int.length % 3
  var head = i > 0
    ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
    : ''
  var _float = decimals
    ? stringified.slice(-1 - decimals)
    : ''
  var sign = value < 0 ? '-' : ''
  return sign + currency + head +
    _int.slice(i).replace(digitsRE, '$1,') +
    _float +
    (unit ? ' ' + unit : '')
}

export function tableTextColor(row, field) {
  const regExp = /^-/
  if (row[field] == 0 || row[field] == '-') return ''
  if (regExp.test(row[field])) {
    return 'color: #41CC7C;'
  } else {
    return 'color: #E86452;'
  }
}

// echarts begin
// tooltip默认值
export function initDefaultChartsTooltip() {
  return {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
      shadowStyle: {
        color: '#5D7092',
        shadowColor: '#5D7092',
        opacity: 0.1
      }
    }
  }
}

// legend默认值
export function initDefaultChartsLegend() {
  return {
    type: 'plain',
    left: 'center',
    bottom: '4%',
    textStyle: {
      fontSize: '1.4rem'
    }
  }
}

// x轴样式
export function initDefaultChartsxAxis(obj) {
  return {
    axisTick: {
      show: false
    },
    axisLabel: {
      show: true,
      interval: 0
    },
    axisLine: {
      show: false
    },
    splitLine: {
      show: false
    }
  }
}

// y轴样式
export function initDefaultChartsyAxis(obj) {
  return {
    axisTick: {
      show: false
    },
    axisLabel: {
      show: false
    },
    axisLine: {
      show: false
    },
    splitLine: {
      lineStyle: {
        color: '#333',
        opacity: 0.1
      }
    }
  }
}

// axisPointer
export function initDefaultChartsAxisPointer() {
  return {
    show: true,
    type: 'shadow',
    label: {
      show: true
    },
    shadowStyle: {
      color: '#5D7092',
      shadowColor: '#5D7092',
      opacity: 0.1
    }
  }
}

// echarts end

export function formateParams(param, type = true) {
  if (isTypeof(param) === 'string' || isTypeof(param) === 'number') {
    return type ? parseFloat(param).toLocaleString() : currency(param, '', '')
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

export function settlePeriodInterval(periodYear, periodMonth) {
  if (periodMonth == 1) {
    return `${(periodYear - 1)}年12月25日 00:00:00至${periodYear}年${periodMonth}月24日 23:59:59`
  } else {
    return `${periodYear}年${(periodMonth - 1)}月25日 00:00:00至${periodYear}年${periodMonth}月24日 23:59:59`
  }
}

// 司机上传行驶证提示信息
export function truckUploadMessageInfo() {
  return '<ul class="warning-message-box" style="width: 70%;">' +
    '<li class="title">请按以下要求准备行驶证照片</li>' +
    '<li>* 证件四角齐全，无遮挡</li>' +
    '<li>* 将证件从保护套中拿出，避免反光</li>' +
    '<li>* 第一页、第二页请单独上传，不要在一张照片里</li>' +
    '<li>* 请保证证件边框完整，字体清晰，文件大小不超过10M</li>' +
    '</ul>'
}
// 判断请求终端类型
export function browserRedirect() {
  var sUserAgent = navigator.userAgent.toLowerCase()
  console.log(sUserAgent)
  var bIsIpad = sUserAgent.match(/ipad/i) == 'ipad'
  var bIsIphoneOs = sUserAgent.match(/iphone os/i) == 'iphone os'
  var bIsMidp = sUserAgent.match(/midp/i) == 'midp'
  var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == 'rv:1.2.3.4'
  var bIsUc = sUserAgent.match(/ucweb/i) == 'ucweb'
  var bIsAndroid = sUserAgent.match(/android/i) == 'android'
  var bIsCE = sUserAgent.match(/windows ce/i) == 'windows ce'
  var bIsWM = sUserAgent.match(/windows mobile/i) == 'windows mobile'
  if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
    return false
  } else {
    return true
  }
}

// 去掉前后空格
export function trim(str) {
  return typeof str === 'string' ? str.replace(/^\s+|\s+$/g, '') : str
}
// 获取当前日期和近N天的日期
export function getDateRange(n = 30) {
  // 获取当前日期
  var myDate = new Date()
  var nowY = myDate.getFullYear()
  var nowM = myDate.getMonth() + 1
  var nowD = myDate.getDate()
  var nowH = myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours()
  var nowMi = myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes()
  var nowS = myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds()
  var enddate = nowY + '-' + (nowM < 10 ? '0' + nowM : nowM) + '-' + (nowD < 10 ? '0' + nowD : nowD) + ' ' + nowH + ':' + nowMi + ':' + nowS

  // 获取三十天前日期
  var lw = new Date(myDate - 1000 * 60 * 60 * 24 * n)
  var lastY = lw.getFullYear()
  var lastM = lw.getMonth() + 1
  var lastD = lw.getDate()
  var lastH = lw.getHours() < 10 ? '0' + lw.getHours() : lw.getHours()
  var lastMi = lw.getMinutes() < 10 ? '0' + lw.getMinutes() : lw.getMinutes()
  var lastS = lw.getSeconds() < 10 ? '0' + lw.getSeconds() : lw.getSeconds()
  var startdate = lastY + '-' + (lastM < 10 ? '0' + lastM : lastM) + '-' + (lastD < 10 ? '0' + lastD : lastD) + ' ' + lastH + ':' + lastMi + ':' + lastS

  return { startdate, enddate }
}
