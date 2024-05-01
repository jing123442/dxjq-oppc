import { isTypeof, inArray } from '@/utils/tools'

// 地图下载json数据地址：https://hxkj.vip/demo/echartsMap/
const china = require('./china.json')

const MODEL_MAP_JSON = ['china', 'hebei', 'henan', 'shandong', 'anhui', 'jiangsu']

// 获取地图json数据
export function mapJsonData(model) {
  let map = {}

  if (isTypeof(model) === 'string' && model === 'all') {
    MODEL_MAP_JSON.forEach(item => {
      const tmpMapJson = require('./' + item + '.json')

      map = mapConcat(map, tmpMapJson)
    })
  } else if (isTypeof(model) === 'array') {
    model.forEach(item => {
      if (inArray(item, MODEL_MAP_JSON) !== -1) {
        const tmpMapJson = require('./' + item + '.json')

        map = mapConcat(map, tmpMapJson)
      }
    })
  }

  return map
}

// 地图数据合并
function mapConcat(map, tmpMapJson) {
  if (Object.keys(map).length > 0) {
    // 校验地图map.features是否存在
    // eslint-disable-next-line no-prototype-builtins
    if (!map.hasOwnProperty('features') || !Array.isArray(map.features)) {
      map.features = []
    }
    // eslint-disable-next-line no-prototype-builtins
    if (tmpMapJson.hasOwnProperty('features') && Array.isArray(tmpMapJson.features)) {
      map.features.push(...new Set(tmpMapJson.features))
    }
  } else {
    map = Object.assign({}, tmpMapJson)
  }

  return map
}

export default {
  china,
  mapJsonData
}
