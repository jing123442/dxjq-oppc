<template>
  <div class="lisenceUpload">
    <div class="card card-file">
      <el-upload
        v-for="(item, index) in lisenceArray"
        :key="index"
        :action="'#'"
        class="fileBox"
        list-type="none"
        :show-file-list="false"
        accept=".jpg,.png"
        @click.native="setCurrentIndex(item)"
        :on-change="changeFile"
        :disabled="item.isDisabled"
        :auto-upload="false">
          <div slot="default">
            <img :src="item.path ? item.path : item.defaultPath" alt="">
            <div :class="status == 3 ? 'text mode' : 'text'" v-if="!item.isDisabled">{{item.text}}</div>
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
      lisenceArray: [{
        field: 'idCardFont',
        path: '',
        isDisabled: false,
        defaultPath: require('@/assets/images/main/idcardfont-bg@2x.png'),
        text: '上传法人身份证人像面'
      }, {
        field: 'idCardBack',
        path: '',
        isDisabled: false,
        defaultPath: require('@/assets/images/main/idcardback-bg@2x.png'),
        text: '上传法人身份证国徽面'
      }],
      currentIndex: '',
      status: null
    }
  },
  mounted() {
    this.getOrgPicList()
    this.statusJudgement()
  },
  methods: {
    setCurrentIndex(item) {
      switch (item.field) {
        case 'idCardFont':
          this.currentIndex = 8
          break
        case 'idCardBack':
          this.currentIndex = 9
          break
        default:
          break
      }
    },
    changeFile(file, fileList) {
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
        picTypes: [8, 9],
        orgId: this.$route.query.orgId
      }
      $userOrgPicList(params).then(res => {
        if (res.code === 0) {
          res.data.length > 0 && res.data.forEach(item => {
            if (item.picType == 8) {
              this.lisenceArray[0].path = pathUrl + item.picPath
            } else if (item.picType == 9) {
              this.lisenceArray[1].path = pathUrl + item.picPath
            }
          })
        }
      })
    },
    statusJudgement(picType = 0) {
      const params = {
        orgId: this.$route.query.orgId
      }
      $userOrgFind(params).then(res => {
        if (res.code === 0) {
          this.status = res.data.idcardStatus
          if (this.status) {
            if (picType == 0 || picType == 8) this.lisenceArray[0].isDisabled = true
            if (picType == 0 || picType == 9) this.lisenceArray[1].isDisabled = true
          } else {
            if (picType == 0 || picType == 8) this.lisenceArray[0].isDisabled = false
            if (picType == 0 || picType == 9) this.lisenceArray[1].isDisabled = false
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
