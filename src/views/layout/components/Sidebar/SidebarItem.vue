<template>
  <div class="menu-wrapper">
    <div v-for="(item, index) in routes" :key="index">
      <template v-if="!item.hidden&&item.children">
        <router-link v-if="item.children.length===1 && !item.children[0].children && !item.alwaysShow" :to="item.path+item.children[0].path" :key="item.children[0].name">
          <el-menu-item :index="item.path+item.children[0].path" :class="{'submenu-title-noDropdown':!isNest}">
            <i v-if="item.children[0].meta&&item.children[0].meta.icon" :class="['iconfont',item.children[0].meta.icon]"></i>
            <span v-if="item.children[0].meta&&item.children[0].meta.title">{{item.children[0].meta.title}}</span>
          </el-menu-item>
        </router-link>
        <el-submenu v-else :index="item.name||item.path" :key="item.name">
          <template slot="title">
            <i v-if="item.meta&&item.meta.icon" :class="['iconfont',item.meta.icon]"></i>
            <span v-if="item.meta&&item.meta.title">{{item.meta.title}}</span>
          </template>
          <div v-for="(child, childIndex) in item.children" :key="childIndex">
            <template v-if="!child.hidden">
              <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item>
              <router-link v-else :to="item.path+child.path" :key="child.name">
                <el-menu-item :index="item.path+child.path">
                  <i v-if="item.children[0].meta&&item.children[0].meta.icon" :class="['iconfont',child.meta.icon]"></i>
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
export default {
  name: 'SidebarItem',
  data() {
    return {
      sidebardata: '',
      isNest: false
    }
  },
  props: ['routes'],
  mounted() {},
  methods: {}
}

</script>
<style lang="scss" scoped>
  @import "../../../../assets/styles/variables.scss";
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

  a.router-link-active .el-menu-item i.iconfont {
    color: $navActiveTextColor;
  }

  .el-menu-item i.iconfont {
    color: $navSuffixColor;
  }

  .el-submenu__title i.iconfont {
    color: $navSuffixColor;
  }

  .el-menu-item div.el-tooltip {
    /*position: absolute;*/
  }

</style>
