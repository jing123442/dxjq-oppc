<template>
  <div id="app">
    <el-header>
      <Header></Header>
    </el-header>
    <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
      <sidebar class="sidebar-container"></sidebar>
      <div class="main-container">
        <navbar></navbar>
        <app-main></app-main>
      </div>
    </div>
  </div>
</template>
<script>
import { Navbar, Sidebar, AppMain, Header } from '@/views/layout/components' //

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
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    goWord() {
      this.$router.push('/HelloWorld')
    }
  }
}
</script>
