<template>
  <g class="chart-annotation">
    <circle v-if="!arrow" r="5"/>
    <path v-else :d="`M -4 ${align.top ? - 7 : 7} L 0 ${align.top ? - 3 : 3} L 4 ${align.top ? - 7 : 7} M 0 ${align.top ? - 4 : 4} L 0 ${align.top ? - 5 : 5}`"/>
    <path v-if="label" :d="`M 0 ${align.top ? -5 : 5} A 10 10 0 0 ${align.left === align.top ? 0 : 1} ${align.left ? -10 : 10} ${align.top ? -15 : 15} L ${align.left ? -15 : 15} ${align.top ? -15 : 15}`"/>
    <g v-if="label" :transform="`translate(${align.left ? -20 : 20} ${align.top ? -15 : 15})`" :text-anchor="align.left ? 'end' : 'start'">
      <!-- <text class="shadow" y="4">{{label}}</text> -->
      <text y="4">{{label}}</text>
    </g>
  </g>
</template>

<script>
export default {
  name: 'chart-annotation',
  props: {
    align: {
      type: Object,
      default () {
        return {
          top: true,
          left: false
        }
      }
    },
    label: String,
    arrow: Boolean
  }
}
</script>

<style scoped lang="scss">
@import "library/src/style/global.scss";
.chart-annotation {
  circle, path {
    stroke: $color-neon;
    fill: none;
  }

  text {
    fill: $color-neon;
    &.shadow {
      stroke: $color-white;
      fill: $color-white;
      stroke-width: 2;
    }
  }
}
</style>
