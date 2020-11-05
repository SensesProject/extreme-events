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
      let domain = null
      let level = null
      let spread = false
      let annotations = []

      switch (step) {
        case 0:
        case 1:
          warmingLevels = [0]
          // ticks = [
          //   [0, true],
          //   [0.25, true],
          //   [0.5, true],
          //   [0.75, true],
          //   [1, false]
          // ]
          // domain = [0, 0.2]
          break
        case 2:
          warmingLevels = [0, 1]
          break
        case 3:
          // warmingLevels = [0, 1, 1.5]

          break
        case 4:
          level = 1.5
          break
        case 5:
          spread = true
          annotations = [{
            col: 'land',
            cm: 'GFDL-ESM2M',
            im: null,
            label: 'GFDL-ESM2M',
            align: {
              top: false,
              left: false
            }
          }, {
            col: 'land',
            cm: 'HadGEM2-ES',
            im: null,
            label: 'HadGEM2-ES',
            align: {
              top: true,
              left: false
            }
          }, {
            col: 'land',
            cm: 'IPSL-CM5A-LR',
            im: null,
            label: 'IPSL-CM5A-LR',
            align: {
              top: true,
              left: false
            }
          }, {
            col: 'land',
            cm: 'MIROC5',
            im: null,
            label: 'MIROC5',
            align: {
              top: false,
              left: false
            }
          }]
          break
        case 6:
          spread = true
          annotations = [{
            col: 'land',
            cm: 'GFDL-ESM2M',
            im: 5,
            label: 'Impact Model',
            align: {
              top: true,
              left: false
            }
          }, {
            col: 'land',
            cm: 'MIROC5',
            im: null,
            label: 'Impact Model Median',
            arrow: true,
            align: {
              top: false,
              left: false
            }
          }]
        case 7:
          category = indicators[1]
          break
        case 8:
          category = indicators[2]
          break
        case 9:
          category = indicators[2]
          level = 0
          spread = true
          break
        case 10:
          category = indicators[2]
          spread = true
          break
        case 11:
          spread = true
        case 12:
          category = indicators[3]
          break
        case 13:
          spread = true
        case 14:
          category = indicators[4]
          break
        case 16:
          spread = true
        case 15:
          category = indicators[5]
          break
      }

      if (this.$refs.chart) {
        this.$refs.chart.setLevel(level)
        this.$refs.chart.setSpread(spread)
      }

      return {
        data: categories[category].data,
        domain,
        ticks,
        warmingLevels,
        warmingLevelLabels,
        region: null,
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
