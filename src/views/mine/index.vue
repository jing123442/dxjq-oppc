<template>
  <div class='mine-page-warp'>
    <nt-form :rowData="row" :pageColumn="page_column" :axios="axios" :response_success="response_success" @onListEvent="onListEvent"></nt-form>
  </div>
</template>

<script>
import { axiosRequestParams } from '@/utils/tools'
import { mapGetters } from 'vuex'
import {
  $userFind,
  $userEdit
} from '@/service/user'
export default {
  data() {
    return {
      axios: axiosRequestParams(this),
      row: {}
    }
  },
  computed: {
    ...mapGetters({
      page_column: 'mine_personal_column',
      response_success: 'response_success'
    })
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      const params = {
        userId: JSON.parse(localStorage.getItem('wopuser')).user_id
      }
      const self = this
      $userFind(params).then(res => {
        if (res.code === 0) {
          self.row = res.data.user
          self.row._btn = {
            iShow: true,
            list: [{
              bType: 'primary',
              label: '确认修改',
              icon: ''
            }, {
              bType: 'primary',
              label: '取消',
              icon: ''
            }]
          }
        }
      })
    },
    onListEvent(obj) {
      const params = { ...this.row }
      const self = this
      if (obj.label === '确认修改') {
        console.log(params)
        $userEdit(params).then(res => {
          if (res.code === 0) {
            self.$message.success(res.message)
          } else {
            self.$message.error(res.message)
          }
        })
      } else {
        this.$router.push('/home/index')
      }
    }
  }
}

</script>

<style lang='scss'>
  .mine-page-warp {
    margin: 30px 0 0 10px;
  }

</style>
