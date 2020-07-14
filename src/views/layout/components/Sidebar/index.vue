<template>
  <div>
    <div :class="{ 'titlesid': true,'hide':isCollapse}">
      <div class="logo">
        <span class="logo_prefix">{{prefix}}</span>
        <span class="logo_suffix">{{suffix}}</span>
      </div>
    </div>
    <scroll-bar>
      <el-menu :default-active="$route.path" :collapse="isCollapse" :background-color="menuBg" :text-color="textColor" :active-text-color="activeTextColor">
        <sidebar-item :routes="permission_routers"></sidebar-item>
      </el-menu>
    </scroll-bar>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'

export default {
  data() {
    return {
      menuBg: '#324157',
      textColor: '#fff',
      activeTextColor: '#409EFF'
    }
  },
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar',
      'prefix',
      'suffix'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  created: function() {}
}
</script>
<style lang="scss" scoped>
  @import "../../../../assets/styles/variables.scss";
  .titlesid {
    position: absolute;
    width: 100%;
    top: -60px;
    height: 60px; // margin-top: 10px;
    background: $navBg;
    padding: 20px 0px 10px 20px;
    box-shadow: 2px 0 3px $navShadow;
    z-index: 1;
    .logo {
      float: left;
      cursor: pointer;
      font-size: 14px;
      .logo_prefix {
        color: $navActiveTextColor;
      }
      .logo_suffix {
        color: $navSuffixColor;
      }
    }
  }

  .el-menu {
    margin-bottom: 100px;
  }

  div.hide {
    overflow: hidden;
    padding-left: 10px;
    padding-top: 10px;
  }

</style>
