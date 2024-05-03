<template>
    <div class="new-table-list-filter">
      <div class="filter-left">
        <el-input
          size="small"
          prefix-icon="el-icon-search"
          placeholder="请输入 加气站"
          v-model="searchKey"
          @keyup.enter.native="search"
          clearable>
        </el-input>
        <el-button type="" size="small" @click="searchKey = '';search()">重置</el-button>
        <el-button type="primary" size="small" @click="search">查询</el-button>
      </div>
      <div class="filter-right">
        <el-button type="primary" size="small" @click="dialogTableVisible = true">添加名单</el-button>
      </div>
      <el-dialog title="增加中石化零售价" :visible.sync="dialogTableVisible" :append-to-body="true">
        <el-form size="small">
          <el-form-item label="加气站" required>
            <el-select v-model="gasStation" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label=" ">
            <div style="width:100%;display:flex;justify-content:center;margin:10px auto 15px;">
              <el-button type="primary" size="small" @click="ok">确定</el-button>
              <el-button type="" size="small" @click="dialogTableVisible = false" style="">取消</el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'newTableListFilter',
  data() {
    return {
      searchKey: '',
      gasStation: '',
      dialogTableVisible: false,
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }]
    }
  },
  methods: {
    // 确定添加名单
    ok() {
      this.dialogTableVisible = false
      this.$emit('add', this.gasStation)
    },
    // 查询表中的值
    search() {
      this.$emit('search', this.searchKey)
    }
  }
}
</script>

<style lang="scss" scoped>
.new-table-list-filter {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  .filter-left {
    display: flex;
    .el-input {
      margin-right: 10px;
    }
  }
  .filter-right {
    display: flex;
  }
}
</style>
