e+++ intro 0

# Extreme Events Under Climate Change

Climate change with its rising temperatures has many impacts on nature and society. While we observe a rising mean temperature we also observe changes in the occurrence, frequency and intensity of extreme events.

+++ intro 1

In this module we learn about extreme event under climate change and begin to explore extreme event projections that are based on data collected under the umbrella of the [ISIMIP project](https://www.isimip.org/).

+++ intro 2

The rotating globe shows such a projection for @yellow(heatwaves). However, unlike i that depictions we here boil the spatial patterns down to global averages. [TODO tweak the following sentence]

+++ intro 3

The focus of this learn module is on the relationship between a rising global mean temperature and the spatial distribution of extreme events as well on the uncertainty in these extreme event projections.

+++ dist-intro

## Extreme events and climate change: The example of temperature
In the example here we show the typical distribution of temperatures (the daily average temperatures). When we put these temperatures on the horizontal axis, and plot the number of days, that feature that temperature within a year on the vertical axis, we obtain the shown plot. This plot shows how the temperatures are distributed over the course of a year, and fittingly such a plot is known as a i"distribution". The distribution shown here is know as the ["normal distribution"](https://en.wikipedia.org/wiki/Normal_distribution). While for instance the daily average temperature or the daily air pressure follow this type of distribution, not all meteorological quantities do. An example of a quantity following a different distribution is the daily precipitation. Still, temperature and the normal distribution are useful example when discussing extreme events.

+++ dist 1

Technically, extreme events are events that lie at both the lower and the higher tail ends of a distribution. One can see that while the number of days at a given point that feature the average temperature is the largest, the really high or low temperatures occur only on very few days. So extreme events have two properties: They feature the most extreme values, i.e. the highest or the lowest observed values, and they are rare.

+++ dist 2

A normal distribution is characterized by two numbers, its "mean" (μ, pronunciation "myu"), i.e. the temperature that occurs most often, and its "variance" (σ pronunciation "sigma"), the width of the distribution. Climate change generally changes both of these values, so, while the distribution is shifted to the right (increased "mean"), it is also stretched (increased "sigma").

+++ dist 3

We can see that in the distribution that has undergone climate change temperatures that have been extreme and rare in the past, occur now much more frequently (light red) and even @red(higher temperatures) are reached (dark red). 

+++ dist 4

The former extreme events turn into the new normal. At the same time, since the new distribution has a larger variance, cold days (light blue area) still occur. So cold days don't mean that climate change has not happened.

+++ cat-intro

## Impact of climate change and impact models
Changes and effects that occur in natural or societal systems and are due to climate change are knows as "climate impacts". Examples of this are the bleaching of coral riffs due to the acidification of oceans, crop failures due to excessive heat or droughts, or a decreased work productivity of humans. In climate impacts research these systems are knows as "sectors". Examples are agriculture, forestry or human health.
New meteorological extremes, as discussed in the previous section, lead to new extremes in climate impacts. In particular shifts in the spatial and temporal distributions as well as in the events' magnitude are projected.

In order to investigate impacts under a changing climate, researchers use computer programs that implement the most important processes in a sector and drive them with climate data as the input. For more details on this see the [impact modelling learn module](TODO link to impact learn module).

## Climate projection used in this learn module
As mentions previously, the impact projections used here originate from the ISIMIP project. This is a large collection of impact model simulations that were driven with the same input, both regarding the climate and socioeconomics and thus allow for a cross model/cross sector analysis. This analysis covers six types of extreme events: 

glyph(tropical-cyclone) tropical cyclone  
glyph(river-flood) river flood  
glyph(crop-failure) crop failure  
glyph(wildfire) wildfire  
glyph(drought) drought  
glyph(heatwave) heatwave

In order to not only look at future global warming but also at the climate change that has already occurred, the thresholds of what constitutes an extreme event have been (mostly) defined in terms of the preindustrial climate, i.e. the climate that has not been influenced by anthropogenic green house gas emissions. For the exact definitions we refer to the descriptions in the [SENSES Earth](/earth) module which gives access to the full data set. (TODO, oder die Definitionen hier doch nochmal hinpacken?). In the following we discuss the findings for each type of extreme event separately. 

+++ categories crop-failure 0

## Crop Failure glyph(crop-failure)

The plots on the right show what percentage of the land area (excluding Greenland and Antarctica) are affected by crop failure [TODO once a year?]. The crops considered here are corn [TODO maize], rice, soy and wheat. In order to arrive at these projections, yield projections, i.e. how much of a crop can be harvested on a hectare land were combined with landuse projections, i.e. where is the crop even cultivated. [TODO vielleicht Referenzen einführen] For the definition of a drought please refer to [SENSES Earth](/earth). 

+++ categories crop-failure 1

### Crop failure at 1.0 °C
Overall, we see no increase in the land area exposed to crop failure at 1.0 °C (look at the "1.0×"). Currently we have experienced about 1.2 °C global warming compared to the preindustrail climate, so 1.0 °C roughly describes the current world. However, this is due to the fact that the changes projected from the four climate models average out. If we look at the output according to the climate model that has driven it (in the plot on the right the columns of single points from left to right: GFDL-ESM2M, HadGEM2-ES, IPSL-CM5A-LR and  MIROC5) we can see that while for instance HadGEM2-ES projects a slight decrease, GFDL-ESM2M, on the other hand, projects an increase. This shows that models might differ even in the sign of the projected changes. Similarly, results obtained from the same climate model, but from different impact models, might exhibit a significant range, i.e. uncertainty. In the current case, the models' spread, when driven by GFDL-ESM2M is larger than the one obtained by going with HadGEM2-ES.

+++ categories river-flood 2

In order to quantify the effects on the population, we have also overlaid the exposed land area maps with population data. More specifically, we used a population map of 2005. We kept the population constant in order to concentrate on the pure climate change effect instead of changing population patterns. With respect to the population, we see that already in the current world, again under the assumption of a 2005 population distribution, there is an increase in the number of people exposed to crop failure (×1.2). Again, there is a clear difference in the projections from the four GCMs. As before, HadGEM2-ES and GFDL-ESM2M based projections show essentially no increase while the IPSL-CM5A-LR based projections project the largest increase. And within the projections from a single GCM, we again see models spreads. For instance, in the case of IPSL-CM5-ES driven models, the individual impacts models project and increase between [TODO auf fertige plots warten.]

+++ categories river-flood 3

### Crop failure at 2.0 °C
We just saw, that across all models there was no increase in the area exposed to crop failure. At 2 °C, however, there is an increase in the projections. Across all GCM/impact models combinations an 1.7 fold increase is projected. Qualitatively the results show the same behavior as in the case of a 1 °C world. Just like before we see the lowest increase in the projections driven by GFDL-ESM2M and HadGEM2-es, while GFDL-ESM2M projections give the largest ones. Similarly, there are quite some deviations within the projections driven by a single GCM. However, compared to 1 °C world the spreads have markedly increased.

Similar to the case of the exposed land area, the spread in the 2 °C projections is much larger than the spread in the 1 °C projections, meaning that there is increased uncertainty in the projection for this higher warming level..

+++ categories wildfire

## Wildfire glyph(wildfire)

Sich in einer Stadt nicht zurechtfinden heißt nicht viel. In einer Stadt sich aber zu verirren, wie man in einem Walde sich verirrt, braucht Schulung. Da müssen Straßennamen zu dem Irrenden so sprechen wie das Knacken trockner Reiser und kleine Straßen im Stadtinnern ihm die Tageszeiten so deutlich wie eine Bergmulde widerspiegeln.

+++ categories tropical-cyclone

## Tropical Cyclone glyph(tropical-cyclone)

Diese Kunst habe ich spät erlernt; sie hat den Traum erfüllt, von dem die ersten Spuren Labyrinthe auf den Löschblättern meiner Hefte waren. Nein, nicht die ersten, denn vor ihnen war das eine, welches sie überdauert hat.

+++ categories crop-failure

## River Flood glyph(river-flood)

Der Weg in dieses Labyrinth, dem seine Ariadne nicht gefehlt hat, führte über die Bendlerbrücke, deren linde Wölbung die erste Hügelflanke für mich wurde. Unweit von ihrem Fuße lag das Ziel: der Friedrich Wilhelm und die Königin Luise. Auf ihren runden Sockeln ragten sie aus den Beeten wie gebannt von magischen Kurven, die ein Wasserlauf vor ihnen in den Sand schrieb.

+++ categories drought

## Drought glyph(drought)

Lieber als an die Herrscher wandte ich mich aber an ihre Sockel, weil, was darauf vorging, wenn auch undeutlich im Zusammenhange näher im Raum war. Daß es mit diesem Irrgang etwas auf sich hat, erkannte ich seit jeher an dem breiten, banalen Vorplatz, der durch nichts verriet, daß hier, nur wenige Schritte von dem Korso der Droschken und Karossen abgelegen, der sonderbarste Teil des Parkes schläft.

+++ categories heatwave

## Heatwave glyph(heatwave)

Davon empfing ich schon sehr früh ein Zeichen. Hier nämlich oder unweit muß ihr Lager jene Ariadne abgehalten haben, in deren Nähe ich zum ersten Male, und um es nie mehr zu vergessen, das begriff, was mir als Wort erst später zufiel: Liebe. Doch gleich an seiner Quelle taucht das »Fräulein« auf, das sich als kalter Schatten auf sie legte.

+++ conclusion

## Conclusion

Und so war dieser Park, der wie kein anderer den Kindern offen scheint, auch sonst für mich mit Schwierigem, Undurchführbarem verstellt. Wie selten unterschied ich die Fische im Goldfischteich. Wie viel versprach die Hofjägerallee mit ihrem Namen und wie wenig hielt sie.

Wie oft suchte ich das Gebüsch umsonst, in dem mit roten, weißen, blauen Türmchen ein Kiosk im Stil der Ankersteinbaukästen stand. Wie hoffnungslos kehrt mit jedem Frühling meine Liebe zum Prinzen Louis Ferdinand zurück, zu dessen Füßen die ersten Krokus und Narzissen standen. Ein Wasserlauf, der mich von ihnen trennte, machte sie mir so unberührbar, als wenn sie unter einem Glassturz gestanden hätten.