<template>
  <div class="order-create-main">
    <div class="header">
      <img class="image" :src="options.headImg" alt="">
      <div class="title">{{options.title}}</div>
      <div class="sub-title" v-if="options.subTitle">
        <div v-if="options.subTitle.type == 'click'" :style="options.subTitle.style" @click="clickSubTitle(options.subTitle.path)">{{options.subTitle.name}}</div>
        <div v-else :style="options.subTitle.style">{{options.subTitle.name}}</div>
      </div>
    </div>
    <div class="order-create-top">
      <div class="placeholder">{{options.placeholder}}</div>
      <div class="input-label" v-if="options.input">
        <span>{{options.input.prev || ''}}</span>
        <input id="inputValue" class="input-mumber" v-model="options.input.value" type="number" />
      </div>
      <div v-if="options.info" class="info">
        {{options.info.prev || ''}}
        {{options.info.value}}
        {{options.info.unit || ''}}
      </div>
    </div>
    <van-button class="finish-submit" @click="submit()" type="info">确定</van-button>
  </div>
</template>

<script>
export default {
  name: 'BulletinBoard',
  props: {
    options: {
      type: Object,
      required: true
    }
  },
  mounted() {
    document.getElementById('inputValue').focus()
  },
  methods: {
    submit() {
      this.$emit('submit', this.options.input.value)
    },
    clickSubTitle(path) {
      this.$router.push({
        path: path,
        query: { gasId: this.options.id }
      })
    }
  }
}
</script>

<style lang="scss">
  .order-create-main {
    background: #fafafa;
    width: 100%;
    height: 100%;
    padding: 20px 0;

    .header {
      text-align: center;
      .image {
        border-radius: 50%;
        width: 60px;
        height: 60px;
      }
      .title {
        padding: 10px 0;
        font-size: 16px;
        color: #333333;
        font-weight: 500;
      }
      .sub-title {
        color: #999999;
        font-size: 14px;
        padding-bottom: 15px;
      }
    }

    .order-create-top {
      margin-top: 20px;
      background: white;
      padding: 20px;
      text-align: left;

      .placeholder {
        color: #333333;
        background: white;
      }

      .input-label{
        display: flex;
        font-weight: 500;
        align-items: center;
        border-bottom: 1px solid rgb(231, 229, 229);
        span{
          font-size: 40px;
          display: inline-block;
        }
        .input-mumber {
          width: 100%;
          color: #333333;
          padding: 10px 0;
          line-height: 50px;
          font-size: 26px;
          font-weight: 500;
        }
      }

      .info {
        background: white;
        color: #999999;
        padding: 20px 0 0;
      }
    }

    .finish-submit {
      background: #0077ff;
      margin-top: 60px;
      width: 90%;
      height: 40px;
      border-radius: 5px;
      font-size: 16px;
    }
  }
</style>
