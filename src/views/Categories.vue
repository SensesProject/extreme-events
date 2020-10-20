<template>
  <div class="categories max-width">
    <section class="wide cat-intro" v-html="getText('cat-intro')[0]">
      <!-- <p>
        Extents and impacts of extreme events depend on underlying meteorological, hydrological, and climatological events. But as we have already seen in the case of crop failure also on human factors such as land use, water and agricultural management, and population density.
      </p>
      <p>
        In this module we show six extreme event categories:
        <span class="no-break"><span class="glyph glyph-tropical-cyclone"/>tropical cyclones</span>,
        <span class="no-break"><span class="glyph glyph-river-flood"/>river floods</span>,
        <span class="no-break"><span class="glyph glyph-crop-failure"/>crop failures</span>,
        <span class="no-break"><span class="glyph glyph-wildfire"/>wildfires</span>,
        <span class="no-break"><span class="glyph glyph-drought"/>droughts</span>, and
        <span class="no-break"><span class="glyph glyph-heatwave"/>heatwaves</span>.
      </p>
      <p>
        At the global scale we look at how these affect land and population at different levels of global warming and discuss modeling uncertainty. On the national scale we show which countries are most exposed to extreme events and their geographical and economical setting.
      </p> -->
    </section>
    <HelperGradients/>
    <section>

    </section>
    <LayoutScrollytelling>
      <template v-slot:vis="{ height, step }">
        <VisCategories :height="height" :step="step"/>
      </template>
      <template v-slot:text="{ }">
        <div class="observers">
          <IntersectionObserver v-for="(text, i) in getText('categories')" :key="`t${i}`" :class="`io-${i}`" :step="i">
            <div v-html="text"/>
          </IntersectionObserver>
        </div>
      </template>
    </LayoutScrollytelling>
  </div>
</template>

<script>
import HelperGradients from '@/components/HelperGradients.vue'
import VisCategories from '@/components/VisCategories.vue'
import LayoutScrollytelling from 'library/src/components/LayoutScrollytelling.vue'
import IntersectionObserver from 'library/src/components/IntersectionObserver.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'categories',
  components: { VisCategories, HelperGradients, LayoutScrollytelling, IntersectionObserver },
  data () {
    return {
      // indicators: ['wildfire', 'tropical-cyclone', 'crop-failure', 'river-flood', 'drought', 'heatwave'],
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

        h2 {
          margin-bottom: $spacing / 4;
          text-transform: capitalize;
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
            &.io-0 {
              padding-top: 30vh;
            }
            .default {
              padding: 0;

              .glyph {
                color: $color-neon;
                transform: scale(2);
                display: inline-block;
                margin-left: $spacing / 4;
              }
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
