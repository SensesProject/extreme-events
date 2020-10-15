<template>
  <div class="vis-events-single">
    <section class="wide" ref="title">
      <p>
        Above we looked at exposure to at least one of those extreme events. There is however a high variety in intensity and severity across them.
      </p>
    </section>
    <div class="plots" v-if="plots">
      <ChartDumbbell v-for="(plot, i) in plots" v-bind="plot" :domain="[0, 15]" :key="`plot-${i}`" warming-level-labels="[2]" :dimensions="dimensions" top-labels/>
    </div>
    <!-- <strong class="tiny">Population Exposed</strong>
    <div class="plots" v-if="plots">
      <ChartDumbbell v-for="(plot, i) in plots" v-bind="plot" :domain="domain" :key="`plot-${i}`"/>
    </div> -->
    <div class="key tiny">
      <span v-for="(d, i) in [0, 1, 1.5, 2]" :key="`wl-${i}`" class="highlight no-hover warming-level" :class="[colors[i]]">
        +{{ d }}°C
      </span>
    </div>
  </div>
</template>

<script>
import ChartDumbbell from '@/components/ChartDumbbell.vue'
import raw from '@/assets/data/countries.json'
export default {
  name: 'vis-events-single',
  components: { ChartDumbbell },
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
    }
  },
  data () {
    return {
      indicators: ['crop-failure', 'river-flood', 'tropical-cyclone', 'wildfire', 'drought', 'heatwave'],
      countries: Object.keys(raw).filter(c => c !== 'world'),
      warmingLevels: [0],
      titleHeight: null,
      colors: ['blue', 'yellow', 'orange', 'red']
    }
  },
  computed: {
    dimensions () {
      return [{
        glyph: 'crop-failure', key: 'crop-failure'
      }, {
        glyph: 'floods', key: 'river-flood'
      }, {
        glyph: 'hurricanes', key: 'tropical-cyclone'
      }, {
        glyph: 'wildfires', key: 'wildfire'
      }, {
        glyph: 'droughts', key: 'drought'
      }, {
        glyph: 'floods', key: 'heatwave'
      }].map(d => {
        return {
          glyph: d.glyph,
          key: d.key,
          name: d.key.replace(/-/g, ' ')
        }
      })
    },
    chartWidth () {
      const { width } = this
      return Math.min(width - 32, 768)
    },
    chartHeight () {
      const { height, titleHeight } = this
      const spacing = 32
      return height - titleHeight - spacing * 3 - 64
    },
    plots () {
      const { indicators, chartWidth, chartHeight, titleHeight, step } = this
      if (titleHeight == null) return null
      const dimension = ['land', 'population'][step]
      return [{
        width: chartWidth,
        height: chartHeight,
        data: Object.fromEntries(indicators.map(i => [i, raw.world[i][dimension]])),
        region: null,
        centeredAxis: false
        // labelBottom: i.replace(/-/g, ' ')

      }]
    },
    domain () {
      const { plots, indicators } = this

      const values = plots.map(p => indicators.map(i => p.data[i][2])).flat()
      return [Math.min(...values), Math.max(...values)]
    },
    ticks () {
      const { step } = this
      return [
        [0, true],
        [0.5, step === 0],
        [1, step <= 1],
        [2, step === 1],
        [3, step === 1],
        [4, step === 1],
        [5, step >= 1],
        [10, step >= 2],
        [15, step === 3]
      ]
    }
  },
  watch: {
    width: {
      handler (width) {
        this.titleHeight = this.$refs.title.getBoundingClientRect().height
      },
      immediate: false
    },
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
.vis-events-single {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: $spacing / 2 $spacing / 2;
  width: 100vw;
  max-width: calc(768px + #{$spacing});

  section {
    width: 100%;
    max-width: calc(768px + #{$spacing});
    align-self: flex-start;
    justify-self: flex-start;
    // text-align: center;

    h1 {
      margin-bottom: $spacing / 2;
    }
  }

  .plots {
    // pointer-events: none;
    width: 100%;
    max-width: calc(768px + #{$spacing});
    display: flex;
    // justify-content: center;
    justify-content: space-between;
  }

  .downwards {
    position: absolute;
    bottom: 0;
    font-size: 2em;
    transition: opacity $transition, transform $transition;
    &.fade-enter {
      opacity: 0;
    }
    &.fade-leave-to {
      opacity: 0;
      transform: translate(0, -#{$spacing});
    }
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
  .key {
    margin-top: -$spacing / 4;
    .warming-level {
      margin-left: $spacing / 8;
      transition: opacity $transition;

      &.fade {
        opacity: 0.2
      }

    }

    &.fade-leave-active {
      transition: opacity $transition;
    }
    &.fade-enter, &.fade-leave-to {
      opacity: 0;
    }
  }
}
</style>
