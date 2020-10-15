<template>
  <div class="vis-extreme-events">
    <section class="wide" ref="title">
      <h1 class="serif">Extreme Events</h1>
      <p>
        Climate change makes extreme events more frequent and more intense. Consequently, more and more land area and people are exposed.
      </p>
    </section>
    <svg :width="0" :height="0">
      <defs>
        <linearGradient id="level-0" y1="1" x2="0">
          <stop class="start" offset="0%"/>
          <stop class="stop" offset="100%"/>
        </linearGradient>
        <linearGradient id="level-1" y1="1" x2="0">
          <stop class="start" offset="0%"/>
          <stop class="stop" offset="100%"/>
        </linearGradient>
        <linearGradient id="level-1-5" y1="1" x2="0">
          <stop class="start" offset="0%"/>
          <stop class="stop" offset="100%"/>
        </linearGradient>
        <linearGradient id="level-2" y1="1" x2="0">
          <stop class="start" offset="0%"/>
          <stop class="stop" offset="100%"/>
        </linearGradient>
      </defs>
    </svg>
    <div class="plots" v-if="plots">
      <ChartDumbbell v-for="(plot, i) in plots" v-bind="plot" relative :key="`plot-${i}`" :ticks="ticks" :warming-levels="warmingLevels" :warming-level-labels="warmingLevels"/>
    </div>
    <transition name="fade">
      <div class="key tiny" v-if="showKey">
        <span v-for="(d, i) in [0, 1, 1.5, 2]" :key="`wl-${i}`" class="highlight no-hover warming-level" :class="[colors[i], {fade: i > step}]">
          +{{ d }}°C
        </span>
      </div>
    </transition>
    <transition name="fade">
      <div class="downwards" v-if="step < 0.5">
        <span class="glyph-angle-down"/>
      </div>
    </transition>
  </div>
</template>

<script>
import ChartDumbbell from '@/components/ChartDumbbell.vue'
import raw from '@/assets/data/countries.json'
export default {
  name: 'vis-extreme-events',
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
    showKey () {
      const { step } = this
      return step > 0
    },
    chartWidth () {
      const { width } = this
      return Math.min(width - 16, 500)
    },
    chartHeight () {
      const { height, titleHeight } = this
      const spacing = 32
      return height - titleHeight - spacing * 3
    },
    plots () {
      const { indicators, chartWidth, chartHeight, titleHeight } = this
      if (titleHeight == null) return null
      return indicators.filter((i, ii) => ii === indicators.length - 5).map(i => {
        return {
          width: chartWidth,
          height: chartHeight,
          data: raw.world[i],
          region: null,
          indicator: i.replace(/-/g, ' ')
        }
      })
    },
    ticks () {
      const { step } = this
      // return [
      //   [0, true],
      //   [0.5, step === 0],
      //   [1, step <= 1],
      //   [2, step === 1],
      //   [3, step === 1],
      //   [4, step === 1],
      //   [5, step >= 1],
      //   [10, step >= 2],
      //   [15, step === 3]
      // ]
      // return [
      //   [0, true],
      //   [0.25, true],
      //   [0.5, true],
      //   [0.75, true],
      //   [1, step >= 2],
      //   [1.25, step >= 3]
      // ]
      // return [
      //   [0, true],
      //   [0.1, true],
      //   [0.2, true],
      //   [0.3, step >= 1],
      //   [0.4, step >= 2]
      //   // [0.5, step >= 3]
      // ],
      return [
        [0.5, true],
        [1, true],
        [1.5, true],
        [2, step >= 1],
        [2.5, step >= 2],
        [3, step >= 3]
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
.vis-extreme-events {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: $spacing / 2 0;

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

    .chart-dumbbell {
      padding: $spacing / 2 0 $spacing / 2;
    }
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
      margin: 0 $spacing / 16;
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
