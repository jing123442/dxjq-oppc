<template>
    <div>
      <el-upload
        :key="index"
        :action="'#'"
        class="fileBox"
        list-type="none"
        accept=".jpg,.png,bmp"
        :multiple="true"
              :limit="9"
              :show-file-list="false"
              :on-change="(file, fileList) => changeFile(file, fileList, index)"
              :auto-upload="false">
              <div slot="default">
                <img :src="item.path ? item.path : item.defaultPath" alt="">
              </div>
            </el-upload>
        </div>
</template>
<script>
export default {
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
    changeFile(file, fileList, index) {
      const fileD = new FormData()
      fileD.append('file', file.raw)
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
