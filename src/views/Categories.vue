<template>
  <div class="categories max-width">
    <section class="wide cat-intro" v-html="getText('cat-intro')[0]"/>
    <HelperGradients/>
    <LayoutScrollytelling>
      <template v-slot:vis="{ height, step }">
        <VisCategories :height="height" :step="step" :indicators="indicators"/>
      </template>
      <template v-slot:text="{ step }">
        <div class="observers">
          <IntersectionObserver :step="0" :class="{active: step === 0}">
            <div v-html="getText('cat-exposure')[0]"/>
          </IntersectionObserver>
          <IntersectionObserver :step="1" :class="{active: step === 1}">
            <div v-html="getText('cat-heatwave-title')[0]"/>
            <GemExpandable title="How is exposure to heatwaves defined?"><span v-html="getText('cat-heatwave-definition')[0]"/></GemExpandable>
            <div v-html="getText('cat-heatwave')[0]"/>
          </IntersectionObserver>
          <IntersectionObserver :step="1.1" :class="{active: step === 1.1}">
            <div v-html="getText('cat-heatwave')[1]"/>
          </IntersectionObserver>
          <IntersectionObserver :step="1.2" :class="{active: step === 1.2}">
            <div v-html="getText('cat-heatwave')[2]"/>
          </IntersectionObserver>
          <IntersectionObserver :step="1.3" :class="{active: step === 1.3}">
            <div v-html="getText('cat-heatwave')[3]"/>
          </IntersectionObserver>
          <IntersectionObserver :step="1.4" :class="{active: step === 1.4}">
            <div v-html="getText('cat-heatwave')[4]"/>
          </IntersectionObserver>
          <template v-for="({cat, i}) in indicators.filter((cat,i) => i > 0).map((cat,i) => ({cat, i: i + 2}))">
            <IntersectionObserver :key="`${i}-0`" :step="i" :class="{active: step === i}">
              <div v-html="getText(`cat-${cat}-title`)[0]"/>
              <GemExpandable :title="`How is exposure to ${cat.replace(/-/g, ' ')} defined?`"><span v-html="getText(`cat-${cat}-definition`)[0]"/></GemExpandable>
              <div v-html="getText(`cat-${cat}`)[0]"/>
            </IntersectionObserver>
            <IntersectionObserver :key="`${i}-1`" :step="i + 0.1" :class="{active: step === i + 0.1}">
              <div v-html="getText(`cat-${cat}`)[1]"/>
            </IntersectionObserver>
            <IntersectionObserver v-if="getText(`cat-${cat}`)[2] != null" :key="`${i}-2`" :step="i + 0.2" :class="{active: step === i + 0.2}">
              <div v-html="getText(`cat-${cat}`)[2]"/>
            </IntersectionObserver>
          </template>
          <!-- <IntersectionObserver :step="8" :class="{active: step === 8}">
            <div v-html="getText('cat-crop-failure-title')[0]"/>
            <GemExpandable title="How is exposure to crop failure defined?"><span v-html="getText('cat-crop-failure-definition')[0]"></span></GemExpandable>
            <div v-html="getText('cat-crop-failure')[0]"/>
          </IntersectionObserver>
          <IntersectionObserver :step="9" :class="{active: step === 9}">
            <div v-html="getText('cat-crop-failure')[1]"/>
          </IntersectionObserver> -->
        </div>
      </template>
    </LayoutScrollytelling>
  </div>
</template>

<script>
import HelperGradients from '@/components/HelperGradients.vue'
import VisCategories from '@/components/VisCategories.vue'
import GemExpandable from '@/components/GemExpandable.vue'
import LayoutScrollytelling from 'library/src/components/LayoutScrollytelling.vue'
import IntersectionObserver from 'library/src/components/IntersectionObserver.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'categories',
  components: { VisCategories, HelperGradients, LayoutScrollytelling, IntersectionObserver, GemExpandable },
  data () {
    return {
      indicators: ['heatwave', 'drought', 'crop-failure', 'wildfire', 'river-flood', 'tropical-cyclone']
      // icons: ['wildfire', 'tropical-cyclone', 'crop-failure', 'river-flood', 'drought', 'heatwave']
    }
  },
  computed: {
    ...mapGetters(['getText'])
  }
}
</script>
<style lang="scss" scoped>
@import "library/src/style/global.scss";
.categories {
  // h2 {
  //   margin: $spacing 0 $spacing / 2;
  // }
  hr {
    border: 0;
    height: 0;
    border-top: getColor(gray, 80) 1px solid;
    margin: $spacing / 2 0;
  }

  section {
    margin-top: $spacing;
  }

  .cat-intro::v-deep {
    // .glyph {
    //   color: $color-neon;
    //   display: inline-block;
    //   // padding-right§: $spacing / 12;
    //   transform: scale(1.6);
    // }
  }

  .layout-scrollytelling {
    ::v-deep {
      .text {
        margin-left: - $spacing / 2;
        margin-right: - $spacing / 2;
      }

      .glyph {
        color: $color-neon;
        transform: scale(2);
        display: inline-block;
        margin-left: $spacing / 4;
      }

      .intersection-observer {
        .default {
          width: 100%;
        }
      }
    }
    @include min-width($narrow) {
      display: flex;
      flex-direction: row-reverse;

      ::v-deep {
        .text {
          flex: 1;
          margin-left: 0;
          margin-top: 0;
          margin-right: $spacing / 2;

          .intersection-observer {
            padding-top: 10vh;
            padding-bottom: 10vh;
            opacity: 0.25;
            > * {
              pointer-events: none;
            }
            transition: opacity $transition;
            &:nth-of-type(1) {
              padding-top: 15vh;
            }
            &:nth-last-of-type(1) {
              padding-bottom: 40vh;
            }
            .default {
              padding: 0;
            }
            &.active {
              opacity: 1;
              > * {
                pointer-events: initial;
              }
              // pointer-events: unset;
            }
          }
        }
        .vis {
          flex: 1;
        }
      }
    }
  }
}
</style>
