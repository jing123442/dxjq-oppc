<template>
  <div class="scroll-container" ref="scrollContainer" @wheel="handleScroll">
    <div class="scroll-wrapper" ref="scrollWrapper" :style="{top: top + 'px'}">
      <slot></slot>
    </div>
  </div>
</template>
<script>
const delta = 15

export default {
  name: 'scrollBar',
  props: {
    isResetTop: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      top: 0
    }
  },
  watch: {
    $route() {
      this.isResetTop && (this.top = 0)
    }
  },
  methods: {
    handleScroll(e) {
      const eventPath = e.path
      if (eventPath.some(this.pathCheck)) {
        return
      }
      const eventDelta = e.wheelDelta || -e.deltaY * 3
      const $container = this.$refs.scrollContainer
      const $containerHeight = $container.offsetHeight
      const $wrapper = this.$refs.scrollWrapper
      const $wrapperHeight = $wrapper.offsetHeight
      if (eventDelta > 0) {
        this.top = Math.min(0, this.top + eventDelta)
      } else {
        if ($containerHeight - delta < $wrapperHeight) {
          if (this.top >= -($wrapperHeight - $containerHeight + delta)) {
            this.top = Math.max(this.top + eventDelta, $containerHeight - $wrapperHeight - delta)
          }
        } else {
          this.top = 0
        }
      }
    },
    pathCheck(item) {
      return item.className == 'order-list' || item.className == 'el-scrollbar'
    }
  }
}

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../assets/styles/variables.scss';

.scroll-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: $navBg; //#545c64;
  .scroll-wrapper {
    position: absolute;
    width: 100%!important;
  }
}

</style>
