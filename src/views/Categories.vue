<template>
  <div class="categories max-width">
    <section class="wide cat-intro">
      <h2 class="serif">Extreme Event Categories</h2>
      <p>
        Extents and impacts of extreme events depend on underlying meteorological, hydrological, and climatological events. But also on human factors such as land use, water and agricultural management, and population density.
      </p>
      <p>
        The data shown base on calculations from climate and climate impact models. It's crucial to comprehend what constitutes exposure since different definitions likely lead to vastly different outcomes. For that reason, we show the share of land and population exposed and the change in exposure compared to preindustrial levels.
      </p>
    </section>
    <!-- <section > -->
    <section class="cat-grid">
      <h3 class="wide serif">{{ indicators[0].replace(/-/g, ' ') }}<span class="glyph glyph-wildfires"/></h3>
      <div>
        <p>Agricultural land spatially confines where crop failure may occur. People working in agriculture are primarily affected to crop failure since trade can typically mitigate shortages. That limits both how much land area and how many people can such events affect.</p>
        <p>Here, the four major crops maize, wheat, soybean, and rice, are considered. If yields fall below the 2.5th percentile of the preindustrial baseline distribution crop failure is assessed. For population, only people working in agriculture are considered vulnerable.</p>
      </div>
      <ChartDumbbell relative show-key v-bind="categories[0]" :x-domain="[0, 3]" :warming-level-labels="[2]"/>
    </section>
    <hr>
    <section class="cat-grid">
      <h3 class="wide serif">{{ indicators[1].replace(/-/g, ' ') }}<span class="glyph glyph-hurricanes"/></h3>
      <div>
        Agricultural land spatially confines where crop failure may occur. People working in agriculture are primarily affected to crop failure since trade can typically mitigate shortages. This limits both, how much land area and how many people can be exposed to such events.
      </div>
      <ChartDumbbell relative show-key v-bind="categories[1]" :x-domain="[0, 3]" :warming-level-labels="[2]"/>
    </section>
    <hr>
    <section class="cat-grid">
      <h3 class="wide serif">{{ indicators[2].replace(/-/g, ' ') }}<span class="glyph glyph-crop-failure"/></h3>
      <div>
        <p>Agricultural land spatially confines where crop failure may occur. People working in agriculture are primarily affected to crop failure since trade can typically mitigate shortages. That limits both how much land area and how many people can such events affect.</p>
        <p>Here, the four major crops maize, wheat, soybean, and rice, are considered. If yields fall below the 2.5th percentile of the preindustrial baseline distribution crop failure is assessed. For population, only people working in agriculture are considered vulnerable.</p>
      </div>
      <ChartDumbbell relative show-key v-bind="categories[2]" :domain="[0, 3]" :warming-level-labels="[2]"/>
    </section>
    <hr>
    <section class="cat-grid">
      <h3 class="wide serif">{{ indicators[3].replace(/-/g, ' ') }}<span class="glyph glyph-floods"/></h3>
      <div>
        Agricultural land spatially confines where crop failure may occur. People working in agriculture are primarily affected to crop failure since trade can typically mitigate shortages. This limits both, how much land area and how many people can be exposed to such events.
      </div>
      <ChartDumbbell relative show-key v-bind="categories[3]" :domain="[0, 3]" :warming-level-labels="[2]"/>
    </section>
    <hr>
    <section class="cat-grid">
      <h3 class="wide serif">{{ indicators[4].replace(/-/g, ' ') }}<span class="glyph glyph-droughts"/></h3>
      <div>
        Agricultural land spatially confines where crop failure may occur. People working in agriculture are primarily affected to crop failure since trade can typically mitigate shortages. This limits both, how much land area and how many people can be exposed to such events.
      </div>
      <ChartDumbbell relative show-key v-bind="categories[4]" :domain="[0, 3]" :warming-level-labels="[2]"/>
    </section>
    <hr>
    <section class="cat-grid">
      <h3 class="wide serif">{{ indicators[5].replace(/-/g, ' ') }}<span class="glyph glyph-floods"/></h3>
      <div>
        Agricultural land spatially confines where crop failure may occur. People working in agriculture are primarily affected to crop failure since trade can typically mitigate shortages. This limits both, how much land area and how many people can be exposed to such events.
      </div>
      <ChartDumbbell relative show-key v-bind="categories[5]" :domain="[0, 30]" :warming-level-labels="[2]"/>
    </section>
    <!-- </section> -->
  </div>
</template>

<script>
import ChartDumbbell from '@/components/ChartDumbbell.vue'
import raw from '@/assets/data/countries.json'
export default {
  name: 'categories',
  components: { ChartDumbbell },
  data () {
    return {
      indicators: ['wildfire', 'tropical-cyclone', 'crop-failure', 'river-flood', 'drought', 'heatwave']
    }
  },
  computed: {
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
.categories {
  h2 {
    margin: $spacing 0 $spacing / 2;
  }
  hr {
    border: 0;
    height: 0;
    border-top: getColor(gray, 80) 1px solid;
    margin: $spacing / 2 0;
  }

  section + section {
    margin-top: $spacing;
  }

  .cat-grid {
    display: grid;
    gap: $spacing / 4 $spacing;
    grid-template-columns: repeat(1, 1fr);
    h3 {
      text-transform: capitalize;
      grid-column-start: 1;
      grid-column-end: 2;
      grid-row-start: 1;
      grid-row-end: 2;

      .glyph {
        color: $color-neon;
        display: inline-block;
        padding-left: $spacing / 12;
        transform: translateY(-$spacing / 12) scale(2);
      }
    }

    div {
      grid-column-start: 1;
      grid-column-end: 2;
      // grid-row-start: 3;
      // grid-row-end: 4;
    }

    .chart-dumbbell {
      margin-top: -$spacing / 4;
      grid-column-start: 1;
      grid-column-end: 2;
      grid-row-start: 2;
      grid-row-end: 3;
    }
    @include min-width($narrow) {
      grid-template-rows: auto 1fr;
      grid-template-columns: repeat(2, 1fr);

      hr {
        grid-column-start: 1;
        grid-column-end: 3;
        grid-column-start: 2;
        grid-column-end: 3;
      }

      h3 {
        grid-column-start: 1;
        grid-column-end: 2;
      }

      div {
        grid-column-start: 1;
        grid-column-end: 2;
      }

      .chart-dumbbell {
        margin-top: $spacing / 4;
        grid-column-start: 2;
        grid-column-end: 3;
        grid-row-start: 1;
        grid-row-end: 3;
      }
    }
  }
}
</style>
