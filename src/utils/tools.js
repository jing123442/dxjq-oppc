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

export function axiosRequestParams(_this) {
  return {
    timeout: 20000,
    baseURL: process.env.VUE_APP_BASE_URL,
    headers: {
      Authorization: 'Bearer ' + _this.$store.getters.mwxtoken,
      Identifier: _this.$store.getters.mwxidntf
    }
  }
}
