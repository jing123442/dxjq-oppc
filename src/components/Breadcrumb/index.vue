<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <StationName v-show="isName" />
    <transition-group name="breadcrumb">
      <div v-for="(item,index)  in levelList" :key="item.path">
        <el-breadcrumb-item v-if='item.meta.title'>
          <span v-if='item.redirect==="noredirect"||index === levelList.length - 1' class="no-redirect">{{item.meta.title}}</span>
          <router-link v-else :to="item.redirect||item.path" style="cursor: pointer">{{item.meta.title}}</router-link>
          <span style="display: inline-block;padding: 0 5px;" v-if="index != levelList.length - 1">/</span>
        </el-breadcrumb-item>
      </div>
    </transition-group>
  </el-breadcrumb>
</template>
<script>
import StationName from '@/components/StationName.vue'

export default {
  components: { StationName },
  created() {
    this.getBreadcrumb()
  },
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  computed: {
    isName() {
      const names = ['stationStock', 'stationWisdom', 'stationSite', 'stationMonitor', 'stationRecharge', 'stationOrder', 'stationProfit', 'stationControl']

      if (names.includes(this.$route.name)) {
        return true
      }
      return false
    }
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name)

      const first = matched[0]
      if (first && first.name !== 'home') {
        matched = [].concat(matched)
      } else {
        matched = [{ path: '/home/index', meta: { title: '首页' } }]
      }

      this.levelList = matched
    }
  }
}

</script>
