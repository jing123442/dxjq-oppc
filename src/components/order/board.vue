<template>
  <bulletin-board :options="options" @submit="onSubmit"></bulletin-board>
</template>

<script>
import { $truckTransferBalance, $truckTransferSave } from '@/service/business'
import { $truckInfo } from '@/service/carrier'
import { BulletinBoard } from '@/components'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      info: this.$route.query,
      options: {
        headImg: require('@/assets/carrier/inventory/pic@3x.png'),
        id: this.$route.query.accountId,
        title: this.$route.query.carNumber,
        subTitle: { name: '' },
        placeholder: '请输入圈存金额',
        input: {
          prev: '￥',
          value: ''
        },
        info: {
          prev: '当前账户余额',
          unit: '',
          value: ''
        }
      }
    }
  },
  components: { BulletinBoard },
  computed: {
    ...mapGetters({
      user: 'mwxuser'
    })
  },
  created() {
    this.getTransferBalance()
    this.truckInfo()
  },
  mounted() {},
  methods: {
    onSubmit(value) {
      const params = {
        orgId: this.info.orgId,
        orgName: this.info.orgName,
        truckId: this.info.truckId,
        truckName: this.info.truckName,
        amount: value,
        carNumber: this.info.carNumber,
        creater: this.user.user_id,
        createrName: this.user.user_name
      }
      $truckTransferSave(params).then(response => {
        this.$toast('成功！')
        setTimeout(() => {
          this.$router.go(-1)
        }, 500)
      })
    },
    truckInfo() {
      const params = { truckId: this.info.truckId }
      $truckInfo(params).then(response => {
        this.info.truckName = response.truckName
      })
    },
    getTransferBalance() {
      const params = {
        orgId: this.info.orgId,
        truckId: this.info.truckId
      }

      $truckTransferBalance(params).then(response => {
        if (response.truckAccountInfo != null) {
          this.options.subTitle.name = '余额 ¥ ' + response.truckAccountInfo.balance
        } else {
          this.options.subTitle.name = '暂无数据！'
        }
        if (response.orgAccountInfo != null) {
          this.options.info.prev = '当前账户余额 ' + response.orgAccountInfo.balance + ' 元'
        } else {
          this.options.info.prev = '暂无数据！'
        }
      })
    }
  }
}
</script>
