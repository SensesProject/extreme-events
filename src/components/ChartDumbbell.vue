<template>
  <div class="chart-dumbbell" v-resize:debounce.initial="onResize">
    <svg width="100%" :height="chartHeight">
      <g :transform="`translate(0 16)`">
        <g class="axis"
          :transform="`translate(${barWidth + axisWidth / 2 + 2} 0)`">
          <transition-group name="fade" tag="g">
            <g v-for="(tick, i) in yTicks" :key="`tick-${i}-${tick.value}`"
              class="tick" :class="{hide: tick.hide}" :style="{transform:`translate(0px, ${tick.y}px)`}">
              <line :x1="-tick.x" :x2="tick.x"/>
              <text :y="tick.textOffset" class="centered">{{tick.value}}%</text>
            </g>
          </transition-group>
        </g>
        <g class="bars">
          <g class="bar" v-for="(b, bi) in bars" :key="`bar-${bi}`" :transform="`translate(${b.x} 0)`">
            <line :x2="barWidth" :transform="`translate(0 ${innerHeight})`"/>
            <VueInterpolate tag="g" :attrs="{ bar: {value: b, duration: 400}}" v-slot="{ attrs, active }">
              <template>
                <template>
                  <g v-for="(g, gi) in attrs.bar.gradients" :key="`gradient-${gi}`">
                    <rect :key="`gradient-inner-${gi}`" v-if="g.opacity !== 0" :width="barWidth" :height="g.height" :y="g.y" :fill="g.fill" :opacity="g.opacity"/>
                  </g>
                </template>
                <g v-for="(s, si) in attrs.bar.stripes" class="stripe" :key="`stripe-${si}`">
                  <g :transform="`translate(0 ${s.y})`">
                    <line :class="s.class" :x2="barWidth" :opacity="s.opacity"/>
                    <text v-if="!active.bar && s.warmingLevel === activeLevel" :class="s.class" y="-3" :x="barWidth / 2">
                      {{s.change}}×
                    </text>
                  </g>
                  <template v-if="s.warmingLevel === highlightLevel">
                    <g v-for="(cm, cmi) in s.cm" :key="`stripe-${si}-${cmi}`">
                      <g v-for="(im, imi) in cm" :key="`stripe-${si}-${cmi}-${imi}`" :transform="`translate(0 ${im})`">
                        <!-- <line :class="s.class" :x1="barWidth / 3 * cmi" :x2="barWidth / 3 * (cmi + 1)" :opacity="s.opacity * 0.5"/> -->
                        <circle r="2" :class="s.class" class="fill"
                          :cx="barWidth / s.cm.length * cmi + (barWidth / s.cm.length - 16) / cm.length * imi + 8" :opacity="s.opacity"/>
                      </g>
                    </g>
                  </template>
                </g>
              </template>
            </VueInterpolate>
          </g>
        </g>
      </g>
    </svg>
    <div class="dimensions tiny">
      <div v-for="(d, i) in dimensions" :key="`dim-${i}`" :style="{width: `${barWidth}px`}">
        <div v-if="d.glyph">
          <span :class="['glyph',`glyph-${d.glyph}`]"/>
        </div>
        <span>{{ d.name }}</span>
      </div>
    </div>
    <div class="key tiny">
      <span v-for="(d, i) in allLevels" :key="`wl-${i}`"
        class="highlight warming-level"
        :class="[colors[i], { hide: warmingLevels.indexOf(d) === -1}]"
        @mouseover="highlightLevel = d"
        @mouseout="highlightLevel = null"
        @mouseleave="highlightLevel = null">
        +{{ d }}°C
      </span>
    </div>
  </div>
</template>

