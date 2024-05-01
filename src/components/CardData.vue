<template>
  <div class="card-wrapper">
    <div :class="['box-wrapper', compare ? (compare === 1 ? 'up' : 'down') : '']">
      <div class="name">{{ name }}</div>
      <div class="value">{{ value || '-' }}<i v-if="isIcon" class="compare"></i><em>{{ unit }}</em><span v-if="isDiff" class="number">{{ avgPrice > 0 ? ('+' + avgPrice) : (avgPrice || '-') }}</span><span v-if="isDiff" class="number">{{ avgPercent > 0 ? ('+' + avgPercent) : (avgPercent || '-') }}%</span></div>
    </div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'CardData',
  props: {
    name: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: ''
    },
    unit: {
      type: String,
      default: ''
    },
    compare: {
      type: Number,
      default: 0
    },
    isIcon: {
      type: Boolean,
      default: true
    },
    isDiff: {
      type: Boolean,
      default: false
    },
    avgPrice: {
      type: Number,
      default: 0
    },
    avgPercent: {
      type: Number,
      default: 0
    }
  }
}
</script>
<style lang="scss" scoped>
.card-wrapper {
  position: relative;
}
.box-wrapper {
  width: 100%;
  height: 80px;
  padding: 14px 24px;
  border-left: 8px solid rgba(52, 113, 255, 1);
  border-radius: 8px;
  background: rgba(230, 238, 255, 1);

  &.up {
    border-left: 8px solid rgba(245, 34, 45, 1);
    background: rgba(255, 241, 240, 1);

    .value {
      color: rgba(245, 34, 45, 1);

      i {
        display: inline-block;
        background: url(~@/assets/images/new/home/up.png) no-repeat;
        background-size: contain;
      }
    }
  }
  &.down {
    border-left: 8px solid rgba(82, 196, 26, 1);
    background: rgba(246, 255, 237, 1);

    .value {
      color: rgba(82, 196, 26, 1);

      i {
        display: inline-block;
        background: url(~@/assets/images/new/home/down.png) no-repeat;
        background-size: contain;
      }
    }
  }

  .name {
    font-size: 14px;
    color: rgba(89, 89, 89, 1);
  }
  .value {
    font-size: 24px;
    color: rgba(38, 38, 38, 1);
    font-weight: bold;

    i {
      display: none;
      width: 12px;
      height: 12px;
    }
    em {
      font-size: 14px;
      font-style: normal;
      font-weight: normal;
      color: rgba(89, 89, 89, 1);
    }
    .number {
      font-size: 14px;
      font-weight: 800;
      margin-left: 5px;
    }
  }
}
</style>
