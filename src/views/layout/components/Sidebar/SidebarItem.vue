<template>
  <div class="menu-wrapper" v-if="$store.state.app.menuType">
    <i v-if="sidebar.opened" @click="toggleSideBar" class="iconfont em-opened el-icon-arrow-left"></i>
    <i v-else @click="toggleSideBar" class="iconfont em-opened el-icon-arrow-right"></i>
    <div v-for="(item, index) in routes" :key="index">
      <template v-if="item.children">
        <router-link v-if="item.children.length===0" :to="item.routePath + '/index'" @click.native="routerLinkButton(item)" :key="item.routeName">
          <el-menu-item :index="item.routePath + '/index'" :class="{'submenu-title-noDropdown':!isNest}">
            <i v-if="item.menuIcon" :class="[(item.menuIconFont ? item.menuIconFont : 'iconfont'),item.menuIcon]"></i>
            <span v-if="item.menuName">{{item.menuName}}</span>
          </el-menu-item>
        </router-link>
        <el-submenu v-else :index="item.routeName||item.routePath" :key="item.routeName">
          <template slot="title">
            <i v-if="item.menuIcon" :class="[(item.menuIconFont ? item.menuIconFont : 'iconfont'), item.menuIcon]"></i>
            <span v-if="item.menuName">{{item.menuName}}</span>
          </template>
          <div v-for="(child, childIndex) in item.children" :key="childIndex">
            <template v-if="!child.hidden">
              <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.routePath"></sidebar-item>
              <router-link v-else :to="item.routePath+child.routePath" :key="child.routeName" @click.native="routerLinkButton(child)">
                <el-menu-item :index="item.routePath+child.routePath">
                  <i v-if="item.children[0].menuIcon" :class="[(child.menuIconFont ? child.menuIconFont : 'iconfont'), child.menuIcon]"></i>
                  <span v-if="child.menuName">{{child.menuName}}</span>
                </el-menu-item>
              </router-link>
            </template>
          </div>
        </el-submenu>
      </template>
    </div>
  </div>
  <div class="menu-wrapper" v-else>
    <i v-if="sidebar.opened" @click="toggleSideBar" class="iconfont em-opened el-icon-arrow-left"></i>
    <i v-else @click="toggleSideBar" class="iconfont em-opened el-icon-arrow-right"></i>
    <div v-for="(item, index) in routes" :key="index">
      <template v-if="!item.hidden&&item.children">
        <router-link v-if="item.children.length===1 && !item.children[0].children && !item.alwaysShow" :to="item.path+item.children[0].path" :key="item.children[0].name">
          <el-menu-item :index="item.path+item.children[0].path" :class="{'submenu-title-noDropdown':!isNest}">
            <i v-if="item.children[0].meta&&item.children[0].meta.icon" :class="[(item.children[0].meta.class ? item.children[0].meta.class : 'iconfont'),item.children[0].meta.icon]"></i>
            <span v-if="item.children[0].meta&&item.children[0].meta.title">{{item.children[0].meta.title}}</span>
          </el-menu-item>
        </router-link>
        <el-submenu v-else :index="item.name||item.path" :key="item.name">
          <template slot="title">
            <i v-if="item.meta&&item.meta.icon" :class="[(item.meta.class ? item.meta.class : 'iconfont'),item.meta.icon]"></i>
            <span v-if="item.meta&&item.meta.title">{{item.meta.title}}</span>
          </template>
          <div v-for="(child, childIndex) in item.children" :key="childIndex">
            <template v-if="!child.hidden">
              <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item>
              <router-link v-else :to="item.path+child.path" :key="child.name">
                <el-menu-item :index="item.path+child.path">
                  <i v-if="item.children[0].meta&&item.children[0].meta.icon" :class="[(child.meta.class ? child.meta.class : 'iconfont'),child.meta.icon]"></i>
                  <span v-if="child.meta&&child.meta.title">{{child.meta.title}}</span>
                </el-menu-item>
              </router-link>
            </template>
          </div>
        </el-submenu>
      </template>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SidebarItem',
  data() {
    return {
      sidebardata: '',
      isNest: false
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },
  props: ['routes'],
  mounted() {},
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    routerLinkButton(item) {
      sessionStorage.setItem('curr_auth_route_name', item.routeName)
      this.$setLocalStorage('curr_auth_button_' + item.routeName, item.buttons)
    }
  }
}

</script>
<style lang="scss" scoped>
  @import "../../../../assets/styles/variables.scss";

  .menu-wrapper {
    &:hover {
      .em-opened {
        display: block;
      }
    }
    .em-opened {
      cursor: pointer;
      display: none;
      position: absolute;
      z-index: 100;
      top: 12px;
      right: -15px;
      width: 22px;
      height: 22px;
      line-height: 22px;
      color: #ffffff;
      background-color: $siderConBg;
      border-radius: 50%;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .8)
    }
  }
  .iconfont {
    vertical-align: middle;
    margin-right: 5px;
    text-align: center;
    font-size: 14px;
    display: inline-table;
  }

  .el-menu-item{
    font-size: 14px;
  }

  a.router-link-active .el-menu-item i.iconfont, a.router-link-active .el-menu-item i.em-iconfont {
    color: $navActiveTextColor;
  }

  .el-menu-item i.iconfont, .el-menu-item i.em-iconfont {
    color: $navSuffixColor;
  }

  .el-submenu__title i.iconfont, .el-submenu__title i.em-iconfont {
    color: $navSuffixColor;
  }

  .el-menu-item div.el-tooltip {
    /*position: absolute;*/
  }

</style>
