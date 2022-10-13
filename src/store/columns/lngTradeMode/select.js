const optContentList = [
  { value: "开启", label: "开启直销模式" },
  { value: "关闭", label: "关闭直销模式" },
  // { value: "关闭", label: "关闭直销模式，转为经销模式" },
];
const select = {
  carrierDsConfig: {
    tradeType: [
      { value: 1, label: "经销加气" },
      { value: 2, label: "直销加气" },
    ],
  },
  fillerDsConfig: {
    tradeType: [
      { value: 1, label: "经销加气" },
      { value: 2, label: "直销加气" },
    ],
  },
  carDsConfig: {
    optContent: optContentList,
    currDataSearch: [{ value: "operatorDate", label: "操作时间" }],
  },
  carrierOprateLog: {
    optContent: optContentList,
    currDataSearch: [{ value: "operatorDate", label: "操作时间" }],
  },
  fillerOprateLog: {},
};

export default select;
