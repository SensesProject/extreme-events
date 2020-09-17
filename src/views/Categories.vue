<template>
  <div class="categories max-width">
    <section class="wide cat-intro">
      <p>
        Extents and impacts of extreme events depend on underlying meteorological, hydrological, and climatological events. But as we have already seen in the case of crop failure also on human factors such as land use, water and agricultural management, and population density.
      </p>
      <p>
        In this module we show six extreme event categories:
        <span class="no-break"><span class="glyph glyph-hurricanes"/>tropical cyclones</span>,
        <span class="no-break"><span class="glyph glyph-floods"/>river floods</span>,
        <span class="no-break"><span class="glyph glyph-crop-failure"/>crop failures</span>,
        <span class="no-break"><span class="glyph glyph-wildfires"/>wildfires</span>,
        <span class="no-break"><span class="glyph glyph-droughts"/>droughts</span>, and
        <span class="no-break"><span class="glyph glyph-floods"/>heatwaves</span>.
      </p>
      <p>
        At the global scale we look at how these affect land and population at different levels of global warming and discuss modeling uncertainty. On the national scale we show which countries are most exposed to extreme events and their geographical and economical setting.
      </p>
    </section>
    <HelperGradients/>
    <section>

    </section>
    <LayoutScrollytelling>
      <template v-slot:vis="{ height }">
        <ChartDumbbell show-change show-key v-bind="chart" :height="height"/>
      </template>
      <template v-slot:text="{ }">
        <div class="observers">
          <IntersectionObserver class="io-0" :step="0">
            <h2>River Floods<span class="glyph" :class="categories['river-flood'].icon"/></h2>
            <div>
              Agricultural land spatially confines where crop failure may occur. People working in agriculture are primarily affected to crop failure since trade can typically mitigate shortages. This limits both, how much land area and how many people can be exposed to such events.
            </div>
          </IntersectionObserver>
          <IntersectionObserver class="io-0" :step="0">
            <h2>{{ indicators[0].replace(/-/g, ' ') }}<span class="glyph glyph-wildfires"/></h2>
            <div>
              <p>Agricultural land spatially confines where crop failure may occur. People working in agriculture are primarily affected to crop failure since trade can typically mitigate shortages. That limits both how much land area and how many people can such events affect.</p>
              <p>Here, the four major crops maize, wheat, soybean, and rice, are considered. If yields fall below the 2.5th percentile of the preindustrial baseline distribution crop failure is assessed. For population, only people working in agriculture are considered vulnerable.</p>
            </div>
          </IntersectionObserver>
          <IntersectionObserver class="io-1" :step="1">
            <h2>{{ indicators[1].replace(/-/g, ' ') }}<span class="glyph glyph-hurricanes"/></h2>
            <div>
              Agricultural land spatially confines where crop failure may occur. People working in agriculture are primarily affected to crop failure since trade can typically mitigate shortages. This limits both, how much land area and how many people can be exposed to such events.
            </div>
          </IntersectionObserver>
          <IntersectionObserver class="io-2" :step="2">
            <h2>{{ indicators[2].replace(/-/g, ' ') }}<span class="glyph glyph-crop-failure"/></h2>
            <div>
              <p>Agricultural land spatially confines where crop failure may occur. People working in agriculture are primarily affected to crop failure since trade can typically mitigate shortages. That limits both how much land area and how many people can such events affect.</p>
              <p>Here, the four major crops maize, wheat, soybean, and rice, are considered. If yields fall below the 2.5th percentile of the preindustrial baseline distribution crop failure is assessed. For population, only people working in agriculture are considered vulnerable.</p>
            </div>
          </IntersectionObserver>
          <IntersectionObserver class="io-4" :step="4">
            <h2>{{ indicators[4].replace(/-/g, ' ') }}<span class="glyph glyph-droughts"/></h2>
            <div>
              Agricultural land spatially confines where crop failure may occur. People working in agriculture are primarily affected to crop failure since trade can typically mitigate shortages. This limits both, how much land area and how many people can be exposed to such events.
            </div>
          </IntersectionObserver>
          <IntersectionObserver class="io-5" :step="5">
            <h2>{{ indicators[5].replace(/-/g, ' ') }}<span class="glyph glyph-floods"/></h2>
            <div>
              Agricultural land spatially confines where crop failure may occur. People working in agriculture are primarily affected to crop failure since trade can typically mitigate shortages. This limits both, how much land area and how many people can be exposed to such events.
            </div>
          </IntersectionObserver>
        </div>
      </template>
    </LayoutScrollytelling>
  </div>
</template>

<script>
import HelperGradients from '@/components/HelperGradients.vue'
import ChartDumbbell from '@/components/ChartDumbbell.vue'
import LayoutScrollytelling from 'library/src/components/LayoutScrollytelling.vue'
import IntersectionObserver from 'library/src/components/IntersectionObserver.vue'

import raw from '@/assets/data/countries.json'
export default {
  name: 'categories',
  components: { ChartDumbbell, HelperGradients, LayoutScrollytelling, IntersectionObserver },
  data () {
    return {
      indicators: ['wildfire', 'tropical-cyclone', 'crop-failure', 'river-flood', 'drought', 'heatwave'],
      icons: ['wildfire', 'hurricanes', 'crop-failure', 'floods', 'droughts', 'floods']
    }
  },
  computed: {
    categories () {
      const { indicators, icons } = this
      return Object.fromEntries(indicators.map((indicator, i) => {
        return [indicator, {
          data: raw.world[indicator],
          icon: `glyph-${icons[i]}`
        }]
      }))
    },
    chart () {
      const { step, categories } = this
      let category = 'river-flood'
      let warmingLevelLabels = [2]

      switch (step) {
        case 0:
          warmingLevelLabels = [0]
          break
        case 1:
          warmingLevelLabels = [1]
          break
        case 2:
          warmingLevelLabels = [1.5]
          break
        case 3:
          break
        case 4:
          category = 'wildfire'
          break
        case 5:
          category = 'tropical-cyclone'
          break
        case 6:
          category = 'crop-failure'
          break
        case 7:
          category = 'drought'
          break
        case 8:
          category = 'heatwave'
          break
      }

      return {
        data: categories[category].data,
        warmingLevelLabels,
        region: null
      }
    }
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

  p {
    .glyph {
      color: $color-neon;
      display: inline-block;
      // padding-right§: $spacing / 12;
      transform: scale(1.6);
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
