<template>
  <section class="app-main">
    <scroll-bar>
      <transition name="fade" mode="out-in">
        <keep-alive :include="cachedViews">
          <router-view></router-view>
        </keep-alive>
      </transition>
    </scroll-bar>
  </section>
</template>
<script>
import ScrollBar from '@/components/ScrollBar'

export default {
  name: 'AppMain',
  components: { ScrollBar },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    }
  }
}

</script>
