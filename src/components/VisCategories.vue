<template>
  <ChartDumbbell ref="chart" v-bind="chart" />
</template>

<script>
import ChartDumbbell from '@/components/ChartDumbbell.vue'
import raw from '@/assets/data/world.json'
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
      let warmingLevelLabels = []
      let warmingLevels
      let ticks = null
      let domain
      let views
      let view = 'median'
      let annotations = []

      switch (Math.floor(step)) {
        case 0:
          warmingLevels = []
          category = 'heatwave'
          domain = [0, 30]
          views = {
            median: { label: 'Median', hide: true },
            climate: { label: 'Climate Models', hide: true },
            impact: { label: 'Impact Models', hide: true }
          }
          break
        case 1:
          category = 'heatwave'
          domain = [0, 30]
          views = {
            median: { label: 'Median' },
            climate: { label: 'Climate Models', hide: true },
            impact: { label: 'Impact Models', hide: true }
          }
          switch ((step * 10 % 10) / 10) {
            case 0.0: {
              warmingLevels = [0]
              warmingLevelLabels = [0, 1, 2, 3, 4]
              break
            }
            case 0.1: {
              warmingLevels = [0, 1]
              warmingLevelLabels = [0, 1, 2, 3, 4]
              break
            }
            case 0.2: {
              warmingLevels = [0, 1, 1.5, 2]
              warmingLevelLabels = [0, 1, 2, 3, 4]
              break
            }
            case 0.3: {
              view = 'climate'
              warmingLevels = [0, 1, 1.5, 2]
              views.climate.hide = false
              break
            }
            case 0.4: {
              view = 'climate'
              warmingLevels = [0, 1, 1.5, 2, 3]
              views.climate.hide = false
              break
            }
          }

          break
        case 2:
          domain = [0, 15]
          switch ((step * 10 % 10) / 10) {
            case 0.1: {
              view = 'climate'
              break
            }
            case 0.2: {
              view = 'impact'
              break
            }
          }
          break
        case 3:
          domain = [0, 4]
          switch ((step * 10 % 10) / 10) {
            case 0.1: {
              view = 'climate'
              break
            }
            case 0.2: {
              view = 'impact'
              break
            }
          }
          break
        case 4:
          domain = [0, 8]
          switch ((step * 10 % 10) / 10) {
            case 0.1: {
              view = 'climate'
              break
            }
            case 0.2: {
              view = 'impact'
              break
            }
          }
          break
        case 5:
          domain = [0, 1]
          switch ((step * 10 % 10) / 10) {
            case 0.1: {
              view = 'climate'
              break
            }
            case 0.2: {
              view = 'impact'
              break
            }
          }
          break
        case 6:
          domain = [0, 3]
          switch ((step * 10 % 10) / 10) {
            case 0.1: {
              view = 'climate'
              break
            }
            case 0.2: {
              view = 'impact'
              break
            }
          }
          views = {
            median: { label: 'Median' },
            climate: { label: 'Climate Models' },
            impact: { label: 'Impact Model Runs' }
          }
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
        if (view != null) {
          this.$refs.chart.setOption('view', view, true)
        }
        this.$refs.chart.setOption('levels', warmingLevelLabels, true)
        this.$refs.chart.setOption('annotations', null)
      }

      category = indicators[Math.max(Math.floor(step) - 1, 0)]

      return {
        data: categories[category].data,
        category: category.replace(/-/g, ' '),
        domain,
        ticks,
        warmingLevels,
        region: null,
        annotations,
        views
      }
    }
  },
  mounted () {
    // Dumbbell Triggers
    [...document.querySelectorAll('.dumbbell-trigger')].forEach(el => {
      el.addEventListener('mouseover', () => {
        const trigger = el.getAttribute('data-trigger')
        const level = this.parseTrigger(trigger, 'L')
        this.$refs.chart.setOption('levels', level)
        const climate = this.parseTrigger(trigger, 'C')
        this.$refs.chart.setOption('climate', climate)
        const impact = this.parseTrigger(trigger, 'I')
        this.$refs.chart.setOption('impact', impact)
        const subject = this.parseTrigger(trigger, 'S')
        this.$refs.chart.setOption('subject', subject)
        if (impact) this.$refs.chart.setOption('view', 'impact', true)
        else if (climate) this.$refs.chart.setOption('view', 'climate', true)
      })
      el.addEventListener('mouseleave', () => {
        this.$refs.chart.setOption('levels', null)
        this.$refs.chart.setOption('climate', null)
        this.$refs.chart.setOption('impact', null)
        this.$refs.chart.setOption('subject', null)
        // this.$refs.chart.setOption('view', null)
      })
    })
  },
  beforeDestroy () {
    // Dumbbell Triggers
    [...document.querySelectorAll('.dumbbell-trigger')].forEach(el => {
      const clone = el.cloneNode(true)
      el.parentNode.replaceChild(clone, el)
    })
  },
  methods: {
    parseTrigger (trigger, key) {
      const exp = new RegExp(`${key}([^A-z]+)`)

      if (trigger.match(exp) == null) return null
      return trigger.match(exp)[1].split(',').map(v => +v)
    }
  }
}
</script>

<style scoped lang="scss">
@import "library/src/style/global.scss";
.vis-categories {
}
</style>
