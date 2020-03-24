<template>
  <div class="intro">
    <section class="wide">

      <!-- <p>
        The extent and impact of crop failures, river floods, tropical cyclones, heatwaves, wildfires, and droughts depend on the underlying meteorological, hydrological, or climatological events as well as on human factors such as land use, water and agricultural management, and population density. Historical variations in these human factors impede the detection of climate change signals in observational records of hazards and exposure.
      </p>
      <p>
        In this module you'll learn how climate change contributes to extreme events and who is most affected by those.
      </p> -->
    </section>
    <LayoutScrollytelling>
      <template v-slot:vis="{ width, height, step }">
        <VisExtremeEvents :width="width" :height="height" :step="step"/>
      </template>
      <template v-slot:text="{ width, height, step }">
        <section class="observers">
          <!-- <IntersectionObserverFracture class="io-0" :step="0" no-styling :style="{height: `${height}px`}">
            <span class="tiny">{{ step }}</span>
          </IntersectionObserverFracture> -->
          <IntersectionObserver class="io-0" :step="0" align="left" :class="{active: step === 0}">
            <p class="tiny">With <span class="highlight no-hover blue">no global warming</span> both land and population remain mostly unaffected by extreme events.</p>
          </IntersectionObserver>
          <IntersectionObserver class="io-1" :step="1" align="right" :class="{active: step === 1}">
            <p class="tiny"><span class="highlight no-hover yellow">Today</span> at a global warming level of <span class="highlight no-hover yellow">+1°C</span> the world population is 2.7 times more exposed and land is 2.5 times more affected.</p>
          </IntersectionObserver>
          <IntersectionObserver class="io-2" :step="2" align="left" :class="{active: step === 2}">
            <p class="tiny">This trend continues. At <span class="highlight no-hover orange">+1.5°C</span> 6% of the global land area will be affected by extreme events.</p>
          </IntersectionObserver>
          <IntersectionObserver class="io-3" :step="3" align="right" :class="{active: step === 3}">
            <p class="tiny">And at <span class="highlight no-hover red">+2°C</span> 14% of the todays population – about 1 billion people – would be exposed.</p>
          </IntersectionObserver>
          <IntersectionObserver class="io-4" :step="4" align="left">
            <span/>
          </IntersectionObserver>
        </section>
      </template>
    </LayoutScrollytelling>
    <section class="wide">
      <p>
        The extent and impact of crop failures, river floods, tropical cyclones, heatwaves, wildfires, and droughts depend on the underlying meteorological, hydrological, or climatological events as well as on human factors such as land use, water and agricultural management, and population density. Historical variations in these human factors impede the detection of climate change signals in observational records of hazards and exposure.
      </p>
      <p>
        In this module you'll learn how climate change contributes to extreme events and who is most affected by those.
      </p>
    </section>
    <LayoutScrollytelling class="full-width">
      <template v-slot:vis="{ width, height, step }">
        <VisSlope :width="width" :height="height" :step="step"
          :warming-level="warmingLevel" :dimension="dimension" :reference="reference"
          :indicator="indicator"
          :label-left="labelLeft.find ? labelLeft : [labelLeft]"
          :x-label-right="labelRight.find ? labelRight : [labelRight]"
          :label-right="fixedLabelsRight[indicator]"
          :colorize-by="colorizeBy"
          :all-labels="allLabels"/>
      </template>
      <template v-slot:text="{ width, height, step }">
        <section class="observers observers-options">
          <!-- <IntersectionObserverFracture class="io-0" :step="0" no-styling :style="{height: `${height}px`}">
            <span class="tiny">{{ step }}</span>
          </IntersectionObserverFracture> -->
          <IntersectionObserver class="io-1 options" :step="0" align="left" :class="{active: step === 0}">
            <div class="tiny">
              <div class="option">
                <span class="label">Warming Level</span>
                <SensesSelect :options="warmingLevels" v-model="warmingLevel"/>
              </div>
              <div class="option">
                <span class="label">Indicator</span>
                <SensesSelect :options="indicators" v-model="indicator"/>
              </div>
              <div class="option">
                <span class="label">Reference</span>
                <SensesSelect :options="references" v-model="reference"/>
              </div>
              <div class="option">
                <span class="label">Dimension</span>
                <SensesSelect :options="dimensions" v-model="dimension"/>
              </div>
              <div class="option">
                <span class="label">Labels Left</span>
                <SensesSelect :options="labelsLeft" v-model="labelLeft"/>
              </div>
              <div class="option">
                <span class="label">Labels Right</span>
                <SensesSelect :options="labelsRight" v-model="labelRight"/>
              </div>
              <div class="option">
                <span class="label">Colorize by</span>
                <SensesSelect :options="colors" v-model="colorizeBy"/>
              </div>
              <div class="option">
                <span class="label">All Labels</span>
                <SensesRadio :options="[true, false]" v-model="allLabels"/>
              </div>
            </div>
          </IntersectionObserver>
        </section>
      </template>
    </LayoutScrollytelling>
    <!-- <SensesMeta id="extreme-events"/> -->
  </div>
</template>

