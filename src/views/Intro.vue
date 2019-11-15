<template>
  <div class="intro">
    <section class="wide">
      <h1>Extreme Events</h1>
      <p>
        The extent and impact of crop failures, river floods, tropical cyclones, heatwaves, wildfires, and droughts depend on the underlying meteorological, hydrological, or climatological events as well as on human factors such as land use, water and agricultural management, and population density. Historical variations in these human factors impede the detection of climate change signals in observational records of hazards and exposure.
      </p>
      <p>
        In this module you'll learn how climate change contributes to extreme events and who is most affected by those. We'll then take a closer look at modelling aspects of crop failure and friver floods and discuss their reliabilty, uncertainties and limitations.
      </p>
    </section>
    <section>
      <LayoutScrollytelling/>
    </section>
  </div>
</template>

<script>
import LayoutScrollytelling from 'library/src/components/LayoutScrollytelling.vue'
export default {
  name: 'intro',
  components: {
    LayoutScrollytelling
  }
}
</script>
<style lang="scss" scoped>
@import "library/src/style/global.scss";
.intro {
  display: flex;
  align-items: center;
  flex-direction: column;
  section {
    h1 {
      margin-bottom: $spacing / 2;
    }

    + section {
      margin-top: $spacing;
    }

    p + p {
      margin-top: $spacing / 2;
    }
  }
  .layout-scrollytelling {
    width: 100vw;
  }
}
</style>
