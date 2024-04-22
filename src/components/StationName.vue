<template>
  <div class="card-wrapper">
    奥扬桃林站
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'StationName'
}
</script>
<style lang="scss" scoped>
.card-wrapper {
  position: absolute;
  top: 0;
  right: 15px;
  z-index: 100;
  font-weight: bold;
}
</style>
