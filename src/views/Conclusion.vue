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
  ::v-deep {
    ul {
      background: getColor(gray, 90);
      font-size: 0.8em;
      padding: $spacing / 4 $spacing * 0.875;
      border-radius: $border-radius;
      color: getColor(neon, 40);
      margin: $spacing / 2 0 $spacing;
    }
  }
}
</style>
