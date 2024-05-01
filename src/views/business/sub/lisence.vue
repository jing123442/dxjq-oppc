<template>
  <div class="lisenceUpload">
    <div class="card card-file">
      <el-upload
        v-for="(item, index) in lisenceArray"
        :key="index"
        :action="'#'"
        class="fileBox"
        list-type="none"
        accept=".jpg,.png"
        :show-file-list="false"
        @click.native="setCurrentIndex(item)"
        :on-change="changeFile"
        :disabled="isDisabled"
        :auto-upload="false">
          <div slot="default">
            <img :src="item.path ? item.path : item.defaultPath" alt="">
            <div :class="status == 3 ? 'text mode' : 'text'" v-if="!isDisabled">{{item.text}}</div>
          </div>
      </el-upload>
    </div>
  </div>
</template>
<script>
import { $upload } from '@/service/main'
import { $uploadOrgPic } from '@/service/pay'
import { $userOrgPicList, $userOrgFind } from '@/service/user'
export default {
  data() {
    return {
      lisenceArray: [],
      lisenceArrayOne: [{
        field: 'lisence',
        path: '',
        isDisabled: false,
        defaultPath: require('@/assets/images/main/license@2x.png'),
        text: '上传营业执照'
      }],
      lisenceArrayThree: [{
        field: 'lisence',
        path: '',
        isDisabled: false,
        defaultPath: require('@/assets/images/main/license@2x.png'),
        text: '上传营业执照'
      }, {
        field: 'lisence2',
        path: '',
        isDisabled: false,
        defaultPath: require('@/assets/images/main/license@2x.png'),
        text: '上传组织机构代码证'
      }, {
        field: 'lisence3',
        path: '',
        isDisabled: false,
        defaultPath: require('@/assets/images/main/license@2x.png'),
        text: '上传税务登记证'
      }],
      currentIndex: '',
      status: null,
      isDisabled: false
    }
  },
  mounted() {
    this.getOrgPicList()
    this.setLisenceArray()
    this.statusJudgement()
  },
  methods: {
    setLisenceArray() {
      const authType = this.$route.query.authType
      if (authType == 1) {
        this.lisenceArray = this.lisenceArrayThree
      } else if (authType == 2) {
        this.lisenceArray = this.lisenceArrayOne
      }
    },
    setCurrentIndex(item) {
      switch (item.field) {
        case 'lisence':
          this.currentIndex = 1
          break
        case 'lisence2':
          this.currentIndex = 2
          break
        case 'lisence3':
          this.currentIndex = 3
          break
        default:
          break
      }
    },
    changeFile(file, fileList) {
      console.log(file, fileList)
      const fileD = new FormData()
      fileD.append('file', file.raw)
      $upload(fileD).then(res => {
        if (res.data.code === 0) {
          this.uploadOrgPic(res.data.data, this.currentIndex)
        }
      })
    },
    uploadOrgPic(filePath, picType) {
      const params = {
        filePath: filePath,
        orgId: this.$route.query.orgId,
        picType: picType
      }
      $uploadOrgPic(params).then(res => {
        if (res.code === 0) {
          this.$message.success(res.message)
          this.getOrgPicList()
          this.statusJudgement(picType)
        }
      })
    },
    getOrgPicList() {
      var pathUrl = this.$store.state.file.fileHost
      const params = {
        picTypes: [1],
        orgId: this.$route.query.orgId
      }
      $userOrgPicList(params).then(res => {
        res.data.length > 0 && res.data.forEach(item => {
          if (item.picType == 1) {
            if (this.$route.query.authType == 2) {
              this.lisenceArrayOne[0].path = pathUrl + item.picPath
            } else if (this.$route.query.authType == 1) {
              this.lisenceArrayThree[0].path = pathUrl + item.picPath
            }
          } else if (item.picType == 2) {
            this.lisenceArrayThree[1].path = pathUrl + item.picPath
          } else if (item.picType == 3) {
            this.lisenceArrayThree[2].path = pathUrl + item.picPath
          }
        })
      })
    },
    statusJudgement(picType = 0) {
      const params = {
        orgId: this.$route.query.orgId
      }
      $userOrgFind(params).then(res => {
        if (res.code === 0) {
          this.status = res.data.regnumStatus
          if (this.status == 1 || this.status == 2) {
            if (this.$route.query.authType == 2) {
              if (picType == 0 || picType == 1) this.lisenceArrayOne[0].isDisabled = true
            } else if (this.$route.query.authType == 1) {
              if (picType == 0 || picType == 1) this.lisenceArrayThree[0].isDisabled = true
              if (picType == 0 || picType == 2) this.lisenceArrayThree[1].isDisabled = true
              if (picType == 0 || picType == 3) this.lisenceArrayThree[2].isDisabled = true
            }
          } else if (this.status == 0 || this.status == 3) {
            if (this.$route.query.authType == 2) {
              if (picType == 0 || picType == 1) this.lisenceArrayOne[0].isDisabled = false
            } else if (this.$route.query.authType == 1) {
              if (picType == 0 || picType == 1) this.lisenceArrayThree[0].isDisabled = false
              if (picType == 0 || picType == 2) this.lisenceArrayThree[1].isDisabled = false
              if (picType == 0 || picType == 3) this.lisenceArrayThree[2].isDisabled = false
            }
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.fileBox {
  position: relative;
  width: 216px;
  height: 140px;
  &::v-deep .el-upload {
    width: 216px;
    height: 140px;
  }
  .text {
    position: absolute;
    left: 0; right: 0; top: 0; bottom: 0;
    margin: auto;
    line-height: 220px;
    color: #868B9A;
  }
  .mode {
    background: rgba(25,25,25,0.2);
    color: #fff;
  }
  img {
    width: 214px;
    height: 138px;
  }
}
.card-file {
  display: flex;
  padding-bottom: 36px;
  .fileBox {
    margin: 0 16px 0 0;
  }
}
</style>