<script>
// import raw from '@/assets/data/countries.json'
import VueInterpolate from './Interpolate'
import { scaleLinear } from 'd3-scale'
import { format } from 'd3-format'
import resize from 'vue-resize-directive'
export default {
  name: 'chart-dumbbell',
  directives: {
    resize
  },
  components: {
    VueInterpolate
  },
  props: {
    data: {
      type: Object,
      default: null
    },
    warmingLevels: {
      type: Array,
      default () {
        return [0, 1, 1.5, 2]
      }
    },
    domain: {
      type: Array,
      default: null
    },
    ticks: {
      type: Array,
      default: null
    },
    dimensions: {
      type: Array,
      default () {
        return [{
          key: 'land',
          name: 'land area affected'
        }, {
          key: 'population',
          name: 'population exposed'
        }]
      }
    }
  },
  data () {
    return {
      axisWidth: 36,
      width: 200,
      height: 200,
      colors: ['blue', 'yellow', 'orange', 'red'],
      highlightLevel: null,
      allLevels: [0, 1, 1.5, 2]
    }
  },
  computed: {
    chartHeight () {
      const { height } = this
      return height - 64
    },
    innerHeight () {
      const { chartHeight } = this
      return chartHeight - 16
    },
    maxLevel () {
      return Math.max(...this.warmingLevels)
    },
    activeLevel () {
      return this.highlightLevel != null ? this.highlightLevel : this.maxLevel
    },
    yScale () {
      const { data, warmingLevels, dimensions, innerHeight, ticks } = this
      let { domain } = this
      const range = [innerHeight, 0]
      if (ticks != null) {
        const values = ticks.filter(t => t[1]).map(t => t[0])
        return scaleLinear().domain([Math.min(...values, 0), Math.max(...values)]).range(range)
      }
      if (domain == null) {
        const values = dimensions.map(d => warmingLevels.map(l => {
          return data[d.key][l].median
        })).flat()
        domain = [Math.min(...values, 0), Math.max(...values)]
      }
      return scaleLinear().domain(domain).range(range).nice(3)
    },
    yTicks () {
      const { yScale, axisWidth, ticks } = this
      if (ticks != null) {
        return ticks.map(t => {
          return {
            value: t[0],
            y: yScale(t[0]),
            textOffset: -3,
            x: axisWidth / 2,
            hide: !t[1]
          }
        })
      }
      return yScale.ticks(3).map((value) => {
        return {
          value,
          y: yScale(value),
          textOffset: -3,
          x: axisWidth / 2
        }
      })
    },
    barWidth () {
      const { axisWidth, dimensions, width } = this
      return (width - axisWidth - 4) / dimensions.length
    },
    bars () {
      const { data, dimensions, warmingLevels, allLevels, barWidth, axisWidth, yScale, innerHeight } = this
      return dimensions.map((d, di) => {
        return {
          x: (barWidth + axisWidth + 4) * di,
          stripes: allLevels.map((l) => {
            const value = data[d.key][l].median
            const change = value / data[d.key][0].median
            const y = yScale(value)
            return {
              class: [`level-${`${l}`.replace(/\./, '-')}`],
              value: format(',.2~r')(value),
              change: format(',.1f')(change),
              y,
              cm: Object.keys(data[d.key][l].cm).map(cm => data[d.key][l].cm[cm].im.map(im => yScale(im))),
              warmingLevel: l,
              opacity: warmingLevels.indexOf(l) === -1 ? 0 : 1
              // transform: `translate(0px, ${y}px)`
            }
          }).reverse(),
          gradients: allLevels.map((l, li) => {
            const start = li > 0 ? yScale(data[d.key][allLevels[li - 1]].median) : innerHeight
            const end = yScale(data[d.key][l].median)
            return {
              fill: `url(#level-${`${l}`.replace(/\./, '-')})`,
              y: end,
              height: start - end,
              opacity: warmingLevels.indexOf(l) === -1 ? 0 : 0.2
            }
          })
        }
      })
    }
  },
  methods: {
    onResize (el) {
      this.width = el.getBoundingClientRect().width
      this.height = el.getBoundingClientRect().height
    }
  }
  // watch: {
  //   maxLevel (l) {
  //     this.highlightLevel = l
  //   }
  // }
}
</script>

<style scoped lang="scss">
@import "library/src/style/global.scss";
$transition: $transition * 2;
.chart-dumbbell {
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

  svg {
    overflow: visible;
    .axis {
      line {
        stroke: getColor(gray, 70);
      }
      text {
        fill: $color-deep-gray;
        &.centered {
          text-anchor: middle;
        }
      }
      .tick {
        transition: opacity $transition $transition, transform $transition;
        &.fade-leave-active {
          transition: opacity $transition, transform $transition;
        }
        &.fade-enter, &.fade-leave-to {
          opacity: 0;
        }
        &.hide {
          opacity: 0;
          pointer-events: 0;
        }
      }
    }
    .bars {
      .stripe {
        // transition: transform $transition, opacity $transition;
        // &.fade-enter, &.fade-leave-to {
        //   opacity: 0;
        //   transform: scale(1) !important;
        // }
      }
      line {
        stroke: getColor(gray, 70);
        &.level-0 {
          stroke: $color-blue;
        }
        &.level-1 {
          stroke: $color-yellow;
        }
        &.level-1-5 {
          stroke: $color-orange;
        }
        &.level-2 {
          stroke: $color-red;
        }
      }
      circle {
        &.level-0 {
          fill: getColor(blue, 50);
        }
        &.level-1 {
          fill: getColor(yellow, 50);
        }
        &.level-1-5 {
          fill: getColor(orange, 50);
        }
        &.level-2 {
          fill: getColor(red, 50);
        }
      }
      text {
        text-anchor: middle;
        &.level-0 {
          fill: getColor(blue, 40);
        }
        &.level-1 {
          fill: getColor(yellow, 40);
        }
        &.level-1-5 {
          fill: getColor(orange, 40);
        }
        &.level-2 {
          fill: getColor(red, 40);
        }
        &.left {
          text-anchor: start;
        }
        &.right {
          text-anchor: end;
        }
      }
    }
  }

  .dimensions {
    display: flex;
    justify-content: space-between;
    width: 100%;
    div {
      color: $color-deep-gray;
      // text-align: center;
      padding-top: $spacing / 8;
      // hyphens: auto;

      .glyph {
        color: $color-neon;
        font-size: 3em;
      }
    }
  }
  .key {
    align-self: flex-start;
    margin-top: $spacing / 4;

    .warming-level {
      transition: opacity 0.4s;
      &.hide {
        opacity: 0.3;
        pointer-events: none;
      }
      + .warming-level {
        margin: 0 0 0 $spacing / 8;
      }
    }
  }
}
</style>
