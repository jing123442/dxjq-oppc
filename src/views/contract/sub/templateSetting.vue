<template>
  <div class="template-main">
    <iframe ref="iframe" width="100%" height="100%" :src="esignUrl" frameborder="0" scrolling="auto"></iframe>
  </div>
</template>
<script>
import { initVueDataOptions } from '@/utils/tools'
import { mapGetters } from 'vuex'

export default {
  name: 'msgCenter',
  data() {
    return initVueDataOptions(this, {
      esignUrl: this.$route.query.url || ''
    })
  },
  computed: {
    ...mapGetters({
      mode_list: 'message_mode_list',
      page_status: 'message_page_status',
      page_column: 'message_column',
      select_list: 'message_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  mounted: function () {
    console.log(this.$refs.iframe)
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
  .template-main {
    height: 100%;
    iframe {
      border-radius: 8px;
    }
  }
</style>
