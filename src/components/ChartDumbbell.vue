<template>
  <div class="chart-dumbbell" v-resize:debounce.initial="onResize">
    <svg width="100%" :height="dims.svgHeight">
      <g class="title">
        <text :y="dims.textAnchorTop">Global land area and population exposed to {{category}}</text>
      </g>
      <g class="chart" :transform="`translate(0 ${dims.titleHeight})`">
        <g class="axis" :transform="`translate(${dims.chartWidth / 2} 0)`">
          <transition-group name="fade" tag="g">
            <g v-for="(tick, i) in yTicks" :key="i"
              class="tick" :transform="`translate(0 ${tick.y})`">
              <!-- <line v-if="i === 0" :x1="-dims.chartWidth / 2" :x2="dims.chartWidth / 2"/> -->
              <line :x1="-dims.axisInnerWidth / 2" :x2="dims.axisInnerWidth / 2"/>
              <text :y="dims.textAnchorBottom">{{tick.value}}%</text>
            </g>
          </transition-group>
        </g>
        <g class="subject" v-for="(subject, i) in subjects" :key="i">
          <g class="gradient" v-bind="filters.gradient">
            <rect v-for="(level, i) in subject.levels" :key="i" :transform="level.transform"
              :height="level.gradient.height" :width="dims.subjectWidth" :fill="level.gradient.fill"/>
          </g>
          <g v-bind="filters.sep" class="sep" :transform="`translate(${i * (dims.subjectWidth + dims.axisWidth)} 0)`">
            <line stroke-width="4" v-for="i in 5" :key="i" :transform="`translate(${(i - 1) * dims.climateWidth} 0)`" :y2="dims.chartHeight"/>
          </g>
          <g class="level" v-for="(level, i) in subject.levels" :key="i">
            <g class="median" :transform="level.transform">
              <line v-bind="filters.median" :class="level.color" :x2="dims.subjectWidth"/>
              <!-- <text :class="level.color" text-anchor="middle" :x="dims.subjectWidth / 2" :y="dims.textAnchorBottom">{{level.val}}%</text> -->
            </g>
            <path v-bind="filters.climateLine" :class="level.color" :d="level.line"/>
            <g class="climate" v-for="(climate, i) in level.climates.filter(c => c)" :key="i">
              <g :opacity="getOption('annotations') === null || getOption('annotations').find(a => a.label[0] === climate.label[0]) ? 1 : 0.2">
                <g class="gradient" v-if="climate.gradient" v-bind="filters.climateGradient">
                  <line :transform="climate.transform" :y2="climate.gradient.height"
                    :x1="dims.climateInnerWidth / 2" :x2="dims.climateInnerWidth / 2 + 0.001" :stroke="climate.gradient.fill"/>
                </g>
                <g :transform="climate.transform">
                  <line v-bind="filters.climate" :class="level.color" :x2="dims.climateInnerWidth"/>
                </g>
                <g v-if="getOption('view') === 'climate' && climate.highest" class="interaction-layer">
                  <rect :x="climate.x" :width="dims.climateInnerWidth" :height="dims.chartHeight"
                    @mouseover="setOption('annotations', [{x: climate.x + dims.climateInnerWidth / 2, y: climate.y, label: climate.label, type: 'model'}])"
                    @mouseleave="setOption('annotations', null)"/>
                </g>
                <path v-bind="filters.impactLine" :class="level.color" :d="climate.line"/>
              </g>
              <g class="impact" v-for="(impact, i) in climate.impacts.filter(c => c)" :key="i"
                :opacity="getOption('annotations') === null || getOption('annotations').find(a => a.label[0] === impact.label[0]) ? 1 : 0.2">
                <g class="gradient" v-if="category !== 'tropical cyclone' && impact.gradient" v-bind="filters.impactGradient">
                  <line :transform="impact.transform" :y2="impact.gradient.height"
                    :x1="impact.gradient.x" :x2="impact.gradient.x + 0.001" :stroke="impact.gradient.fill"/>
                </g>
                <g :transform="impact.transform" v-bind="filters.impact">
                  <line :class="level.color" :x2="impact.width"/>
                </g>
                <g v-if="getOption('view') === 'impact' && impact.highest && category !== 'tropical cyclone'" class="interaction-layer">
                  <rect :x="impact.x" :width="impact.width" :height="dims.chartHeight"
                    @mouseover="setOption('annotations', [{x: impact.x + impact.width / 2, y: impact.y, label: impact.label, type: 'model'}])"
                    @mouseleave="setOption('annotations', null)"/>
                </g>
              </g>
            </g>
          </g>
        </g>
        <g class="annotations" v-if="getOption('annotations')">
          <ChartAnnotation v-for="(a, i) in getOption('annotations').filter(({type}) => type === 'model')" :key="i"
            v-bind="a" arrow :offset="3" :left="a.x > dims.subjectWidth"/>
        </g>
      </g>
      <g class="footer" :transform="`translate(0 ${dims.chartHeight + dims.titleHeight + dims.textAnchorTop})`">
        <text>land area</text>
        <text :x="dims.subjectWidth + dims.axisWidth">population</text>
      </g>
    </svg>
    <div class="key tiny">
      <span>
        <span v-for="(d, i) in allLevels" :key="`wl-${i}`"
          class="highlight"
          :class="[colors[d], { hide: warmingLevels.indexOf(d) === -1}]"
          @mouseover="setOption('view', view)"
          @mouseleave="setOption('view', null)">
          +{{ d }}°C
        </span>
      </span>
      <!-- <span class="button warming-level" @click="showSpread = !showSpread">
        Toggle View
      </span> -->
    </div>
    <div class="view tiny">
      <span>
        <span v-for="(view, i) in Object.keys(views)" :key="i"
          :class="getOption('view', true) === view ? 'button' : 'highlight'"
          @click="setOption('view', view, true)"
          @mouseover="setOption('view', view)"
          @mouseleave="setOption('view', null)">
          {{ views[view] }}
        </span>
      </span>
    </div>
  </div>
