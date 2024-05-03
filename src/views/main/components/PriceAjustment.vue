<template>
  <div class="price-ajustment">
    中石化零售价.调价 弹窗:{{ data }}
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: [Object, Array],
      default: () => ({})
    }
  }
}
</script>

<style lang="scss" scoped>
.price-ajustment {
  display: flex;
}
</style>
