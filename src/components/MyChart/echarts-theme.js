// ********************************************** 公共属性 *************************************************
const COMMON_TEXT_STYLE = {
  color: '#FFFFF0',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontFamily: 'OPPOSans-Regular',
  fontSize: fontSize(12)
}

function fontSize(number) {
  return number
}

// backgroundColor
const backgroundColor = 'rgba(0, 0, 0, 0)'
// color
const color = [
  '#5470c6',
  '#91cc75',
  '#fac858',
  '#ee6666',
  '#73c0de',
  '#3ba272',
  '#fc8452',
  '#9a60b4',
  '#ea7ccc'
]
// textStyle
const textStyle = COMMON_TEXT_STYLE
// tooltip
const tooltip = {
  axisPointer: {
    // type: "line", // "line"|"cross"|"shadow"|"none"
    type: 'line',
    shadowStyle: {
      color: 'rgba(255,255,255,.2)'
    },
    lineStyle: {
      color: 'rgba(255,255,255,.8)',
      width: fontSize(1)
    },
    crossStyle: {
      color: 'rgba(255,255,255,.3)',
      width: fontSize(1)
    }
  },
  // 将 tooltip 框限制在图表的区域内
  padding: fontSize(5),
  confine: true,
  textStyle: textStyle,
  formatter: (params) => {
    const reg = new RegExp(/background-color:\s*([^;]+)/)
    let str = ''
    params.forEach((item) => {
      const color = item.marker.match(reg)[1]
      const marker = `<span style="display:inline-block;margin-right:${fontSize(4)}px;border-radius:${fontSize(10)}px;width:${fontSize(10)}px;height:${fontSize(10)}px;background-color:${color};"></span>`
      str += `<p style="display: flex; justify-content: space-between; align-items: center">
                <span style="display: flex; align-items: center">${marker}${item.seriesName}：</span>${item.value}
              </p>`
    })
    const dom = `<div>
<p>${params[0].axisValue}</p>
${str}
</div>`
    return dom
  },
  backgroundColor: 'rgba(0,0,0,0.6)',
  borderColor: 'rgba(0,0,0,0.6)'
}

