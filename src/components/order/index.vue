<template>
  <div @click="openOrderDetail(item)" class="record-content-item">
    <div v-if="cellType === 'cell-box'" class="item-cell-box">
      <div class="cell-header">
        <div>{{item[parse.title.filed]}}</div>
        <van-icon name="arrow" />
      </div>
      <div class="bottom_message" v-for="(line, lineIndex) in parse.list" :key="lineIndex">
        <div class="message" v-for="(node, nodeIndex) in line" :key="nodeIndex">
          <div class="title">{{node.name}}</div>
          <div class="subtitle">
            <span v-if="node.filter === 'currency'">{{item[node.filed] | currency}}</span>
            <span v-else-if="node.filter === 'formateTData'">{{item[node.filed] | formateTData(node.dateType || '')}}</span>
            <span v-else>{{item[node.filed]}}</span>
            {{node.unit || ''}}
          </div>
        </div>
      </div>
    </div>
    <div v-else class="item-list">
      <div class="item-left">
        <img class="left-image" :src="parse.image" alt="">
      </div>
      <div class="item-right">
        <div class="item-left-info">
          <div class="title" v-if="parse.title.filed">{{item[parse.title.filed]}}</div>
          <div class="title" v-else>{{parse.title.value}}</div>
          <div class="order-tabs" v-if="parse.tabs">
            {{parse.tabs.prev || ''}}
            <span v-if="parse.tabs.filter === 'currency'"> {{item[parse.tabs.filed] | currency}} </span>
            <span v-else> {{item[parse.tabs.filed]}} </span>
            {{parse.tabs.unit || ''}}
          </div>
          <div class="order-no-tabs" v-else></div>
          <div class="data" v-if="parse.data" :style="parse.data.style">
            <span v-if="parse.data.filter === 'formateTData'">{{item[parse.data.filed] | formateTData}}</span>
            <span v-else-if="parse.data.filter === 'list'">
            <span class="list-name" v-for="(user, userIndex) in item[parse.data.filed]" :key="userIndex">{{user[parse.data.listFiled]}}</span>
          </span>
            <span v-else-if="parse.data.filter === 'tag'">
            <van-tag color="#CEE2FF" text-color="#0077ff" :size="parse.data.size">{{parse.data.prev}}{{item[parse.data.filed]}}</van-tag>
          </span>
            <span v-else> {{item[parse.data.filed]}} </span>
          </div>
        </div>
        <div class="value" v-if="parse.value">
          <span v-if="parse.value.filter === 'currency'">{{item[parse.value.filed] | currency('', parse.value.prev || '￥')}} </span>
          <span v-else-if="parse.value.filter === 'arrow'" :style="parse.value.style"><van-icon name="arrow" /> </span>
          <span v-else-if="parse.value.filter === 'button'" class="user-unbind">
          <van-button  plain hairline :type="item[parse.value.filed] == 1 ? 'danger':'info'" @click.stop="btnEvent(item)">{{item[parse.value.filed] == 1 ? "解绑":"绑定"}}</van-button>
        </span>
          <span v-else>{{item[parse.value.filed]}} </span>
          {{parse.value.unit || ''}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderList',
  props: {
    item: {
      type: Object,
      required: true
    },
    parse: {
      type: Object,
      required: true
    },
    eventType: {
      type: String,
      default: ''
    },
    cellType: {
      type: String,
      default: 'list'
    }
  },
  methods: {
    openOrderDetail(item) {
      if (this.eventType == 'cashier') {
        this.$router.push({
          path: '/cashierDetail',
          query: { orderId: item.orderId }
        })
      } else if (this.eventType == 'bind') {
        this.$router.push({
          path: '/bindDriver',
          query: item
        })
      } else if (this.eventType == 'board') {
        this.$router.push({
          path: '/inBulletinBoard',
          query: item
        })
      } else if (this.eventType == 'account') {
        item.currData = this.parse.currDate
        this.$router.push({
          path: '/accountStatement',
          query: item
        })
      } else if (this.eventType == 'end') {
        return false
      } else {
        this.$router.push({
          path: '/orderDetail',
          query: { orderId: item.orderId }
        })
      }
    },
    btnEvent(item) {
      this.$emit('clickEvent', item)
    }
  }
}
</script>

<style scoped lang="scss">
  .record-content-item {
    .item-list {
      display: flex;
      align-items: center;
      padding: 15px 15px 0;

      .item-left {
        padding-right: 15px;
        .left-image {
          width: 45px;
          height: 45px;
        }
      }

      .item-right {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 8px;
        border-bottom: 1px solid #e6e6e6;

        .item-left-info {
          text-align: left;

          .title {
            font-size: 17px;
            color: #333;
          }

          .order-tabs {
            margin-top: 10px;
            font-size: 12px;
            color: #333;
          }
          .order-no-tabs {
            margin-top: 20px;
          }

          .data {
            margin-top: 12px;
            font-size: 12px;
            color: #999999;

            .list-name {
              font-size: 14px;
              padding: 2px 2px 2px 2px;
              border-radius: 2px;
              background: rgba(204, 204, 204, 0.2);
              margin-right: 5px;
              line-height: 25px;
            }
          }
        }

        .value {
          margin-right: 10px;
          font-size: 20px;
          color: #333333;

          .user-unbind {
            .van-button--danger {
              color: #fff !important;
              background-color: #0077ff;
              border: 0.026667rem solid #0077ff;
            }
            .van-button {
              height: 25px;
            }
          }
        }
      }
    }
    .item-cell-box {
      margin-bottom: 10px;
      background-color: #ffffff;
      padding: 15px;

      .cell-header {
        display: flex;
        padding: 0 2px 10px;
        border-bottom: 1px solid #e6e6e6;
        justify-content: space-between;

        .van-icon {
          color: #ababab;
        }
      }

      .bottom_message {
        display: flex;
        padding-top: 12px;
        justify-content: space-around;

        .message {
          flex: 1;
          .title {
            color: #999999;
            font-size: 11px;
          }

          .subtitle {
            margin-top: 8px;
            color: #333333;
            font-size: 13px;
          }
        }
      }
    }
  }
</style>
