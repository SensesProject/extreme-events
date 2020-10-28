+++ intro 0

# Extreme Events

With an increase in global mean temperatures, extreme events like droughts, floods, and heatwaves become more frequent and severe.

+++ intro 1

At +2\,°C global warming, @yellow(heatwaves) affect substantial portions of the world's land surface.

+++ intro 2

Coastal regions – some of them densely populated – are increasingly exposed to @neon(tropical cyclones).

+++ intro 3 [<- raus werfen, oder?]

And certain areas [TODO double check this] heavily reliant on agriculture will suffer more and more from @orange(crop failure).

+++ intro-module

In this module, we take a global perspective focussing less on spatial distributions but on the general relationship between rising temperatures and the exposure of land and population to extreme events. 

We explore six types of extreme events, namely glyph(crop-failure) crop failure, glyph(drought) droughts, glyph(heatwave) heatwaves, glyph(river-flood) river floods, glyph(tropical-cyclone) tropical cyclones and glyph(wildfire) wildfires. Furthermore, we discuss the uncertainty in these extreme event projections. This module is based on [Referenz S. Lange et al, 2020]

+++ dist-intro

## Climate Change, Impacts, and Extreme Events

Changes and effects that occur in natural or societal systems and are due to climate change are known as *climate impacts*. Examples of this are the bleaching of coral riffs due to the acidification of oceans, crop failures due to excessive heat or lack of precipitation, or a decreased work productivity of humans. In climate impact research, these systems are called *sectors*. Examples include agriculture, forestry, and human health. New meteorological extremes lead to new extremes in climate impacts. In particular shifts in the spatial and temporal distributions as well as in the events' magnitude are projected. [TODO: clearer distinction between climate impacts and extreme events]

+++ dist 1.1

Temperature is a major driver for many extreme events. Here we show the distribution of days, say within a year, with a certain temparature. 

+++ dist 1.2
In this illustration, the horizontal axis shows the temperature while the vertical axis shows the number of days, again within a year, at a given temperature. 

+++ dist 1.3
Technically, extreme events are the events that lie at both the lower and the higher tail ends of a distribution. In this case, when temperatures are especially @blue(cold) or @orange(hot). As the distribution shows, this is relatively rare. The depicted shape is known as the *normal distribution.* Please be aware that not all meteorological quantities, e.g. precipitation, follow a normal distribution.

+++ dist 2

Under climate change, the mean temperature rises and shifts the distribution to the right. Temperatures that have been rare in the past occur now @orange(much more frequently) and @red(even higher values) are reached.

+++ dist 3

Additionally, the *variance* increases: Average temperatures become less frequent, and the distribution spreads out.

+++ dist 4

Both trends put together means hot temperatures become even more @orange(frequent) and @red(extreme). While @blue(cold temperatures) still occur, they do so less frequently. [IPCC, (2011) muss noch nirgendwo hin]

+++ cat-intro

To investigate impacts and extreme events under a changing climate, researchers use computer programs that implement the most important processes in a sector and drive them with climate data as the input. For more details on this see the [impact modelling learn module](TODO link to impact learn module).

