<template>
  <ChartDumbbell v-bind="chart" />
</template>

<script>
import ChartDumbbell from '@/components/ChartDumbbell.vue'
import raw from '@/assets/data/detail.json'
export default {
  name: 'vis-categories',
  components: { ChartDumbbell },
  props: {
    step: {
      default: 0,
      type: Number
    },
    height: {
      default: 768,
      type: Number
    }
  },
  data () {
    return {
      indicators: ['wildfire', 'tropical-cyclone', 'crop-failure', 'river-flood', 'drought', 'heatwave']
    }
  },
  computed: {
    categories () {
      const { indicators } = this
      return Object.fromEntries(indicators.map((indicator, i) => {
        return [indicator, {
          data: raw.world[indicator]
        }]
      }))
    },
    chart () {
      const { step, categories } = this
      let category = 'crop-failure'
      let warmingLevelLabels = [2]
      let warmingLevels = [0, 1, 1.5, 2]
      let ticks = null
      let domain = null

      switch (step) {
        case 0:
          warmingLevels = [0]
          ticks = [
            [0, true],
            [0.25, true],
            [0.5, true],
            [0.75, true],
            [1, false]
          ]
          // domain = [0, 0.2]
          break
        case 1:
          warmingLevels = [0, 1]
          ticks = [
            [0, true],
            [0.25, true],
            [0.5, true],
            [0.75, true],
            [1, false]
          ]
          break
        case 2:
          warmingLevels = [0, 1, 1.5]
          ticks = [
            [0, true],
            [0.25, true],
            [0.5, true],
            [0.75, true],
            [1, false]
          ]
          break
        case 3:
          ticks = [
            [0, true],
            [0.25, true],
            [0.5, true],
            [0.75, true],
            [1, true]
          ]
          break
        case 4:
          category = 'wildfire'
          break
        case 5:
          category = 'tropical-cyclone'
          break
        case 6:
          category = 'river-flood'
          break
        case 7:
          category = 'drought'
          break
        case 8:
          category = 'heatwave'
          break
      }

      return {
        data: categories[category].data,
        domain,
        ticks,
        warmingLevels,
        warmingLevelLabels,
        region: null
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "library/src/style/global.scss";
.vis-categories {
}
</style>
