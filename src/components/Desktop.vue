<template>
  <div class="content">
    <div class="imgBg" v-for="(item, index) in dataList" :key="index" @click="desktopToEvent(item)">
      <img :src="item.imgUrl" alt="">
      <p>{{item.text}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Desktop',
  props: {
    dataList: {
      type: Array,
      required: true
    },
    gasId: {
      type: String,
      default: ''
    }
  },
  methods: {
    desktopToEvent(item) {
      if (item.type) {
        this.$emit('desktopClick', item)
      } else {
        if (this.gasId) {
          this.$router.push({
            path: item.path,
            query: {
              gasId: this.gasId
            }
          })
        } else {
          this.$router.push({ path: item.path })
        }
      }
    }
  }
}
</script>

<style lang="scss">
  .content {
    display: flex;
    flex-wrap: wrap;
    padding: 10px 30px;
    justify-content: space-between;

    .imgBg {
      width: 45%;
      margin-bottom: 10%;
      padding: 25px 0;
      border-radius: 10px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

      img {
        width: 55px;
        height: 55px;
      }
    }
  }
</style>