The impact projections used here originate from the [ISIMIP project](https://www.isimip.org) – a collection of impact model simulations driven with the same climate and socioeconomic input data, thus allowing for cross-model and cross-sector analyses. 

Here the thresholds of what constitutes an extreme event are defined mostly in terms of the preindustrial climate. This approach allows both to show what climate impacts have already occurred as well as to investigate future global warming. In the following, we discuss the findings for each type of extreme event separately.

[Ja, lass die Definitionen nochmal reinpacken, aber zum ausklappen für die die es genau wissen wollen /
OK, wir müssen die Definitionen sowieso bringen, da wir in SENSES Earth nur die Landflächendefinitionen bringen, aber nicht die für die exponierte Bevölkerung, ich habe sie unten eingefügt]

+++ cat-exposure 1

## Exposure to Extreme Events

We discuss extreme events along two dimensions: The global share of {ice-free land}(The global land surface with the exception of Greenland and Antarctica.) as well as the global share of {population}(Based on total population and population distribution from 2005) exposed to them every year. The exact definitions of those dimensions varies between extreme event types and can be found at the start of each section.

+++ cat-heatwave-title

## Heatwaves glyph(heatwave)

+++ cat-heatwave-definition

### Land area

Area where both, a relative indicator based on temperature (Russo et al., 2015, 2017) and an absolute indicator based on temperature and relative humidity (Masterton & Richardson, 1979) exceed their respective threshold value.

### Population

Total population of exposed land area.

+++ cat-heatwave 0°C

At a preindustrial warming level of @blue(+0\,°C), only a relatively small fraction of the global area is at least once a year exposed to heatwaves. These regions tend to be more densely populated leading to a slightly higher share in the exposed population.

+++ cat-heatwave 1°C

At @yellow(+1\,°C), which roughly translates to todays climate, there's already a more than threefold increase in both, land area and population exposed.

+++ cat-heatwave 2°C

At @red(+2\,°C) almost a tenth of the global population is exposed to heatwaves every year.

This is particularly alarming as we define heatwave in terms of human physiology. The chosen threshold, a {Humidex}(A measure of how the human body reacts to atmospheric conditions.) of 45, is described as «dangerous» and «heatstrokes are possible».

+++ cat-heatwave 1.5°C

Limiting global warming to @orange(+1.5\,°C), as pursued by the Paris Agreement, will help us keep the number of affected people low.

+++ cat-heatwave spread

So far, we looked at highly aggregated data. The calculated exposure to extreme events varies across regions and years, but also across models. Heatwaves are directly derived from climate model data, looking at the output of the {four models}(From left to right: GFDL-ESM2M, HadGEM2-ES, IPSL-CM5A-LR, and MIROC5) individually instead of median values we get a better understanding of model uncertainty.

+++ cat-drought-title

## Droughts glyph(drought)

+++ cat-drought-definition

### Land area

Area where soil moisture falls below the 2.5th percentile of preindustrial values for at least 7 consecutive months.

### Population

Rural population (Klein Goldewijk et al., 2017) of exposed land area.

+++ cat-drought spread

In the case of droughts, the output of the {four climate models}(depicted as columns) is then processed by {eight hydrological models}(depicted as dots; their median as lines). The large spread across these impact models shows the uncertainty in drought projections. Still, all impact models {but one}(The hydrological model H08 projects a decrease in drought exposure for two climate models) project increasing exposure for all climate models.

+++ cat-drought median

In terms of median results, we see a twofold increase in exposed land from @blue(preindustrial levels) to @red(+2\,°C), but only a moderate increase in exposed population. This reflects that about half of the global population lives in urban areas and is not directly affected by droughts.

Both, heatwaves and droughts, count as extensive events, meaning the potentially exposed land area is not confined by {non-climate related factors}(e.g., land use or topography). Therefore, the share of exposed land area is also the heighest for those two events.

+++ cat-crop-failure-title

## Crop Failure glyph(crop-failure)

+++ cat-crop-failure-definition

### Land area

Area where yields of {considered crops}(maize, wheat, soybean, and rice) fall short of the 2.5th percentile of preindustrial yields.

### Population

Population employed in agricualture in exposed land area.

+++ cat-crop-failure 1

In contrast, crop failure is confined to crop land. While there is no substential change in exposure at @yellow(+1\,°C), the incresase in exposed land becomes apparent at @orange(+1.5\,°C) and for exposed population there's a substential increase at @red(+2\,°C)

+++ cat-crop-failure 2

In @blue(preindustrial) climate exposure is generally low and all climate and impact model combinations return quite consistent results.

+++ cat-crop-failure 3

At @red(+2\,°C) the models draw a less uniform picture. Most notably, the climate model {GFDL-ESM2M}(First column from the left.) projects significantly higher exposure for land and population.

Apart from the uncertainties in the modeling chain, there is another effect that contributes to uncertainties in crop modelling: So far we don’t know exactly to what magnitude the CO₂ fertilization amounts, and furthermore some leeway exists in associating a CO₂ concentration to a particular global warming level.

+++ cat-river-flood-title

## River Floods glyph(river-flood)

+++ cat-river-flood-definition

### Land area

Flooding is assumed to occur wherever daily {discharge}(precipitation and runoff) exceeds the preindustrial 100-year return level.

### Population

Total population of exposed land area.

+++ cat-river-flood 1

River flood projections across impact models are rather concise with most of the uncertainty resulting from climate models which are known to show poor performance when it comes to reproducing extreme precipitation events.

+++ cat-river-flood 2

The exposure to river floods for both, land area and population, largely depends flood protection measures. The projections assume a flood protection level capable of withholding floods over 100 years in preindustrial conditions. However, assuming this globally is rather optimistic. When looking at the FLOPROS (Scussolini, 2016) database, one can see by far the {largest parts of the world do not reach such protection levels}(Only Australia, Germany, India, Netherlands, Poland, UK, USA, and a few other countries reach or exceed a 100-year flood protection level.). 

+++ cat-tropical-cyclone-title

## Tropical Cyclones glyph(tropical-cyclone)

+++ cat-tropical-cyclone-definition

### Land area

Area exposed to 1-minute sustained {hurricane-force winds}(at least 64 kt) at least once a year; information required about wind fields is derived from center location and minimum pressure / maximum wind speed (Emanuel, 2013; Geiger et al., 2018).

### Population

Total population of exposed land area.

+++ cat-tropical-cyclone 1

Some of the regions most exposed to tropical cyclones are densely populated. At higher warming levels, the leaves a considerable share of the gloabl population exposed. 

Exposure projections for tropical cyclones are rather conservative, as we only consider the hurricane-force winds but neither storm surges nor heavy precipitation, both typically co-occuring phenomena in a tropical cyclone.

+++ cat-tropical-cyclone 2

In contrast to the earlier examples, projections for tropical cyclones are driven by a single impact model. However, for every climate model and warming level 100 runs of possible tropical cyclones were executed. Unsuprisingly, these runs project similar outcomes. Again, we can mostly attribute the apparent variance to the climate models.

+++ cat-wildfire-title

## Wildfire glyph(wildfire)

+++ cat-wildfire-definition

### Land area

Annual aggregate of monthly burned land area simulated by global vegetation models.

### Population

Total population of burned land area.

+++ cat-wildfire 1

For wildfire, discrepancies across climate models are almost neglectable. However {two of the impact models}(ORCHIDEE and VISIT) produce vastly different results. This is due to {diverging approaches to vegetation modelling}(See [TODO reference to paper supplement, page X-7] for details).

+++ cat-wildfire 2

[not sure if we need this one, *it looks quite boring*]

+++ conclusion

## Conclusion

When interpreting projections of extreme events we may take different perspectives. In this module we looked into the global exposure of land area and population and at the variance and uncertainty across climate and impact models. 

Uncertainties originate from various stages in the modelling chain, but also from:

- a lack of understanding in {some physical processes}(e.g. the CO₂ fertilization effect)
- limitations of exposure measures
- limitations of extreme event definitions
- {adaptation efforts}(e.g. the flood protection level)
- omitted effects of socio-economic development

Still, the overall picture remains clear and allows for definite statements:

- climate change already led to increased exposure to extreme events
- further climate change will excacerbate that
- the difference between a @orange(+1.5\,°C) and a @red(+2\,°C) world can be severe

Visit [SENSES Earth](/earth) to explore spatial variance and [ISIpedia](https://demo.isipedia.org/topics/extreme-events/) for country-level perspective on extreme events. Read the [Lange et al. paper]([tbd]) on which this module is based on or learn about the particularities of impact modelling with the [example of modelling river floods](/river-floods).