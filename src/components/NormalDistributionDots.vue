<template>
  <g>
    <path v-bind="props" ref="path" class="normal-dist" :d="path" :transform="`translate(0 ${y})`"/>
    <g class="dots" v-if="showDots">
      <circle v-for="(d) in dots" :key="`d-${d.x}-${d.y}`" :class="[d.class]" r="2.5" :cx="d.x" :cy="d.y" :opacity="d.opacity"/>
    </g>
  </g>
</template>

<script>
/* eslint-disable */
export default {
  name: 'normal-dist',
  props: {
    x: Number,
    y: {
      type: Number,
      default: 0
    },
    stage1: Number,
    stage2: Number,
    props: Object,
    width: Number,
    height: Number,
    max: Number,
    showDots: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      pathElement: null,
      dots: []
    }
  },
  computed: {
    path () {
      const { width, height, max, x } = this
      const half = width / 2
      const side = width / 4
      const mid = width / 6
      if (max == null) return `M ${-half + x} 0 C ${-half + side + x} 0, ${-mid + x} ${-height}, ${x} ${-height}, ${mid + x} ${-height}, ${half - side + x} 0, ${half + x} 0`
      return `M ${-max / 2} 0 L${-half + x} 0 C ${-half + side + x} 0, ${-mid + x} ${-height}, ${x} ${-height}, ${mid + x} ${-height}, ${half - side + x} 0, ${half + x} 0 L ${max / 2} 0`
    }
  },
  mounted () {
    // console.log(this.findY(this.$refs.path, this.width / 2))
    this.pathElement = this.$refs.path
  },
  methods: {
    calcDots () {
      if (this.pathElement == null || this.path == null) return
      const { width, findY, height, stage1, stage2 } = this
      const half = Math.floor(width * 0.6 / 12) * 12
      // const extremes = Math.floor(width / 2 / 12) * 12
      const dots = []
      for (let x = -half; x <= half; x += 12) {
        const max = findY(this.$refs.path, x)
        // const max = -100
        let classname = x < -stage1 ? 'blue' : x > stage1 ? 'orange' : 'default'
        classname = x < -stage2 ? 'neon' : x > stage2 ? 'red' : classname
        for (let y = -2.5; y >= -height; y -= 12) {
          dots.push({ x, y, opacity: y >= max ? 1 : 0, class: classname })
        }
      }
      this.dots = dots
    },
    findY (path, x) {
      var pathLength = path.getTotalLength()
      var start = 0
      var end = pathLength
      var target = (start + end) / 2

      // Ensure that x is within the range of the path
      // x = Math.max(x, path.getPointAtLength(0).x)
      // x = Math.min(x, path.getPointAtLength(pathLength).x)

      // Walk along the path using binary search
      // to locate the point with the supplied x value
      let iterations = 0
      while (target >= start && target <= pathLength) {
        iterations ++
        var pos = path.getPointAtLength(target)

        // use a threshold instead of strict equality
        // to handle javascript floating point precision
        if (Math.abs(pos.x - x) < 4 || iterations > 15) {
          return pos.y
        } else if (pos.x > x) {
          end = target
        } else {
          start = target
        }
        target = (start + end) / 2
      }
    }
  },
  watch: {
    path () { this.$nextTick(() => this.calcDots()) }

  }
}
</script>

<style scoped lang="scss">
@import "library/src/style/global.scss";

// .normal-dist {
  // stroke: $color-deep-gray;
  // fill: $color-gray;
  // opacity: 0.2;
  // mix-blend-mode: multiply;
  // opacity: 0.2;

  .dots {
    // mix-blend-mode: multiply;

    circle {
      stroke: getColor(gray, 80);
      fill: none;
      stroke-width: 1;
      @include tint(stroke, 50);
      // &.blue, &.orange {
      //   @include tint(fill, 60);
      // }

      transition: fill $transition;
    }
  }
// }
</style>
