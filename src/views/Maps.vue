<template>
  <div class="maps">
    <div>
    <section class="max-width wide map-intro">
      <h2 class="serif">Regional Differences</h2>
      <p>
        Extents and impacts of extreme events depend on underlying meteorological, hydrological, and climatological events. But also on human factors such as land use, water and agricultural management, and population density.
      </p>
      <p>
        The data shown base on calculations from climate and climate impact models. It's crucial to comprehend what constitutes exposure since different definitions likely lead to vastly different outcomes. For that reason, we show the share of land and population exposed and the change in exposure compared to preindustrial levels.
      </p>
    </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'maps',
  data () {
    return {
      indicators: ['crop-failure', 'river-flood', 'tropical-cyclone', 'wildfire', 'drought', 'heatwave']
    }
  },
  computed: {
  }
}
</script>
<style lang="scss" scoped>
@import "library/src/style/global.scss";
.maps {
  margin-top: $spacing;
  padding: $spacing 0;
  background: getColor(gray, 90);
  // padding: $spacing/2  0;
  h2 {
    margin: 0 0 $spacing / 2;
  }

  .map-intro {
    margin-top: $spacing;
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
      }

      h3 {
        grid-column-start: 2;
        grid-column-end: 3;
      }

      div {
        grid-column-start: 2;
        grid-column-end: 3;
      }

      .chart-dumbbell {
        margin-top: $spacing / 4;
        grid-column-start: 1;
        grid-column-end: 2;
        grid-row-start: 1;
        grid-row-end: 3;
      }
    }
    @include min-width($medium) {
      grid-template-columns: 3fr 3fr;

      // grid-template-columns: 300px 1fr 1fr;
    }
  }
}
</style>