<script>
// import SensesMeta from 'library/src/components/SensesMeta.vue'
import LayoutScrollytelling from 'library/src/components/LayoutScrollytelling.vue'
import IntersectionObserver from 'library/src/components/IntersectionObserver.vue'
import SensesSelect from 'library/src/components/SensesSelect.vue'
// import IntersectionObserverFracture from 'library/src/components/IntersectionObserverFracture.vue'
import VisExtremeEvents from '@/components/VisExtremeEvents.vue'
import VisSlope from '@/components/VisSlope.vue'
import SensesRadio from 'library/src/components/SensesRadio.vue'
export default {
  name: 'intro',
  components: {
    LayoutScrollytelling,
    IntersectionObserver,
    // IntersectionObserverFracture,
    VisExtremeEvents,
    VisSlope,
    SensesSelect,
    SensesRadio
    // SensesMeta
  },
  data () {
    return {
      warmingLevel: 2,
      warmingLevels: [{
        label: '0.0°C',
        value: 0
      }, {
        label: '1.0°C',
        value: 1
      }, {
        label: '1.5°C',
        value: 1.5
      }, {
        label: '2.0°C',
        value: 2
      }],
      indicator: 'all-events',
      indicators: ['all-events', 'confined-events', 'extensive-events', 'crop-failure', 'drought', 'heatwave', 'river-flood', 'tropical-cyclone', 'wildfire'].map(i => ({ label: i.replace(/-/g, ' '), value: i })),
      references: [
        { label: 'population', value: 'population' },
        { label: 'population density', value: 'populationDensity' },
        { label: 'urbanization', value: 'urbanization' },
        { label: 'population growth', value: 'populationGrowth' },
        { label: 'gdp', value: 'gdp' },
        { label: 'gdp per capita', value: 'gdpPerCapita' },
        { label: 'hdi', value: 'hdi' },
        { label: 'co2', value: 'co2' }
      ],
      reference: 'gdpPerCapita',
      dimension: 'population',
      dimensions: ['population', 'land'],
      labelLeft: ['USA', 'CHN', 'DEU', 'JPN', 'GBR'],
      labelsLeft: [{
        label: 'None',
        value: []
      }, {
        label: 'Germany',
        value: 'DEU'
      }, {
        label: 'Top GDP',
        value: ['USA', 'CHN', 'DEU', 'JPN', 'GBR', 'IND']
      }, {
        label: 'Europe & Central Asia',
        value: ['Europe & Central Asia']
      }, {
        label: 'South Asia and East Asia & Pacific',
        value: ['South Asia', 'East Asia & Pacific']
      }, {
        label: 'USA & CAN & North America',
        value: ['USA', 'CAN', 'North America']
      }],
      fixedLabelsRight: {
        'all-events': ['KWT', 'QAT', 'LBR', 'ARE', 'CIV'],
        'confined-events': ['COM', 'FJI', 'PHL', 'SLB'],
        'extensive-events': ['KWT', 'QAT', 'LBR', 'ARE', 'CIV'],
        'crop-failure': ['PAK', 'NPL', 'IND', 'HND'],
        'drought': ['MAR', 'PSE', 'SYR', 'CYP'],
        'heatwave': ['KWT', 'QAT', 'LBR', 'ARE', 'CIV'],
        'river-flood': ['EGY', 'NLD', 'MMR', 'VNM', 'SSD'],
        'tropical-cyclone': ['COM', 'FJI', 'PHL', 'SLB'],
        'wildfire': ['BOL', 'SWZ', 'PSE', 'AGO']
      },
      labelRight: 'IND',
      labelsRight: [{
        label: 'None',
        value: []
      }, {
        label: 'India',
        value: 'IND'
      }, {
        label: 'CHN & JPN & KOR',
        value: ['CHN', 'JPN', 'KOR']
      }, {
        label: 'Middle East & North Africa and Sub-Saharan Africa',
        value: ['Middle East & North Africa', 'Sub-Saharan Africa']
      }, {
        label: 'USA & CAN & North America',
        value: ['USA', 'CAN', 'North America']
      }],
      colorizeBy: 'reference',
      colors: [
        'region', 'none', 'label-side', 'reference', 'indicator'
      ],
      allLabels: false
    }
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
    max-width: calc(768px + #{$spacing});

    &.full-width {
      max-width: none;
    }
  }
  .observers {
    margin-top: $spacing * 2;
    .intersection-observer {
      padding: 0;
      opacity: 0;
      pointer-events: none;
      transition: opacity $transition;
      // height: 50vh;
      margin: 0 $spacing / 2;

      &.active {
        opacity: 1;
        pointer-events: all;
      }

      &.io-0 {
        margin-top: 50vh;
        padding-top: 20vh;
      }

      &.io-1 {
        padding-top: 20vh;
      }

      &.io-2 {
        padding-top: 10vh;
        padding-bottom: 10vh;
      }

      &.io-3 {
        padding-top: 25vh;
        // margin-bottom: -5vh;
      }

      &.io-4 {
        height: 50vh;
        // margin-bottom: 50vh;
      }

      > div {
        width: 50%;
      }

      p {
        width: 300px;
        // max-width: calc(50vw - #{$spacing * 2.5});
        // width: 50%;
        position: relative;
      }
    }

    &.observers-options {
      width: 100vw;
      .options {

        align-self: center;
        .option {
          display: flex;
          justify-content: space-between;
          padding-bottom: $spacing / 4;
          .label {
            padding-right: $spacing / 2;
          }
          &:last-of-type {
            padding: 0;
          }
        }
      }
    }
  }
}
</style>
