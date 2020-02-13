<template>
  <div class="intro">
    <section class="wide">
      <h1 class="serif">Extreme Events</h1>
      <p>
        The extent and impact of crop failures, river floods, tropical cyclones, heatwaves, wildfires, and droughts depend on the underlying meteorological, hydrological, or climatological events as well as on human factors such as land use, water and agricultural management, and population density. Historical variations in these human factors impede the detection of climate change signals in observational records of hazards and exposure.
      </p>
      <p>
        In this module you'll learn how climate change contributes to extreme events and who is most affected by those. We'll then take a closer look at modelling aspects of crop failure and friver floods and discuss their reliabilty, uncertainties and limitations.
      </p>
    </section>
    <LayoutScrollytelling>
      <template v-slot:vis="{ width, height, step }">
        <VisDumbbell :width="width" :height="height" :step="step"/>
      </template>
      <template v-slot:text="{ width, height, step }">
        <section>
          <IntersectionObserver :step="0">
            <h2>Land</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </IntersectionObserver>
          <IntersectionObserver :step="1">
            <h2>Population</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </IntersectionObserver>
          <IntersectionObserver :step="2">
            <h2>Shading</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </IntersectionObserver>
          <IntersectionObserver :step="3">
            <h2>Countries</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </IntersectionObserver>
          <IntersectionObserverFracture :step="3" no-styling style="height: 9504px">
            <!-- <h2>{{ step }}</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> -->
          </IntersectionObserverFracture>
          <IntersectionObserver :step="4">
            <h2>{{ step }}</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </IntersectionObserver>
        </section>
      </template>
    </LayoutScrollytelling>
  </div>
</template>

<script>
import LayoutScrollytelling from 'library/src/components/LayoutScrollytelling.vue'
import IntersectionObserver from 'library/src/components/IntersectionObserver.vue'
import IntersectionObserverFracture from 'library/src/components/IntersectionObserverFracture.vue'
import VisDumbbell from '@/components/VisDumbbell.vue'
export default {
  name: 'intro',
  components: {
    LayoutScrollytelling,
    IntersectionObserver,
    IntersectionObserverFracture,
    VisDumbbell
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