</template>

<script>
// import raw from '@/assets/data/countries.json'
import ChartAnnotation from './ChartAnnotation.vue'
// import VueInterpolate from './Interpolate'
import { scaleLinear } from 'd3-scale'
import { format as d3Format } from 'd3-format'
import resize from 'vue-resize-directive'
export default {
  name: 'chart-dumbbell',
  directives: {
    resize
  },
  components: {
    // VueInterpolate,
    ChartAnnotation
  },
  props: {
    category: String,
    hideData: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: null
    },
    warmingLevels: {
      type: Array,
      default () {
        return [0, 1, 1.5, 2, 3]
      }
    },
    domain: {
      type: Array,
      default () {
        return [0, 30]
      }
    },
    ticks: {
      type: Array,
      default () {
        return [0, 10, 20, 30]
      }
    },
    dimensions: {
      type: Array,
      default () {
        return [{
          key: 'land',
          name: 'land area'
        }, {
          key: 'population',
          name: 'population'
        }]
      }
    },
    annotations: {
      type: Array,
      default () { return [] }
    }
  },
  data () {
    return {
      debug: true,
      width: 200,
      height: 200,
      colors: { 0: 'blue', 1: 'yellow', 1.5: 'orange', 2: 'red', 3: 'purple' },
      gradients: { 0: 'url(#level-0)', 1: 'url(#level-1)', 1.5: 'url(#level-1-5)', 2: 'url(#level-2)', 3: 'url(#level-3)' },
      views: { median: 'Median', climate: 'Climate Models', impact: 'Impact Models' },
      highlightLevel: null,
      allLevels: [0, 1, 1.5, 2, 3],
      oldTicks: [],
      showSpread: false,
      annotation: null,
      options: {
        view: {
          fix: 'median',
          temp: null
        },
        annotations: {
          fix: null,
          temp: null
        }
      }
    }
  },
  computed: {
    dims () {
      const { height, width } = this

      const subjects = 2
      const models = 4

      const textAnchorTop = 16
      const textAnchorBottom = -4
      const lineHeight = textAnchorTop - textAnchorBottom
      const defMargin = 2
      const svgHeight = height - 64
      const titleHeight = lineHeight * 2.5
      const footerHeight = lineHeight
      const chartHeight = svgHeight - titleHeight - footerHeight
      const chartWidth = width
      const axisWidth = 40
      const axisInnerWidth = axisWidth - defMargin * 2
      const subjectWidth = (chartWidth - axisWidth) / subjects
      const climateWidth = subjectWidth / models
      const climateInnerWidth = climateWidth - defMargin * 2
      return {
        svgHeight,
        titleHeight,
        textAnchorTop,
        textAnchorBottom,
        lineHeight,
        chartHeight,
        chartWidth,
        axisWidth,
        defMargin,
        axisInnerWidth,
        subjectWidth,
        climateWidth,
        climateInnerWidth
      }
    },
    maxLevel () {
      return Math.max(...this.warmingLevels.filter(l => l <= 2))
    },
    activeLevel () {
      return this.highlightLevel != null ? this.highlightLevel : this.maxLevel
    },
    format () {
      return d3Format(',.2~r')
    },
    yScale () {
      const { dims, domain } = this
      return scaleLinear().domain(domain).range([dims.chartHeight, 0]).nice(3)
    },
    yTicks () {
      const { yScale, dims } = this
      return yScale.ticks(3).map((value) => {
        return {
          value,
          y: yScale(value),
          textOffset: -3,
          x: dims.axisWidth / 2
        }
      })
    },
    subjects () {
      const { data, allLevels, yScale, format, dims, colors, gradients } = this
      const subjects = ['land', 'population'].map((subject) => {
        const subjectX = subject === 'land' ? 0 : (dims.subjectWidth + dims.axisWidth)
        return {
          levels: allLevels.map((level, i) => {
            const val = data[subject][level].median
            const preVal = i === 0 ? 0 : data[subject][allLevels[i - 1]].median
            const y = yScale(val)
            const climates = Object.keys(data[subject][level].cm).map((climate, i2, climates) => {
              const climateX = subjectX + dims.climateWidth * i2 + dims.defMargin
              const val = data[subject][level].cm[climate].median
              if (val == null) return null
              const y = yScale(val)
              const impacts = Object.keys(data[subject][level].cm[climate].im).map((impact, i3, impacts) => {
                const impactWidth = dims.climateInnerWidth / impacts.length
                const impactX = climateX + impactWidth * i3
                const val = data[subject][level].cm[climate].im[impact]
                if (val == null) return null
                // const preVal = i === 0 ? null : data[subject][allLevels[i - 1]].cm[climate].im[impact]
                const y = yScale(val)
                return {
                  x: impactX,
                  y,
                  label: [impact],
                  centerX: impactWidth / 2,
                  transform: `translate(${impactX} ${y})`,
                  val: format(val),
                  width: Math.max(impactWidth, 1)
                }
              }) // .filter(d => d !== null)
              return {
                transform: `translate(${climateX} ${y})`,
                val: format(val),
                x: climateX,
                y,
                label: [climate],
                impacts,
                line: `M${impacts.filter(c => c !== null).map(impact => `${impact.x + dims.climateWidth / impacts.length / 2},${impact.y}`).join(' L')}`
              }
            }) // .filter(d => d !== null)
            return {
              val: format(val),
              transform: `translate(${subjectX} ${y})`,
              x: subjectX,
              y,
              color: colors[level],
              gradient: {
                height: yScale(preVal) - y,
                fill: gradients[level]
              },
              climates,
              line: `M${climates.filter(c => c !== null).map(impact => `${impact.x + dims.climateWidth / 2},${impact.y}`).join(' L')}`
            }
          })
        }
      })
      subjects.forEach(subject => {
        [...subject.levels].sort((a, b) => a.y < b.y).forEach((level, i, levels) => {
          if (i === 0) return
          const pre = levels[i - 1]
          level.gradient = {
            height: pre.y - level.y,
            fill: `url(#grad-${pre.color}-${level.color})`
          }
        })
        const climates = subject.levels[0].climates.map((c, i) => i)
        climates.forEach(climateIndex => {
          [...subject.levels].filter(a => a.climates[climateIndex] != null).sort((a, b) => a.climates[climateIndex].y < b.climates[climateIndex].y).forEach((level, i, levels) => {
            if (i === 0) return
            const pre = levels[i - 1]
            level.climates[climateIndex].gradient = {
              height: pre.climates[climateIndex].y - level.climates[climateIndex].y,
              fill: `url(#grad-${pre.color}-${level.color})`
            }
            if (i === levels.length - 1) level.climates[climateIndex].highest = true
          })
          const impacts = subject.levels[0].climates[climateIndex].impacts.map((c, i) => i)
          impacts.forEach(impactIndex => {
            [...subject.levels]
              .filter(a => a.climates[climateIndex] != null && a.climates[climateIndex].impacts[impactIndex] !== null)
              .sort((a, b) => a.climates[climateIndex].impacts[impactIndex].y < b.climates[climateIndex].impacts[impactIndex].y)
              .forEach((level, i, levels) => {
                if (i === 0) return
                const pre = levels[i - 1]
                level.climates[climateIndex].impacts[impactIndex].gradient = {
                  height: pre.climates[climateIndex].impacts[impactIndex].y - level.climates[climateIndex].impacts[impactIndex].y,
                  fill: `url(#grad-${pre.color}-${level.color})`,
                  x: pre.climates[climateIndex].impacts[impactIndex].centerX
                }
                if (i === levels.length - 1) level.climates[climateIndex].impacts[impactIndex].highest = true
              })
          })
        })
      })
      return subjects
    },
    filters () {
      const view = this.getOption('view')
      return {
        gradient: view === 'median' ? { opacity: 0.2 } : { opacity: 0.1 },
        median: view === 'median' ? { opacity: 1, strokeWidth: 2 } : { opacity: 0, strokeWidth: 2 },
        climate: view === 'climate' ? { opacity: 1, strokeWidth: 1 } : { opacity: 0 },
        climateLine: view === 'climate' ? { opacity: 0, strokeWidth: 1 } : { opacity: 0 },
        climateGradient: view === 'climate' ? { opacity: 1, strokeWidth: 1 } : { opacity: 0 },
        impact: view === 'impact' ? { opacity: 1, strokeWidth: 1 } : { opacity: 0 },
        impactLine: view === 'impact' ? { opacity: 0, strokeWidth: 1 } : { opacity: 0 },
        impactGradient: view === 'impact' ? { opacity: 1, strokeWidth: 1 } : { opacity: 0 },
        sep: view === 'median' ? { opacity: 0 } : { opacity: 1 }
      }
    }
  },
  methods: {
    getOption (key, fix) {
      return this.options[key].temp == null || fix ? this.options[key].fix : this.options[key].temp
    },
    setOption (key, val, fix) {
      this.options[key][fix ? 'fix' : 'temp'] = val
    },
    onResize (el) {
      this.width = el.getBoundingClientRect().width
      this.height = el.getBoundingClientRect().height
    },
    setSpread (val) {
      this.showSpread = val
    },
    setLevel (val) {
      this.highlightLevel = val
    },
    annotate (label, pos) {
      if (label == null) {
        this.annotation = null
        return
      }
      this.annotation = {
        label,
        transform: `translate({pos.x}, {pos.y})`
      }
    }
  },
  watch: {
  }
}
</script>

<style scoped lang="scss">
@import "library/src/style/global.scss";
// $transition: $transition * 10;
.chart-dumbbell {
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

  svg {
    overflow: visible;
    // line {
    //   stroke-width: 1;
    // }

    * {
      pointer-events: none;
    }
    .interaction-layer {
      pointer-events: all;
      opacity: 0;
      // fill: red;

      * {
        pointer-events: all;
      }
    }
    .axis {
      line {
        stroke: getColor(gray, 70);
      }
      text {
        fill: $color-deep-gray;
        text-anchor: middle;
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
    .subject {
      rect, line, g {
        transition: opacity $transition, display $transition, stroke-width $transition;
      }
      .level {
        text {
          @include tint(fill);
        }
        line, path {
          fill: none;
          @include tint(stroke);
        }
      }
    }
    .sep {
      line {
        stroke: getColor(gray, 100);
      }
    }
  }

  .key, .view {
    align-self: flex-start;
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: $spacing / 4;

    span {
      transition: all $transition;
      &.hide {
        opacity: 0.3;
        pointer-events: none;
      }
      + span {
        margin: 0 0 0 $spacing / 8;
      }
    }
    .button {
      align-self: flex-end;
      justify-self: flex-end;
    }
  }
}
</style>
