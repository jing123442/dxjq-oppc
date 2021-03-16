const colors = {
  1: 'rgba(56, 137, 255, .2)',
  2: 'rgba(156, 137, 255, .2)',
  3: 'rgba(56, 237, 255, .2)',
  4: 'rgba(56, 237, 155, .2)'
}

const MAP_AREA_LIST = [
  {
    name: '冀南',
    list: [{
      name: '石家庄市',
      value: 1
    }, {
      name: '衡水市',
      value: 1
    }, {
      name: '沧州市',
      value: 1
    }, {
      name: '邢台市',
      value: 1
    }, {
      name: '邯郸市',
      value: 1
    }]
  }, {
    name: '豫北',
    list: [{
      name: '安阳市',
      value: 2
    }, {
      name: '濮阳市',
      value: 2
    }, {
      name: '新乡市',
      value: 2
    }, {
      name: '郑州市',
      value: 2
    }, {
      name: '南阳市',
      value: 2
    }, {
      name: '信阳市',
      value: 2
    }]
  }, {
    name: '鲁西',
    list: [{
      name: '临沂市',
      value: 3
    }, {
      name: '德州市',
      value: 3
    }, {
      name: '枣庄市',
      value: 3
    }, {
      name: '济南市',
      value: 3
    }, {
      name: '聊城市',
      value: 3
    }, {
      name: '菏泽市',
      value: 3
    }, {
      name: '济宁市',
      value: 3
    }, {
      name: '泰安市',
      value: 3
    }]
  }, {
    name: '鲁东',
    list: [{
      name: '潍坊市',
      value: 4
    }, {
      name: '日照市',
      value: 4
    }, {
      name: '淄博市',
      value: 4
    }, {
      name: '滨州市',
      value: 4
    }, {
      name: '青岛市',
      value: 4
    }, {
      name: '烟台市',
      value: 4
    }, {
      name: '威海市',
      value: 4
    }, {
      name: '东营市',
      value: 4
    }]
  }
]

export function mapAreaList() {
  const tmpAreaList = []
  MAP_AREA_LIST.forEach(item => {
    item.list && item.list.forEach(area => {
      tmpAreaList.push({
        name: area.name,
        value: area.value,
        itemStyle: {
          areaColor: colors[area.value]
        }
      })
    })
  })

  return tmpAreaList
}