// title
const title = {
  textStyle: {
    ...textStyle
  },
  subtextStyle: {
    ...textStyle
  }
}
// legend
const legend = {
  padding: fontSize(5),
  itemGap: fontSize(10),
  itemWidth: fontSize(25),
  itemHeight: fontSize(14),
  textStyle: {
    ...textStyle,
    fontSize: fontSize(14)
  }
}
// categoryAxis
const categoryAxis = {
  axisLine: {
    show: true,
    lineStyle: {
      color: 'rgba(255,255,255,0.3)',
      type: 'dashed'
    }
  },
  axisTick: {
    show: false,
    lineStyle: {
      color: 'rgba(255,255,255,0.3)'
    }
  },
  axisLabel: {
    show: true,
    ...textStyle
  },
  splitLine: {
    show: false,
    lineStyle: {
      color: ['rgba(255,255,255,0.3)']
    }
  },
  splitArea: {
    show: false,
    areaStyle: {
      color: ['rgba(250,250,250,0.2)', 'rgba(210,219,238,0.2)']
    }
  }
}
// valueAxis
const valueAxis = {
  axisLine: {
    show: false,
    lineStyle: {
      color: 'rgba(255,255,255,0.3)'
    }
  },
  axisTick: {
    show: false,
    lineStyle: {
      color: 'rgba(255,255,255,0.3)'
    }
  },
  axisLabel: {
    show: true,
    ...textStyle
  },
  splitLine: {
    show: true,
    lineStyle: {
      type: [fontSize(5), fontSize(5)],
      color: ['rgba(255,255,255,0.3)']
    }
  },
  splitArea: {
    show: false,
    areaStyle: {
      color: ['rgba(250,250,250,0.2)', 'rgba(210,219,238,0.2)']
    }
  }
}
// logAxis
const logAxis = {
  axisLine: {
    show: false,
    lineStyle: {
      color: 'rgba(255,255,255,0.3)'
    }
  },
  axisTick: {
    show: false,
    lineStyle: {
      color: 'rgba(255,255,255,0.3)'
    }
  },
  axisLabel: {
    show: true,
    ...textStyle
  },
  splitLine: {
    show: true,
    lineStyle: {
      type: [fontSize(5), fontSize(10)],
      color: ['rgba(255,255,255,0.3)']
    }
  },
  splitArea: {
    show: false,
    areaStyle: {
      color: ['rgba(250,250,250,0.2)', 'rgba(210,219,238,0.2)']
    }
  }
}
// timeAxis
const timeAxis = {
  axisLine: {
    show: true,
    lineStyle: {
      color: 'rgba(255,255,255,0.3)'
    }
  },
  axisTick: {
    show: true,
    lineStyle: {
      color: 'rgba(255,255,255,0.3)'
    }
  },
  axisLabel: {
    show: true,
    ...textStyle
  },
  splitLine: {
    show: false,
    lineStyle: {
      color: ['rgba(255,255,255,0.3)']
    }
  },
  splitArea: {
    show: false,
    areaStyle: {
      color: ['rgba(250,250,250,0.2)', 'rgba(210,219,238,0.2)']
    }
  }
}
// toolbox
const toolbox = {
  iconStyle: {
    borderColor: '#999'
  },
  emphasis: {
    iconStyle: {
      borderColor: '#666'
    }
  }
}
// timeline
const timeline = {
  lineStyle: {
    color: '#DAE1F5',
    width: 2
  },
  itemStyle: {
    color: '#A4B1D7',
    borderWidth: 1
  },
  controlStyle: {
    color: '#A4B1D7',
    borderColor: '#A4B1D7',
    borderWidth: 1
  },
  checkpointStyle: {
    color: '#316bf3',
    borderColor: 'fff'
  },
  label: {
    ...textStyle
  },
  emphasis: {
    itemStyle: {
      color: '#FFF'
    },
    controlStyle: {
      color: '#A4B1D7',
      borderColor: '#A4B1D7',
      borderWidth: 1
    },
    label: {
      ...textStyle
    }
  }
}
// visualMap
const visualMap = {
  color: ['#bf444c', '#d88273', '#f6efa6']
}
// dataZoom
const dataZoom = {
  handleSize: 'undefined%',
  textStyle: {}
}
// markPoint
const markPoint = {
  label: {
    color: '#eee'
  },
  emphasis: {
    label: {
      color: '#eee'
    }
  }
}
// ************************************************ line ****************************************************
const line = {
  itemStyle: {
    borderWidth: fontSize(1)
  },
  lineStyle: {
    width: fontSize(2)
  },
  symbolSize: fontSize(4),
  symbol: 'emptyCircle',
  smooth: false
}
// ************************************************ bar ******************************************************
const bar = {
  itemStyle: {
    barBorderWidth: 0,
    barBorderColor: 'rgba(0,0,0,0)'
  }
}
// ************************************************ pie ******************************************************
const pie = {
  itemStyle: {
    borderWidth: 0,
    borderColor: 'rgba(0,0,0,0)'
  }
}
// *********************************************** scatter ***************************************************
const scatter = {
  itemStyle: {
    borderWidth: 0,
    borderColor: 'rgba(0,0,0,0)'
  }
}
// *********************************************** boxplot ***************************************************
const boxplot = {
  itemStyle: {
    borderWidth: 0,
    borderColor: 'rgba(0,0,0,0)'
  }
}
// *********************************************** parallel **************************************************
const parallel = {
  itemStyle: {
    borderWidth: 0,
    borderColor: 'rgba(0,0,0,0)'
  }
}
// *********************************************** sankey ****************************************************
const sankey = {
  itemStyle: {
    borderWidth: 0,
    borderColor: 'rgba(0,0,0,0)'
  }
}
// *********************************************** funnel ****************************************************
const funnel = {
  itemStyle: {
    borderWidth: 0,
    borderColor: 'rgba(0,0,0,0)'
  }
}
// *********************************************** gauge *****************************************************
const gauge = {
  itemStyle: {
    borderWidth: 0,
    borderColor: 'rgba(0,0,0,0)'
  }
}
// *********************************************** candlestick ***********************************************
const candlestick = {
  itemStyle: {
    color: '#eb5454',
    color0: '#47b262',
    borderColor: '#eb5454',
    borderColor0: '#47b262',
    borderWidth: 1
  }
}
// *********************************************** graph *****************************************************
const graph = {
  itemStyle: {
    borderWidth: 0,
    borderColor: '#ccc'
  },
  lineStyle: {
    width: 1,
    color: '#aaa'
  },
  symbolSize: 4,
  symbol: 'emptyCircle',
  smooth: false,
  color: [
    '#5470c6',
    '#91cc75',
    '#fac858',
    '#ee6666',
    '#73c0de',
    '#3ba272',
    '#fc8452',
    '#9a60b4',
    '#ea7ccc'
  ],
  label: {
    color: '#eee'
  }
}
// *********************************************** map *******************************************************
const map = {
  itemStyle: {
    areaColor: '#eee',
    borderColor: '#444',
    borderWidth: 0.5
  },
  label: {
    color: '#000'
  },
  emphasis: {
    itemStyle: {
      areaColor: 'rgba(255,215,0,0.8)',
      borderColor: '#444',
      borderWidth: 1
    },
    label: {
      color: 'rgb(100,0,0)'
    }
  }
}
// *********************************************** geo *******************************************************
const geo = {
  itemStyle: {
    areaColor: '#eee',
    borderColor: '#444',
    borderWidth: 0.5
  },
  label: {
    color: '#000'
  },
  emphasis: {
    itemStyle: {
      areaColor: 'rgba(255,215,0,0.8)',
      borderColor: '#444',
      borderWidth: 1
    },
    label: {
      color: 'rgb(100,0,0)'
    }
  }
}
// *********************************************** radar *******************************************************
const radar = {
  itemStyle: {
    borderWidth: 1
  },
  lineStyle: {
    width: 2
  },
  symbolSize: 4,
  symbol: 'emptyCircle',
  smooth: false
}

export default {
  backgroundColor,
  color,
  textStyle,
  title,
  tooltip,
  line,
  radar,
  bar,
  pie,
  scatter,
  boxplot,
  parallel,
  sankey,
  funnel,
  gauge,
  candlestick,
  graph,
  map,
  geo,
  categoryAxis,
  valueAxis,
  logAxis,
  timeAxis,
  toolbox,
  legend,
  timeline,
  visualMap,
  dataZoom,
  markPoint
}
