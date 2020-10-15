<template>
  <div class="conclusion max-width">
    <section class="wide" v-html="getText('conclusion')[0]"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'categories',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['getText'])
  }
}
</script>
<style lang="scss" scoped>
@import "library/src/style/global.scss";
.conclusion {

}
</style>
