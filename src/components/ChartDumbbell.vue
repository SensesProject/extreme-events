<template>
  <div class="vis-dumbbell" :style="{width: `${width}px`}">
    <div v-if="topLabels" class="dimensions tiny" :style="{paddingLeft: `${centeredAxis ? 0 : axisWidth + 2}px`}">
      <div v-for="(d, i) in dimensions" :key="`dim-${i}`" :style="{width: `${barWidth}px`}">
        <div v-if="d.glyph">
          <span :class="['glyph',`glyph-${d.glyph}`]"/>
        </div>
        <span>{{ d.name }}</span>
      </div>
    </div>
    <svg :width="width" :height="height">
      <g :transform="`translate(0 16)`">
        <g class="axis"
          :transform="`translate(${
            centeredAxis ? barWidth + axisWidth / 2 + 2 : axisWidth / 2
          } 0)`">
          <transition-group name="fade" tag="g">
            <g v-for="(tick, i) in yTicks" :key="`tick-${i}-${tick.value}`"
              class="tick" :class="{hide: tick.hide}" :style="{transform:`translate(0px, ${tick.y}px)`}">
              <line :x1="-tick.x" :x2="tick.x"/>
              <text :y="tick.textOffset" :class="{centered: centeredAxis}" :x="centeredAxis ? 0 : -tick.x">{{tick.value}}%</text>
            </g>
          </transition-group>
        </g>
        <g class="bars">
          <g class="bar" v-for="(b, bi) in bars" :key="`bar-${bi}`" :transform="`translate(${b.x} 0)`">
            <line :x2="barWidth" :transform="`translate(0 ${innerHeight})`"/>
            <transition-group name="fade" tag="g">
              <rect v-for="(g, gi) in b.gradients" :key="`gradient-${gi}`" :width="barWidth" :height="1" :fill="g.fill" :style="{transform: `translate(0, ${g.y}px) scaleY(${g.height})`}"/>
            </transition-group>
            <transition-group name="fade" tag="g">
              <g v-for="(s, si) in b.stripes" class="stripe" :key="`stripe-${si}`" :style="{ transform: s.transform }">
                <line :class="s.class" :x2="barWidth"/>
                <text :class="s.class" v-if="warmingLevelLabels.indexOf(s.warmingLevel) !== -1" y="-3" :x="barWidth / 2">
                  {{s.value}}%
                </text>
              </g>
            </transition-group>
          </g>
        </g>
      </g>
    </svg>
    <div v-if="!topLabels" class="dimensions tiny" :style="{paddingLeft: `${centeredAxis ? 0 : axisWidth + 2}px`}">
      <div v-for="(d, i) in dimensions" :key="`dim-${i}`" :style="{width: `${barWidth}px`}">
        <div v-if="d.glyph">
          <span :class="['glyph',`glyph-${d.glyph}`]"/>
        </div>
        <span>{{ d.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
// import raw from '@/assets/data/countries.json'
import { scaleLinear } from 'd3-scale'
import { format } from 'd3-format'
export default {
  name: 'VisDumbbell',
  props: {
    width: {
      type: Number,
      default: 320
    },
    height: {
      type: Number,
      default: 768
    },
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
    warmingLevelLabels: {
      type: Array,
      default () {
        return []
      }
    },
    domain: {
      type: Array,
      default: null
    },
    indicator: {
      type: String,
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
    },
    centeredAxis: {
      type: Boolean,
      default: true
    },
    topLabels: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      axisWidth: 36
    }
  },
  computed: {
    innerHeight () {
      const { height } = this
      return height - 16
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
          return data[d.key][l]
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
      const { width, axisWidth, dimensions, centeredAxis } = this
      if (centeredAxis) return (width - axisWidth - 4) / dimensions.length
      return (width - axisWidth - 2) / dimensions.length - 2
    },
    bars () {
      const { data, dimensions, warmingLevels, barWidth, axisWidth, yScale, innerHeight, centeredAxis } = this
      return dimensions.map((d, di) => {
        return {
          x: centeredAxis ? (barWidth + axisWidth + 4) * di : (barWidth + 2) * di + axisWidth + 2,
          stripes: warmingLevels.map((l) => {
            const value = data[d.key][l]
            const y = yScale(value)
            if (l === 2) console.log(`translate(0, ${y}px)`)
            return {
              class: [`level-${`${l}`.replace(/\./, '-')}`],
              value: format(',.2~r')(value),
              y,
              warmingLevel: l,
              transform: `translate(0px, ${y}px)`
            }
          }),
          gradients: warmingLevels.map((l, li) => {
            const start = li > 0 ? yScale(data[d.key][warmingLevels[li - 1]]) : innerHeight
            const end = yScale(data[d.key][l])
            return {
              fill: `url(#level-${`${l}`.replace(/\./, '-')})`,
              y: end,
              height: start - end
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "library/src/style/global.scss";
$transition: $transition * 2;
.vis-dumbbell {
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  padding: $spacing / 2 0 $spacing / 2;

  .indicator {
    font-weight: $font-weight-bold;
    color: $color-neon;
  }

  svg {
    .axis {
      line {
        stroke: $color-light-gray;
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
        transition: transform $transition, opacity $transition;
        &.fade-enter, &.fade-leave-to {
          opacity: 0;
          transform: scale(1) !important;
        }
      }
      line {
        stroke: $color-light-gray;
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
      }
      rect {
        opacity: 0.2;
        transition: transform $transition, opacity $transition $transition;
        &.fade-leave-active {
          transition: transform $transition, opacity $transition;
        }
        &.fade-enter, &.fade-leave-to {
          opacity: 0;
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
      text-align: center;
      padding-top: $spacing / 8;

      .glyph {
        color: $color-neon;
        font-size: 3em;
      }
    }
  }
}
</style>
