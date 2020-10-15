<template>
  <div class="countries max-width">
    <section class="wide countries" v-html="getText('countries-intro')[0]"/>
    <LayoutScrollytelling>
      <template v-slot:vis="{ step }">
        <VisParallel :step="step"/>
      </template>
      <template v-slot:text="{ }">
        <div class="observers">
          <IntersectionObserver v-for="(text, i) in getText('countries')" :key="`t${i}`" :class="`io-${i}`" :step="i">
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
import VisParallel from '@/components/VisParallel.vue'
import raw from '@/assets/data/countries.json'

import { mapGetters } from 'vuex'

export default {
  name: 'countries',
  components: { VisParallel, LayoutScrollytelling, IntersectionObserver },
  data () {
    return {
      indicators: ['wildfire', 'tropical-cyclone', 'crop-failure', 'river-flood', 'drought', 'heatwave']
    }
  },
  computed: {
    ...mapGetters(['getText']),
    categories () {
      const { indicators } = this
      return indicators.map(i => {
        return {
          height: 360,
          data: raw.world[i],
          region: null,
          indicator: i.replace(/-/g, ' ')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "library/src/style/global.scss";
.countries {
  ::v-deep {
      h2 {
      margin: $spacing 0 $spacing / 2;
    }
  }

  section + section {
    margin-top: $spacing;
  }

  .chart {
    height: 600px;
    max-height: 100vh;
    width: 50%;
  }

  ::v-deep {
      h2 {
      margin: $spacing 0 $spacing / 2;
    }
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
