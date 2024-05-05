<template>
  <div class="price-record">
    <TableFilter style="margin-bottom: 20px;" @search="search"/>
    <NewTable
      :columns="columns"
      :data="tableData"
      @size-change="sizeChange"
      @current-change="currentChange">
      <!-- 执行状态插槽 -->
      <div slot="voucher" slot-scope="scope">
        {{scope.row.status}}?
        <el-button type="text" @click='showUpload(scope.row)'>上传</el-button>
        <el-button type="text" @click='showPreview(scope.row)'>查看</el-button>
      </div>
    </NewTable>
    <el-dialog title='上传凭证' :visible.sync='uploadVisible' :append-to-body="true">
        <div class='dialog-con'>
          <PriceAdjustment v-if="uploadVisible" :voucherList='imgList' :renderItems="['uploadVoucher']" @submitForm='uploadVoucher' @closeInfo='uploadVisible = false'></PriceAdjustment>
        </div>
    </el-dialog>
    <el-dialog title='查看凭证' :visible.sync='previewVisible' :append-to-body="true">
      <div class='img-con'>
        <div v-for='(item,index) in imgList' :key='index' class='img-item' @click="handlePreview(item)">
          <img :src="item" alt="" />
          <span> 看看</span>
        </div>
      </div>
      <el-dialog title='预览图片' :visible.sync="imgVisible" size="large" :append-to-body="true">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import TableFilter from './PriceRecordFilter.vue'
import NewTable from '@/components/Table/newTable.vue'
import { getColumns, getTableData } from './PriceRecord.js'
import PriceAdjustment from '../components/priceAjustment.vue'
export default {
  components: {
    PriceAdjustment,
    TableFilter,
    NewTable
  },
  props: {
    data: {
      type: [Object, Array],
      default: () => ({})
    }
  },
  data() {
    return {
      tableData: [],
      params: {
        page: 1,
        size: 10,
        key: '',
        time: [],
        type: ''
      },
      uploadVisible: false,
      previewVisible: false,
      imgList: [
        `${this.$store.state.file.fileHost}image/M00/00/A0/rB86LWY15juAYmsvAABjzhZEEh0934.jpg`,
        `${this.$store.state.file.fileHost}image/M00/00/A0/rB86LWY15juAYmsvAABjzhZEEh0934.jpg`,
        `${this.$store.state.file.fileHost}image/M00/00/A0/rB86LWY15juAYmsvAABjzhZEEh0934.jpg`,
        `${this.$store.state.file.fileHost}image/M00/00/A0/rB86LWY15juAYmsvAABjzhZEEh0934.jpg`,
       `${this.$store.state.file.fileHost}image/M00/00/A0/rB86LWY15juAYmsvAABjzhZEEh0934.jpg`
      ], // ['http://www.baidu.com','xxxx']
      imgVisible: false,
      dialogImageUrl: ''
    }
  },
  watch: {
    data: {
      handler(val) {
        console.log('data>>>>', val)
      },
      deep: true,
      immediate: true
    },
    params: {
      handler() {
        this.getTableData()
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    columns() {
      return getColumns()
    }
  },
  methods: {
    showUpload (row) {
      this.uploadVisible = true
      // this.imgList = row.voucher
    },
    showPreview (row) {
      this.previewVisible = true
      // this.imgList = row.voucher
    },
    uploadVoucher (form) {
      if (form.images.length === 0) {
        this.$message.error('请上传图片')
      } else {
        // 上传图片
        // 关闭dialog
        // this.imgList = form.images
      }
    },
    handlePreview (url) {
      this.dialogImageUrl = url
      this.imgVisible = true
    },
    async getTableData () {
      console.log('search>>>>', this.params)
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.7)'
      })
      this.tableData = await getTableData(this.params)
      loading.close()
    },
    sizeChange (size) {
      this.params.size = size
    },
    currentChange (page) {
      this.params.page = page
    },
    search(params) {
      this.params = {
        ...this.params,
        ...params
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.price-record {
  display: flex;
  flex-direction: column;
}
.dialog-con{
  padding: 20px;
}
.img-item{
  position:relative;
  display: inline-block;
  width: 167px;
  transition: all 0.3s;
  border-radius: 6px;
  margin: 10px;
  overflow: hidden;
  img{
    width: 167px;
  }
  span{
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    color: #fff;
    text-align: center;
    line-height:167px;
    cursor: pointer;
    opacity: 0;
      transition: all 0.3s;

  }
}
.img-item:hover{
  span{
    display: block;
    opacity: 1;
  }
}
</style>
