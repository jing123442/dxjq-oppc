<script type="jsx">
export default {
  render() {
    console.log('ctx>>', this.$slots)
    function getColumns(list = []) {
      return list.map((item, index) => {
        return (
          <el-table-column
            key={index}
            label={item.label}
            prop={item.prop}
            width={item.width}
            fixed={item.fixed}
            type={item.type}
          >
            {
              item.children && getColumns(item.children)
            }
          </el-table-column>
        )
      })
    }
    return (
      <div class="new-table-list">
        <el-table
          data={this.data}
          style="width: 100%"
          onSelect={(...args) => this.select(...args)}
          onSelect-all={(...args) => this.selectAll(...args)}
          onSelection-change={(...args) => this.selectionChange(...args)}
          border
          stripe
        >
          {
            getColumns(this.columns)
          }
        </el-table>
        <el-pagination
          background
          onSize-change={(...args) => this.handleSizeChange(...args)}
          onCurrent-change={(...args) => this.handleCurrentChange(...args)}
          current-page={this.currentPage}
          page-sizes={[10, 30, 50, 100]}
          page-size={ this.pageSize }
          layout="total, sizes, prev, pager, next, jumper"
          total={this.total}></el-pagination>
      </div>
    )
  },
  props: {
    selected: {
      type: Boolean,
      default: true
    },
    total: {
      type: Number,
      default: 100
    },
    columns: {
      type: Array,
      default: () => [{
        type: 'selection',
        width: '55',
        fixed: 'left'
      }, {
        prop: 'stations',
        label: '加气站',
        width: '150'
      }, {
        prop: 'type',
        label: '是/否 一票制',
        width: '150'
      }, {
        prop: 'running',
        label: '执行中',
        width: '120',
        children: [{
          prop: 'zshPrice',
          label: '中石化零售价（元/公斤）'
        }, {
          prop: 'purchasePrice',
          label: '采购价（元/公斤）'
        }, {
          prop: 'totalPrice',
          label: '总服务费（元/公斤）'
        }]
      }]
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
      this.$emit('size-change', val)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.$emit('current-change', val)
    },
    select(selection, row) {
      this.$emit('select', selection, row)
    },
    selectAll(selection) {
      this.$emit('select-all', selection)
    },
    selectionChange(selection) {
      this.$emit('selection-change', selection)
    }
  }
}
</script>

<style lang="scss" scoped>
.new-table-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
  box-sizing: border-box;
  padding: 0 15px;
}
</style>
