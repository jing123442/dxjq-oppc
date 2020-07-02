<template>
  <div class="qrcode-page">
    <div>
      <div class="header-image">
        <img :src="qrcodeImage" alt="">
        <div class="subtitle">长按保存图片</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TwoBarCode',
  props: {
    qrcodeImage: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
  .qrcode-page {
    .header-image {
      text-align: center;
      padding: 30px;
      height: 100%;

      img {
        width: 100%;
        background:white;
      }

      .subtitle {
        padding: 20px 0;
        font-size: 17px;
        color: #333333;
      }
    }
  }
</style>
