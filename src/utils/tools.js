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
  console.log(queryParams, _this.$store.getters.query_params)
  return queryParams
}
