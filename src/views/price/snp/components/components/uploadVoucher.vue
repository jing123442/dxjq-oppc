<template>
    <div>
      <el-upload
        :action="'#'"
        ref="upload"
        list-type="picture-card"
        :http-request="uploadImage"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        accept=".jpg,.png,.bmp"
        :limit="max"
        :file-list="imgFileList"
        :before-upload="beforeImageUpload"
        :exceed-limit="handleExeed"
        :on-error="handleError"
        :on-success="hendleSuccess"
        >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog title='预览图片' :visible.sync="imgVisible" size="large" :append-to-body="true">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
</template>
<script>
import { $upload } from '@/service/main'
export default {
  name: 'ImgUpload',
  props: {
    max: {
      type: Number,
      default: 3
    },
    imgList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      imgFileList: [],
      imgVisible: false,
      dialogImageUrl: ''
    }
  },
  mounted () {
    this.mergeEditData()
    this.submitImgList()
  },
  beforeDestroy() {
    this.imgVisible = false
  },
  methods: {
    mergeEditData () { // 父传入数据处理
      if (this.imgList.length > 0) {
        this.imgFileList = this.imgList.map(item => {
          return {
            url: item
          }
        })
      }
    },
    submitImgList () { // 向父传递数据
      const emitImgList = []
      if (this.imgFileList.length > 0) {
        this.imgFileList.forEach(item => {
          emitImgList.push(item.url)
        })
      }
      this.$emit('changeImgList', emitImgList)
    },
    uploadImage (file) { // 手动上传，成功由onsucceess处理，失败由onerror处理
      return new Promise((resolve, reject) => {
        const formData = new FormData()
        formData.append('file', file.file)
        $upload(formData).then(res => {
          if (res.data.code === 0) {
            const url = this.$store.state.file.fileHost + res.data.data
            resolve(url)
          } else {
            reject(new Error('上传失败'))
          }
        }).catch(error => {
          console.log(error, 'error')
          reject(error)
        })
      })
    },
    hendleSuccess (url, file) { // 上传成功
      const tempObj = {
        url: url,
        uid: file.uid
      }
      this.imgFileList.push(tempObj)
      this.submitImgList()
    },
    handleError (error) { // 上传失败
      this.$message.error(error)
    },
    handleRemove (file) { // 删除图片
      const index = this.imgFileList.findIndex(item => item.url === file.url)
      this.imgFileList.splice(index, 1)
      this.submitImgList()
    },
    handlePreview (file) {
      this.dialogImageUrl = file.url
      this.imgVisible = true
    },
    beforeImageUpload (file) { // 上传前校验
      const types = ['image/jpeg', 'image/png', 'image/bmp']
      const isImg = types.includes(file.type)
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isImg) {
        this.$message.error('上传图片只能是 JPG、PNG、BMP 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isImg && isLt2M
    },
    handleExeed () { // 超出限制
      this.$message.error(`此处仅限${this.max}张图片`)
    }
  }
}
</script>
<style>
</style>
