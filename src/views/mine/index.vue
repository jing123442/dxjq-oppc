<template>
  <div class='mine-page-warp'>
    <nt-form :rowData="row" :pageColumn="page_column" :axios="axios" :response_success="response_success" @onListEvent="onListEvent"></nt-form>
  </div>
</template>

<script>
import { axiosRequestParams, custFormBtnList } from '@/utils/tools'
import { mapGetters } from 'vuex'
import {
  $userFind,
  $userEdit
} from '@/service/user'
export default {
  data() {
    return {
      axios: axiosRequestParams(this),
      row: {},
      initRow: {}
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
      $userFind(params).then(res => {
        if (res.code === 0) {
          this.initRow = Object.assign({}, res.data.user)
          this.row = res.data.user
          this.row._btn = custFormBtnList()
        }
      })
    },
    onListEvent(obj) {
      if (obj.type === 'ok') {
        const params = { ...this.row }
        if (this.initRow.mobile == params.mobile) {
          delete params.mobile
        }
        $userEdit(params).then(res => {
          this.$message.success(res.message)
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
