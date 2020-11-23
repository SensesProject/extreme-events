const fs = require('fs')

// const countries = fs.readdirSync('./data/ISIpedia').filter(f => f !== '.DS_Store').filter(c =>
//   require(`./data/ISIpedia/${c}/drought-population.json`).data.overall.median[0] != null
// )
// const skipped = fs.readdirSync('./data/ISIpedia').filter(f => f !== '.DS_Store').filter(c =>
//   require(`./data/ISIpedia/${c}/drought-population.json`).data.overall.median[0] == null
// )
// console.log(skipped)
const countries = ['world']
const data = {}

const indicators = ['all-events', 'confined-events', 'extensive-events', 'crop-failure', 'drought', 'heatwave', 'river-flood', 'tropical-cyclone', 'wildfire']
const warminglevels = [0, 1, 1.5, 2, 3]

countries.forEach(c => {
  // const { name, stats } = require(`./data/ISIpedia/${c}/country.json`)
  data[c] = {
    // stats: {
    //   name,
    //   population: +stats.find(d => d.type === 'POP_TOTL').value,
    //   populationDensity: +stats.find(d => d.type === 'POP_DNST').value,
    //   urbanization: +stats.find(d => d.type === 'URB_POP_PRCT').value,
    //   populationGrowth: +stats.find(d => d.type === 'POP_GROWTH').value,
    //   gdp: +stats.find(d => d.type === 'GDP').value / 1000,
    //   gdpPerCapita: +stats.find(d => d.type === 'GDP').value / +stats.find(d => d.type === 'POP_TOTL').value,
    //   hdi: +stats.find(d => d.type === 'HDI').value,
    //   co2: +stats.find(d => d.type === 'CO2_EM').value
    // }
  }
  indicators.forEach(i => {
    if (
      !fs.existsSync(`./data/extreme-events/${i}-population.json`) ||
      !fs.existsSync(`./data/extreme-events/${i}-land.json`)
    ) return
    const temperatureList = require(`./data/extreme-events/${i}-population.json`).temperature_list
    const population = require(`./data/extreme-events/${i}-population.json`).data
    const land = require(`./data/extreme-events/${i}-land.json`).data
    data[c][i] = {
      population: {},
      land: {}
    }
    warminglevels.forEach((t) => {
      const wl = temperatureList.indexOf(t)
      data[c][i].population[t] = {
        median: format(population.overall.median[wl]),
        cm: Object.fromEntries(Object.keys(population).filter(cm => cm !== 'overall').sort().map(cm => {
          return [
            cm,
            {
              median: format(population[cm].median[wl]),
              im: Object.fromEntries(Object.keys(population[cm].runs).map(im => [im, format(population[cm].runs[im].mean[wl])]))
            }
          ]
        }))
      }
      data[c][i].land[t] = {
        median: format(land.overall.median[wl]),
        cm: Object.fromEntries(Object.keys(land).filter(cm => cm !== 'overall').sort().map(cm => {
          return [
            cm,
            {
              median: format(land[cm].median[wl]),
              im: Object.fromEntries(Object.keys(land[cm].runs).map(im => [im, format(land[cm].runs[im].mean[wl])]))
            }
          ]
        }))
      }
    })
  })
})

fs.writeFileSync('../src/assets/data/detail.json', JSON.stringify(data))
// fs.writeFileSync('./data/detail.json', JSON.stringify(data, null, 2))

function format (val) {
  if (val == null) return null
  return +(val * 1).toFixed(4)
}
