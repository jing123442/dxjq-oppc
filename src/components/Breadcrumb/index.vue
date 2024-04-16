<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
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
export default {
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
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name)

      console.log(matched, 888999)
      const first = matched[0]
      if (first && first.name !== 'home') {
        matched = [].concat(matched)
      } else {
        matched = [{ path: '/home/index', meta: { title: '首页' } }]
      }

      console.log(matched, 44333)
      this.levelList = matched
    }
  }
}

</script>
