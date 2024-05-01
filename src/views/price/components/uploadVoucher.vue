<template>
    <div>
      <el-upload
        :action="'#'"
        :auto-upload="false"
        class="fileBox"
        list-type="picture-card"
        accept=".jpg,.png,.bmp"
        :multiple="true"
        :limit="9"
        :on-change="changeFile"
        >
      </el-upload>
    </div>
</template>
<script>
export default {
  name: 'ImgUpload',
  props: {
    max: {
      type: Number,
      default: 3
    }
  },
  data () {
    return {
      imgList: [{
        field: '',
        path: '',
        isDisabled: false,
        defaultPath: require('@/assets/images/main/license@2x.png'),
        text: ''
      }]
    }
  },
  methods: {
    changeFile(file, fileList) {
      const fileD = new FormData()
      fileD.append('file', file.raw)
      console.log(fileList)
      console.log(file)
    //   $upload(fileD).then(res => {
    //     if (res.data.code === 0) {
    //       var pathUrl = this.$store.state.file.fileHost + res.data.data
    //       this.imgList[index].path = pathUrl
    //       if (this.imgList.length < 3) {
    //         this.$set(this.imgList, this.imgList.length, {
    //           field: '',
    //           path: '',
    //           isDisabled: false,
    //           defaultPath: require('@/assets/images/main/license@2x.png'),
    //           text: ''
    //         })
    //       }
    //     }
    //   })
    }
  }
}
</script>
<style>
</style>
