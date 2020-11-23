<template>
  <ChartDumbbell ref="chart" v-bind="chart" />
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
    },
    indicators: {
      default: null,
      type: Array
    }
  },
  data () {
    return { }
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
      const { step, categories, indicators } = this
      let category = 'heatwave'
      let warmingLevelLabels = [2]
      let warmingLevels = [0, 1, 1.5, 2]
      let ticks = null
      let domain
      let level = null
      let spread = false
      let hideData = false
      let annotations = []

      switch (Math.floor(step)) {
        case 0:
          hideData = true
        case 1:
          category = 'heatwave'
          domain = [0, 30]

          switch (step % 1) {
            case 0.0: {
              warmingLevels = [0]
              break
            }
            case 0.1: {
              warmingLevels = [0, 1]
              break
            }
            case 0.2: {
              warmingLevels = [0, 1, 1.5, 2]
              break
            }
            case 0.3: {
              warmingLevels = [0, 1, 1.5, 2]
              level = 1.5
              break
            }
            case 0.4: {
              spread = true
              warmingLevels = [0, 1, 1.5, 2]
              level = 2
              break
            }
            case 0.5: {
              spread = true
              warmingLevels = [0, 1, 1.5, 2, 3]
              level = 3
              break
            }
          }

          break
        case 2:
          domain = [0, 15]
          break
        case 3:
          domain = [0, 4]
          break
        case 4:
          domain = [0, 8]
          break
        case 5:
          domain = [0, 1]
          break
        case 6:
          domain = [0, 3]
          break
        //   spread = true
        //   annotations = [{
        //     col: 'land',
        //     warming: 2,
        //     cm: 'GFDL-ESM2M',
        //     im: 5,
        //     label: 'Impact Model',
        //     align: {
        //       top: true,
        //       left: false
        //     }
        //   }, {
        //     col: 'land',
        //     warming: 2,
        //     cm: 'MIROC5',
        //     im: null,
        //     label: 'Impact Model Median',
        //     arrow: true,
        //     align: {
        //       top: false,
        //       left: false
        //     }
        //   }]
        // case 7:
        //   category = indicators[1]
        //   break
        // case 8:
        //   category = indicators[2]
        //   break
        // case 9:
        //   category = indicators[2]
        //   level = 0
        //   spread = true
        //   break
        // case 10:
        //   category = indicators[2]
        //   spread = true
        //   break
        // case 11:
        //   spread = true
        // case 12:
        //   category = indicators[3]
        //   break
        // case 13:
        //   spread = true
        // case 14:
        //   category = indicators[4]
        //   break
        // case 16:
        //   spread = true
        // case 15:
        //   category = indicators[5]
        //   break
      }

      if (this.$refs.chart) {
        this.$refs.chart.setLevel(level)
        this.$refs.chart.setSpread(spread)
      }

      category = indicators[Math.max(Math.floor(step) - 1, 0)]

      return {
        data: categories[category].data,
        category: category.replace(/-/g, ' '),
        domain,
        ticks,
        warmingLevels,
        warmingLevelLabels,
        region: null,
        hideData,
        annotations
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
