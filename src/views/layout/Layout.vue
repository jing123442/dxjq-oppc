<template>
  <div id="app">
    <el-header v-if="!subpageFullScreen">
      <Header></Header>
    </el-header>
    <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
      <sidebar class="sidebar-container" v-if="!subpageFullScreen"></sidebar>
      <div :class="!subpageFullScreen ? 'main-container' : 'subpageFullScreen margLeft0'">
        <navbar v-if="!subpageFullScreen"></navbar>
        <app-main></app-main>
      </div>
    </div>
  </div>
</template>
<script>
import { Navbar, Sidebar, AppMain, Header } from '@/views/layout/components' //
import { mapGetters } from 'vuex'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    Header
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    ...mapGetters({
      subpageFullScreen: 'subpage_full_screen'
    })
  },
  methods: {
    logout() {
      this.$store.dispatch('logout').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    goWord() {
      this.$router.push('/HelloWorld')
    }
  }
}
</script>
