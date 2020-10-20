<template>
  <div class="distribution max-width">
    <section class="wide" v-html="getText('intro-module')[0]"/>
    <section class="wide dist-intro" v-html="getText('dist-intro')[0]"/>
    <LayoutScrollytelling :top="top">
      <template v-slot:vis="{ step }" >
        <VisDist :step="step" v-resize:debounce.initial="onResize"/>
      </template>
      <template v-slot:text="{ }">
        <div class="observers">
          <IntersectionObserver v-for="(text, i) in getText('dist')" :key="`t${i}`" :class="`io-${i}`" :step="i">
            <div v-html="text"/>
          </IntersectionObserver>
        </div>
      </template>
    </LayoutScrollytelling>
  </div>
</template>

<script>
import LayoutScrollytelling from 'library/src/components/LayoutScrollytelling.vue'
import IntersectionObserver from 'library/src/components/IntersectionObserver.vue'
import VisDist from '@/components/VisDist.vue'
import resize from 'vue-resize-directive'
import { mapGetters } from 'vuex'

export default {
  name: 'distribution',
  directives: {
    resize
  },
  components: { VisDist, LayoutScrollytelling, IntersectionObserver },
  data () {
    return {
      top: '0px'
    }
  },
  computed: {
    ...mapGetters(['getText'])
  },
  methods: {
    onResize (el) {
      this.top = `calc(50vh - ${el.getBoundingClientRect().height / 2}px)`
    }
  }
}
</script>
<style lang="scss" scoped>
@import "library/src/style/global.scss";
.distribution {
  padding-top: $spacing;
  padding-bottom: $spacing;

  section + section {
    margin-top: $spacing;
  }

  .dist-intro {
    padding-bottom: $spacing;
  }

  .layout-scrollytelling {
    margin-top: $spacing;
    ::v-deep {
      .vis {
        height: auto;
      }
    }

    .intersection-observer {
      ::v-deep {
        .default {
          background: getColor(gray, 100);
          box-shadow: 0px 0px 2px getColor(gray, 80);
          border-radius: $border-radius;
          @supports ((-webkit-backdrop-filter: saturate(180%) blur(20px)) or(backdrop-filter: saturate(180%) blur(20px))) {
            background: transparentize(getColor(gray, 100), 0.5);
            -webkit-backdrop-filter: saturate(180%) blur(10px);
            backdrop-filter:saturate(180%) blur(10px)
          }
        }
      }

      padding-bottom: 30vh;
      &:first-child {
        padding-top: calc(100vh + #{$spacing});
      }
      &:last-child {
        padding-bottom: 40vh;
      }
    }
  }
}
</style>
