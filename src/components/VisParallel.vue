<template>
  <div class="vis-parallel">
    <ChartParallel v-bind="chart" />
  </div>
</template>

<script>
import ChartParallel from '@/components/ChartParallel.vue'

export default {
  name: 'vis-categories',
  components: { ChartParallel },
  props: {
    step: {
      default: 0,
      type: Number
    }
  },
  data () {
    return {
    }
  },
  computed: {
    chart () {
      const { step } = this
      let colorize

      switch (step) {
        case 0:
          colorize = {
            countries: [['NPL', 'yellow'], ['PAK', 'blue']]
          }
          break
        case 1:
          colorize = {
            bottom: [10, 'blue'],
            countries: [['AUS', 'green'], ['QAT', 'neon']]
          }
          break
        case 2:
          colorize = {
            top: [10, 'red']
          }
          break
      }

      return {
        colorize
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "library/src/style/global.scss";

.vis-parallel {
  height: 100%;
  padding-bottom: $spacing / 2;
}
</style>
