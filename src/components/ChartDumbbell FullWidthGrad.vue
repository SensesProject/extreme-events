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
          <g class="level" v-for="(level, i) in subject.levels" :key="i">
            <g class="median" :transform="level.transform">
              <line v-bind="filters.median" :class="level.color" :x2="dims.subjectWidth"/>
              <!-- <text :class="level.color" text-anchor="middle" :x="dims.subjectWidth / 2" :y="dims.textAnchorBottom">{{level.val}}%</text> -->
            </g>
            <g class="gradient" v-bind="filters.gradient">
              <rect v-for="(climate, i) in level.climates" :key="i" :transform="climate.transform"
                :height="climate.gradient.height" :width="dims.climateWidth" :fill="climate.gradient.fill"/>
            </g>
            <g class="climate" v-for="(climate, i) in level.climates" :key="i">
              <g :transform="climate.transform">
                <line v-bind="filters.climate" :class="level.color" :x2="dims.climateWidth"/>
              </g>
              <g class="gradient" opacity="0.25">
                <rect v-for="(impact, i) in climate.impacts" :key="i" :transform="impact.transform"
                  :height="impact.gradient.height" :width="impact.width" :fill="impact.gradient.fill"/>
              </g>
              <g class="impact" v-bind="filters.impact" v-for="(impact, i) in climate.impacts" :key="i">
                <g :transform="impact.transform">
                  <line :class="level.color" :x2="impact.width"/>
                </g>
              </g>
            </g>
          </g>
          <g v-if="getOption('view') !== 'median'" class="sep" :transform="`translate(${i * (dims.subjectWidth + dims.axisWidth)} 0)`">
            <line v-for="i in 5" :key="i" :transform="`translate(${(i - 1) * dims.climateWidth} 0)`" :y2="dims.chartHeight"/>
          </g>
        </g>
        <g class="subjects" v-if="!debug">
          <g class="bar" v-for="(b, bi) in bars" :key="`bar-${bi}`" :transform="`translate(${b.x} 0)`">
            <line :x2="dims.subjectWidth" :transform="`translate(0 ${dims.chartHeight})`"/>
            <VueInterpolate tag="g" :attrs="{ bar: {value: b, duration: 400}}" v-slot="{ attrs, active }">
              <template>
                <template>
                  <transition name="fade">
                    <g v-if="!showSpread && !hideData">
                      <g v-for="(g, gi) in attrs.bar.gradients" :key="`gradient-${gi}`">
                        <rect :key="`gradient-inner-${gi}`" v-if="g.opacity !== 0" :width="dims.subjectWidth" :height="g.height" :y="g.y" :fill="g.fill" :opacity="g.opacity"/>
                      </g>
                    </g>
                  </transition>
                </template>
                <g v-for="(s, si) in attrs.bar.stripes" class="stripe" :key="`stripe-${si}`">
                  <g :transform="`translate(0 ${s.y})`">
                    <transition name="fade">
                      <line v-if="!showSpread  && !hideData" :class="[s.class, {active: s.warmingLevel === highlightLevel}]" :x2="dims.subjectWidth" :opacity="highlightLevel == null || s.warmingLevel === activeLevel ? s.opacity : s.opacity * 0.8"/>
                    </transition>
                    <transition name="fade">
                      <text :key="b.stripes[si].value" v-if="s.warmingLevel === activeLevel && !showSpread  && !hideData" :class="s.class" y="-3" :x="dims.subjectWidth / 2">
                        {{b.stripes[si].value}}
                      </text>
                    </transition>
                  </g>
                  <transition name="fade">
                    <g v-if="showSpread && s.warmingLevel === activeLevel" class="cm">
                      <g v-for="(cm, cmi) in s.cm" :key="`stripe-${si}-${cmi}`">
                        <g v-if="cm.median != null" :transform="`translate(${dims.climateWidth * cmi + 2}, 0)`">
                          <rect :class="s.class" :width="dims.climateInnerWidth" :height="cm.max - cm.min" :y="cm.min" opacity="0.3"/>
                          <g :transform="`translate(0 ${cm.median})`">
                            <line :class="s.class" :x2="dims.climateInnerWidth" :opacity="s.opacity"
                              @mouseover="annotate(cm.value, {x: dims.climateWidth * cmi + 2 + dims.climateInnerWidth / 2, y: cm.median})" @mouseout="annotate(null)"/>
                          </g>
                          <template v-if="cm.im.length > 1">
                            <g v-for="(im, imi) in cm.im" :key="`stripe-${si}-${cmi}-${imi}`">
                              <!-- <line :class="s.class" :x1="dims.subjectWidth / 3 * cmi" :x2="dims.subjectWidth / 3 * (cmi + 1)" :opacity="s.opacity * 0.5"/> -->
                              <circle v-if="im.y !== null" r="2" :class="s.class" class="fill" :transform="`translate(${(dims.climateInnerWidth - 4) / cm.im.length * (imi + 0.5) + 2} ${im.y})`" :opacity="s.opacity"
                                @mouseover="annotate(im.value, {x: (dims.climateInnerWidth - 4) / cm.im.length * (imi + 0.5) + 2, y: im.y})" @mouseout="annotate(null)"/>
                            </g>
                          </template>
                        </g>
                      </g>
                      <ChartAnnotation v-if="annotation" v-bind="annotation"/>
                      <template v-else>
                        <g v-for="(cm, cmi) in s.cm" :key="`an-stripe-${si}-${cmi}`">
                          <g v-if="cm.median != null" :transform="`translate(${dims.climateWidth * cmi + 2}, 0)`">
                            <!-- <rect :class="s.class" :width="dims.climateInnerWidth" :height="cm.max - cm.min" :y="cm.min" opacity="0.3"/> -->
                            <transition name="fade">
                              <ChartAnnotation v-if="cm.annotation && !active.bar" :key="`${cm.annotation.label}-${cmi}`" v-bind="{...cm.annotation.align, label: cm.annotation.label || cm.value}" arrow :transform="`translate(${dims.climateInnerWidth / 2} ${cm.median})`"/>
                            </transition>
                            <g v-for="(im, imi) in cm.im" :key="`an-stripe-${si}-${cmi}-${imi}`">
                              <transition name="fade">
                                <ChartAnnotation v-if="im.annotation && !active.bar && im.y !== null" :key="im.annotation.label" v-bind="{...im.annotation.align, label: im.annotation.label || im.value}" :transform="`translate(${(dims.climateInnerWidth - 4) / cm.im.length * (imi + 0.5) + 2} ${im.y})`"/>
                              </transition>
                              <!-- <circle r="2" :class="s.class" class="fill"
                                :cx="(dims.climateInnerWidth - 4) / cm.im.length * (imi + 0.5) + 2" :opacity="s.opacity"/> -->
                            </g>
                          </g>
                        </g>
                      </template>
                    </g>
                  </transition>
                </g>
              </template>
            </VueInterpolate>
          </g>
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
          @mouseover="highlightLevel = d">
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
import VueInterpolate from './Interpolate'
import { scaleLinear } from 'd3-scale'
import { format as d3Format } from 'd3-format'
import resize from 'vue-resize-directive'
export default {
  name: 'chart-dumbbell',
  directives: {
    resize
  },
  components: {
    VueInterpolate,
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
    bars () {
      const { data, dimensions, warmingLevels, allLevels, yScale, dims, annotations } = this
      return dimensions.map((d, di) => {
        return {
          x: (dims.subjectWidth + dims.axisWidth + 4) * di,
          stripes: allLevels.map((l) => {
            const value = data[d.key][l].median
            const change = value / data[d.key][0].median
            const y = yScale(value)
            return {
              class: [`level-${`${l}`.replace(/\./, '-')}`],
              value: `${d3Format(',.2~r')(value)}%`,
              change: d3Format(',.1f')(change),
              y,
              cm: Object.keys(data[d.key][l].cm).sort((a, b) => a > b).map(key => {
                const annotation = annotations.find(a => a.col === d.key && a.cm === key && a.im == null && (a.warming == null || a.warming === l))
                const cm = data[d.key][l].cm[key]
                const im = Object.keys(cm.im).map((im, imi) => ({ value: [im, `${d3Format(',.2~r')(cm.im[im])}%`], y: cm.im[im] !== null ? yScale(cm.im[im]) : null, annotation: annotations.find(a => a.col === d.key && a.cm === key && a.im === imi && (a.warming == null || a.warming === l)) }))
                const median = yScale(cm.median)
                return {
                  median: cm.median === null ? null : median,
                  value: [key, `${d3Format(',.2~r')(cm.median)}%`],
                  max: Math.max(median, ...im.filter(i => i.y != null).map(i => i.y)),
                  min: Math.min(median, ...im.filter(i => i.y != null).map(i => i.y)),
                  im,
                  annotation
                }
              }),
              warmingLevel: l,
              opacity: warmingLevels.indexOf(l) === -1 ? 0 : 1
              // transform: `translate(0px, ${y}px)`
            }
          }).reverse(),
          gradients: allLevels.map((l, li) => {
            const start = li > 0 ? yScale(data[d.key][allLevels[li - 1]].median) : dims.chartHeight
            const end = yScale(data[d.key][l].median)
            const negative = start - end < 0
            return {
              fill: `url(#level-${`${l}`.replace(/\./, '-')}${negative ? '-reverse' : ''})`,
              y: negative ? start : end,
              height: Math.abs(start - end),
              opacity: warmingLevels.indexOf(l) === -1 ? 0 : 0.2
            }
          })
        }
      })
    },
    subjects () {
      const { data, allLevels, yScale, format, dims, colors, gradients } = this
      return ['land', 'population'].map((subject) => {
        const subjectX = subject === 'land' ? 0 : (dims.subjectWidth + dims.axisWidth)
        return {
          levels: allLevels.map((level, i) => {
            const val = data[subject][level].median
            const preVal = i === 0 ? 0 : data[subject][allLevels[i - 1]].median
            const y = yScale(val)
            const climates = Object.keys(data[subject][level].cm)
            return {
              val: format(val),
              transform: `translate(${subjectX} ${y})`,
              color: colors[level],
              gradient: {
                height: yScale(preVal) - y,
                fill: gradients[level]
              },
              climates: climates.map((climate, i2) => {
                const climateX = subjectX + dims.climateWidth * i2
                const val = data[subject][level].cm[climate].median
                if (val == null) return null
                const preVal = i === 0 ? 0 : data[subject][allLevels[i - 1]].cm[climate].median
                console.log(preVal)
                const y = yScale(val)
                const impacts = Object.keys(data[subject][level].cm[climate].im)
                return {
                  transform: `translate(${climateX} ${y})`,
                  val: format(val),
                  gradient: {
                    height: yScale(preVal) - y,
                    fill: gradients[level],
                    x: dims.climateWidth / 2
                  },
                  impacts: impacts.map((impact, i3) => {
                    const impactWidth = dims.climateWidth / impacts.length
                    const impactX = climateX + impactWidth * i3
                    // console.log(data[subject][level], climate)
                    const val = data[subject][level].cm[climate].im[impact]
                    if (val == null) return null
                    const preVal = i === 0 ? 0 : data[subject][allLevels[i - 1]].cm[climate].im[impact]
                    const y = yScale(val)
                    return {
                      transform: `translate(${impactX} ${y})`,
                      val: format(val),
                      width: impactWidth,
                      gradient: {
                        height: yScale(preVal) - y,
                        fill: gradients[level],
                        x: impactWidth / 2
                      }
                    }
                  }).filter(d => d !== null)
                }
              }).filter(d => d !== null)
            }
          })
        }
      })
    },
    filters () {
      const view = this.getOption('view')
      return {
        gradient: view === 'median' ? { opacity: 0.2 } : { opacity: 0.05 },
        median: view === 'median' ? { opacity: 1, strokeWidth: 2 } : { opacity: 0.2, strokeWidth: 1 },
        climate: view === 'climate' ? { opacity: 1, strokeWidth: 2 } : { opacity: 0.2, strokeWidth: 1 },
        impact: view === 'impact' ? { opacity: 1, strokeWidth: 2 } : { opacity: 0.2, strokeWidth: 1 }
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
    // yTicks (newVal, oldVal) {
    //   this.oldTicks = oldVal
    // }
  }
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
    // line {
    //   stroke-width: 1;
    // }
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
        // transition: opacity $transition, display $transition, stroke-width $transition;
      }
      .level {
        text {
          @include tint(fill);
        }
        line {
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
