<template>
    <svg class="helper-gradients" :width="0" :height="0">
      <defs>
        <template v-for="c1 in ['blue', 'yellow', 'orange', 'red', 'purple']">
          <template v-for="c2 in ['blue', 'yellow', 'orange', 'red', 'purple']">
            <linearGradient :key="`${c1}-${c2}`" :id="`grad-${c1}-${c2}`" y1="1" x2="0">
              <stop class="grad" :class="c1" offset="0%"/>
              <stop class="grad" :class="c2"  offset="100%"/>
            </linearGradient>
          </template>
        </template>
        <linearGradient id="level-0" y1="1" x2="0">
          <stop class="start" offset="0%"/>
          <stop class="stop" offset="100%"/>
        </linearGradient>
        <linearGradient id="level-0-reverse" y1="1" x2="0">
          <stop class="stop" offset="0%"/>
          <stop class="start" offset="100%"/>
        </linearGradient>
        <linearGradient id="level-1" y1="1" x2="0">
          <stop class="start" offset="0%"/>
          <stop class="stop" offset="100%"/>
        </linearGradient>
        <linearGradient id="level-1-reverse" y1="1" x2="0">
          <stop class="stop" offset="0%"/>
          <stop class="start" offset="100%"/>
        </linearGradient>
        <linearGradient id="level-1-5" y1="1" x2="0">
          <stop class="start" offset="0%"/>
          <stop class="stop" offset="100%"/>
        </linearGradient>
        <linearGradient id="level-1-5-reverse" y1="1" x2="0">
          <stop class="stop" offset="0%"/>
          <stop class="start" offset="100%"/>
        </linearGradient>
        <linearGradient id="level-2" y1="1" x2="0">
          <stop class="start" offset="0%"/>
          <stop class="stop" offset="100%"/>
        </linearGradient>
        <linearGradient id="level-2-reverse" y1="1" x2="0">
          <stop class="stop" offset="0%"/>
          <stop class="start" offset="100%"/>
        </linearGradient>
        <linearGradient id="level-2-5" y1="1" x2="0">
          <stop class="start" offset="0%"/>
          <stop class="stop" offset="100%"/>
        </linearGradient>
        <linearGradient id="level-2-5-reverse" y1="1" x2="0">
          <stop class="stop" offset="0%"/>
          <stop class="start" offset="100%"/>
        </linearGradient>
        <linearGradient id="level-3" y1="1" x2="0">
          <stop class="start" offset="0%"/>
          <stop class="stop" offset="100%"/>
        </linearGradient>
        <linearGradient id="level-3-reverse" y1="1" x2="0">
          <stop class="stop" offset="0%"/>
          <stop class="start" offset="100%"/>
        </linearGradient>
        <linearGradient id="level-3-5" y1="1" x2="0">
          <stop class="start" offset="0%"/>
          <stop class="stop" offset="100%"/>
        </linearGradient>
        <linearGradient id="level-3-5-reverse" y1="1" x2="0">
          <stop class="stop" offset="0%"/>
          <stop class="start" offset="100%"/>
        </linearGradient>

        <linearGradient id="dist" y1="0" x2="1">
          <stop class="b-1" offset="0%"/>
          <stop class="b-1" offset="20%"/>
          <stop class="b-2" offset="20%"/>
          <stop class="b-2" offset="30%"/>
          <stop class="g" offset="30%"/>
          <stop class="g" offset="70%"/>
          <stop class="r-2" offset="70%"/>
          <stop class="r-2" offset="80%"/>
          <stop class="r-1" offset="80%"/>
          <stop class="r-1" offset="100%"/>
        </linearGradient>
        <linearGradient id="dist-start" y1="0" x2="1">
          <stop class="w" offset="0%"/>
          <stop class="w" offset="30%"/>
          <stop class="g" offset="30%"/>
          <stop class="g" offset="70%"/>
          <stop class="w" offset="70%"/>
          <stop class="w" offset="100%"/>
        </linearGradient>
      </defs>
    </svg>
</template>

<style scoped lang="scss">
@import "library/src/style/global.scss";
svg.helper-gradients {

  .grad {
    @include tint(stop-color);
  }
  pointer-events: none;
  #level-0, #level-0-reverse {
    .start {
      stop-color: transparent;
    }
    .stop {
      stop-color: transparent;
    }
  }
  #level-1, #level-1-reverse {
    .start {
      stop-color: $color-blue;
    }
    .stop {
      stop-color: $color-yellow;
    }
  }
  #level-1-5, #level-1-5-reverse {
    .start {
      stop-color: $color-yellow;
    }
    .stop {
      stop-color: $color-orange;
    }
  }
  #level-2, #level-2-reverse {
    .start {
      stop-color: $color-orange;
    }
    .stop {
      stop-color: $color-red;
    }
  }
  #level-2-5, #level-2-5-reverse, #level-3, #level-3-reverse, #level-3-5, #level-3-5-reverse {
    .start {
      stop-color: $color-red;
      // stop-color: $color-red;
    }
    .stop {
      stop-color: $color-purple;
      // stop-color: $color-purple;
    }
  }
  #dist {
    .b-1 {
      stop-color: $color-neon;
    }
    .b-2 {
      // stop-color: transparentize($color-blue, 0.25);
      stop-color: getColor(blue, 60);
    }
    .g {
      stop-color: getColor(gray, 90);
    }
    .r-1 {
      stop-color: $color-red;
    }
    .r-2 {
      // stop-color: transparentize($color-red, 0.25);
      stop-color: getColor(orange, 60);
    }
  }
  #dist-start {
    .w {
      stop-color: $color-white;
    }
    .g {
      stop-color: getColor(gray, 90);
    }
  }
}
</style>
