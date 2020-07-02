<template>
  <div class="bind-driver-main">
    <form action="/">
      <van-search class="searchInput" v-model="user.value" placeholder="请输入司机姓名/电话" @search="onSearch" />
    </form>

    <van-pull-refresh v-model="user.loading" :head-height="80" @refresh="onRefresh">
      <van-list v-model="user.loading" :finished="user.finished" finished-text="没有更多了" @load="driverList">
        <div v-for="(item,index) in user.list" :key="index">
          <order-list :item="item" :parse="parse" :eventType="'end'" @clickEvent="clickEvent"></order-list>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { $carrierAllDriverList, $truckToDriverSave, /* $truckToDriverSaveBatch, */ $removeTruckToDriver } from '@/service/carrier'
import { OrderList } from '@/components'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      pages: {
        page: 1,
        size: 10
      },
      user: {
        list: [],
        value: '',
        loading: false,
        finished: false
      },
      parse: {
        image: require('@/assets/component/orderlist/avatar@3x.png'),
        title: { filed: 'userName' },
        data: { filed: 'mobile' },
        value: { filed: 'flag', filter: 'button', style: 'color: #ababab' }
      },
      info: this.$route.query
    }
  },
  computed: {
    ...mapGetters({
      orgId: 'mwxorg'
    })
  },
  components: { OrderList },
  created() {
    document.title = this.info.carNumber + '绑定司机'
  },
  methods: {
    onRefresh() {
      this.pages.page = 1
      this.user.list = []
      this.user.finished = false
      this.driverList()
    },
    driverList() {
      var params = {
        page: this.pages.page,
        size: this.pages.size,
        param: { truckId: this.info.truckId }
      }
      if (this.user.value) {
        params.param.keyWord = this.user.value
      }

      this.user.loading = true
      $carrierAllDriverList(params).then(response => {
        this.user.loading = false
        this.user.list.push(...response.records)

        if (response.total <= this.user.list.length) {
          this.user.finished = true
        }
        this.pages.page++
      })
    },
    onSearch() {
      this.pages.page = 1
      this.user.list = []
      this.user.finished = false
      this.driverList()
    },
    clickEvent(item) {
      var title = '提示'
      let message = '您确认解绑该司机'

      if (item.flag) { message = '您确认绑定该司机' }

      this.$dialog.confirm({
        title: title,
        message: message
      }).then(() => {
        if (item.flag) {
          this.unbindDriver(item)
        } else {
          this.bindDriver(item)
        }
      }).catch(() => {
        this.onRefresh()
      })
    },
    bindDriver(item) {
      var params = {
        orgId: this.info.orgId,
        truckId: this.info.truckId,
        driverId: item.userId,
        driverName: item.userName
      }
      $truckToDriverSave(params).then(response => {
        this.$toast('绑定成功！')
        this.onRefresh()
      })
    },
    unbindDriver(item) {
      const params = {
        driverId: item.userId,
        truckId: this.info.truckId,
        orgId: this.info.orgId
      }
      $removeTruckToDriver(params).then(response => {
        this.$toast('解绑成功！')
        this.onRefresh()
      })
    }
  }
}
</script>
<style lang="scss">
  .bind-driver-main {
    .searchInput {
      padding: 10px;

      .van-cell {
        padding: 8px 10px 8px 0;
      }
    }
  }
</style>
