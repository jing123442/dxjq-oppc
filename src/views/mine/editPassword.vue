<template>
  <div class='mine-page-warp'>
    <nt-form :rowData="row" :pageColumn="page_column" :axios="axios" :response_success="response_success" @onListEvent="onListEvent"></nt-form>
  </div>
</template>

<script>
import { axiosRequestParams } from '@/utils/tools'
import { mapGetters } from 'vuex'
import { $editPassword } from '@/service/user'
export default {
  data() {
    return {
      axios: axiosRequestParams(this),
      row: {}
    }
  },
  computed: {
    ...mapGetters({
      page_column: 'mine_passwordChange_column',
      response_success: 'response_success',
      wopuser: 'wopuser'
    })
  },
  created() {
    this.setRowBtn()
  },
  methods: {
    setRowBtn() {
      this.row._btn = {
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
    },
    onListEvent(obj) {
      const params = {
        userId: this.wopuser.user_id,
        ...this.row
      }
      const self = this
      if (obj.label === '确认修改') {
        delete params._btn
        $editPassword(params).then(res => {
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
    margin: 0;
    padding: 30px 0 0 10px;
    background-color: #ffffff;
  }

</style>
