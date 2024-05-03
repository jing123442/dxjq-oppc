/* eslint-disable */
import { h } from 'vue'
export const getTableColumns = () => [{
  type: "selection",
  width: "55",
  fixed: "left",
},
{
  prop: "gasstationId",
  label: "加气站",
  width: "150",
},
{
  prop: "typeCode",
  label: "站对接类型码",
  width: "150",
},
{
  prop: "running",
  label: "执行中",
  children: [{
    prop: "zshPrice",
    label: "中石化零售价（元/公斤）",
    width: "100",
  },
  {
    prop: "platformPrice",
    label: "平台价（元/公斤）",
  },
  {
    prop: "showPrice",
    label: "挂牌价（元/公斤）",
  }],
},
{
  prop: "waiting",
  label: "待执行",
  children: [{
      prop: "zshPrice",
      label: "中石化零售价（元/公斤）",
      width: '100'
    },
    {
      prop: "expectExecuteTime",
      label: "预计执行时间",
      width: "150",
    },
    {
      prop: "platformPrice",
      label: "平台价（元/公斤）",
    },
    {
      prop: "showPrice",
      label: "挂牌价（元/公斤）",
    },
    {
      prop: "expectExecuteTime",
      width: "150",
      label: "预计执行时间", // ?????俩个
    },
    {
      prop: "status",
      label: "审核状态",
    }
  ],
},
{
  prop: "curMonth",
  label: "当月",
  children: [{
    prop: "profitTarget",
    label: "利润目标（元）",
  }]
},
{
  prop: "curMonthFinished",
  label: "当月已完成",
  children: [{
    prop: "profit",
    label: "利润（元）",
  }, {
    prop: "cutPrice",
    label: "让利（元）",
  }, {
    prop: "markup",
    label: "加价（元）",
  }]
},
{
  prop: "curMonthExpected",
  label: "当月预计",
  children: [{
    prop: "surPlusProfit",
    label: "剩余利润（元）",
  }, {
    prop: "surPlusCutPrice",
    label: "剩余让利（元）",
  }, {
    prop: "surPlusMarkup",
    label: "剩余加价（元）",
  }, {
    prop: "completionRate",
    label: "目标完成率",
    width: "120",
  }]
},
{
  prop: "operation",
  label: "操作",
  width: "250",
  fixed: "right",
  slot: 'operation', // 这里是插槽的名称
},
];
export const getTableData = async ({
  page,
  size,
  id
}) => {
  console.log('check table data>>>', page, size, id);
  return [{
    gasstationId: '1',
    typeCode: '1',
    running: '1',
    waiting: '1',
    curMonth: '1',
    curMonthFinished: '1',
    curMonthExpected: '1',
    operation: '1',
    zshPrice: '1',
    platformPrice: '1',
    showPrice: '1',
    profitTarget: '1',
    profit: '1',
    cutPrice: '1',
    markup: '1',
    surPlusProfit: '1',
    surPlusCutPrice: '1',
    surPlusMarkup: '1',
    completionRate: '1',
    expectExecuteTime: '2022-01-01 00:00:00',
  }]
}
