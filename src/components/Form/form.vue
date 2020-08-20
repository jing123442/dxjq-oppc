<template>
    <el-form :model="model" :rules="rules" :ref="addCarRef"  :size="size">
        <el-form-item
            v-for="(item, index) in formArr"
            :label="item.label"
            :label-width="item.width"
            :key="index"
        >
            <el-input v-if="item.type === 'input'" v-model="item.value" :disabled="item.disabled" :prop="item.filed" :placeholder="item.placeholder"></el-input>
             <el-date-picker
                v-if="item.type === 'date'"
                v-model="item.field"
                :type="item.type"
                :disabled="item.disabled"
                size="large"
                :placeholder="item.placeholder">
            </el-date-picker>
        </el-form-item>
    </el-form>
</template>
<script>
export default {
  props: {
    model: {
      type: Object,
      default: () => {}
    },
    rules: {
      type: Object,
      default: () => {}
    },
    size: {
      type: String,
      default: ''
    },
    addCarRef: {
      type: String,
      default: ''
    },
    formArr: {
      type: Array,
      default: () => {}
    }
  }
}
</script>
<style lang="sass" scoped>

</style>
