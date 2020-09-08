<template>
    <svg class="helper-gradients" :width="0" :height="0">
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
</template>

<style scoped lang="scss">
@import "library/src/style/global.scss";
svg.helper-gradients {
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
</style>
