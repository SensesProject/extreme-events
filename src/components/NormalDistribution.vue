<template>
  <g>
    <path v-bind="props" ref="path" class="normal-dist" :d="path" :transform="`translate(0 ${y})`"/>
  </g>
</template>

<script>
export default {
  name: 'normal-dist',
  props: {
    x: Number,
    y: {
      type: Number,
      default: 0
    },
    props: Object,
    width: Number,
    height: Number,
    max: Number
  },
  data () {
    return {
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
    mix-blend-mode: multiply;
    fill: getColor(gray, 80)
  }
// }
</style>
