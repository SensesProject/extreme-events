<template>
  <div class="vis-slope">
    <div class="plots" v-if="plots">
      <ChartSlope :width="chartWidth" :height="chartHeight"
      :indicator="indicator"
      :warming-level="warmingLevel"
      :reference="reference"
      :dimension="dimension"
      :label-left="labelLeft" :label-right="labelRight"
      :colorize-by="colorizeBy"
      :all-labels="allLabels"/>
    </div>
  </div>
</template>

<script>
import ChartSlope from '@/components/ChartSlope.vue'
import raw from '@/assets/data/countries.json'
export default {
  name: 'vis-slope',
  components: { ChartSlope },
  props: {
    width: {
      default: 768,
      type: Number
    },
    height: {
      default: 768,
      type: Number
    },
    step: {
      default: 0,
      type: Number
    },
    warmingLevel: Number,
    indicator: String,
    reference: String,
    dimension: String,
    allLabels: Boolean,
    labelLeft: {
      type: Array,
      default () { return ['USA', 'CAN', 'North America'] }
    },
    labelRight: {
      type: Array,
      default () { return ['South Asia', 'CHE'] }
    },
    colorizeBy: {
      type: String,
      default: 'region'
    }
  },
  data () {
    return {
      indicators: ['crop-failure', 'river-flood', 'tropical-cyclone', 'wildfire', 'drought', 'heatwave'],
      countries: Object.keys(raw).filter(c => c !== 'world'),
      warmingLevels: [0]
    }
  },
  computed: {
    chartWidth () {
      const { width } = this
      return Math.min(width - 16, 1920)
    },
    chartHeight () {
      const { height } = this
      // const spacing = 32
      return height // - spacing * 3.5
    },
    plots () {
      const { indicators, chartWidth, chartHeight } = this
      return indicators.filter((i, ii) => ii === indicators.length - 1).map(i => {
        return {
          width: chartWidth,
          height: chartHeight,
          data: raw.world[i],
          region: null,
          indicator: i.replace(/-/g, ' ')
        }
      })
    }
  },
  watch: {
    step: {
      handler (step) {
        switch (step) {
          case 0:
            this.warmingLevels = [0]
            break
          case 1:
            this.warmingLevels = [0, 1]
            break
          case 2:
            this.warmingLevels = [0, 1, 1.5]
            break
          case 3:
            this.warmingLevels = [0, 1, 1.5, 2]
            break
        }
      },
      immediate: true
    }
  }
}
</script>

<style scoped lang="scss">
@import "library/src/style/global.scss";
.vis-slope {
  display: flex;
  flex-direction: column;
  align-items: center;
  // padding: $spacing / 2 0;

  section {
    width: 100vw;
    max-width: calc(768px + #{$spacing});
    padding: 0 $spacing / 2 0;
    text-align: center;

    h1 {
      margin-bottom: $spacing / 2;
    }
  }

  .plots {
    pointer-events: none;
    width: 1200px;
    max-width: 100vw;
    display: flex;
    justify-content: center;
  }

  svg {
    pointer-events: none;
    #level-0 {
      .start {
        stop-color: $color-light-gray;
      }
      .stop {
        stop-color: $color-blue;
      }
    }
    #level-1 {
      .start {
        stop-color: $color-blue;
      }
      .stop {
        stop-color: $color-yellow;
      }
    }
    #level-1-5 {
      .start {
        stop-color: $color-yellow;
      }
      .stop {
        stop-color: $color-orange;
      }
    }
    #level-2 {
      .start {
        stop-color: $color-orange;
      }
      .stop {
        stop-color: $color-red;
      }
    }
  }
}
</style>
