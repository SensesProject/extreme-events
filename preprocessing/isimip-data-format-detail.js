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
const warminglevels = [0, 0.5, 1, 1.5, 2]

countries.forEach(c => {
  const { name, stats } = require(`./data/ISIpedia/${c}/country.json`)
  data[c] = {
    stats: {
      name,
      population: +stats.find(d => d.type === 'POP_TOTL').value,
      populationDensity: +stats.find(d => d.type === 'POP_DNST').value,
      urbanization: +stats.find(d => d.type === 'URB_POP_PRCT').value,
      populationGrowth: +stats.find(d => d.type === 'POP_GROWTH').value,
      gdp: +stats.find(d => d.type === 'GDP').value / 1000,
      gdpPerCapita: +stats.find(d => d.type === 'GDP').value / +stats.find(d => d.type === 'POP_TOTL').value,
      hdi: +stats.find(d => d.type === 'HDI').value,
      co2: +stats.find(d => d.type === 'CO2_EM').value
    }
  }
  indicators.forEach(i => {
    if (
      !fs.existsSync(`./data/ISIpedia/${c}/${i}-population.json`) ||
      !fs.existsSync(`./data/ISIpedia/${c}/${i}-land.json`)
    ) return
    const population = require(`./data/ISIpedia/${c}/${i}-population.json`).data
    const land = require(`./data/ISIpedia/${c}/${i}-land.json`).data
    data[c][i] = {
      population: {},
      land: {}
    }
    warminglevels.forEach((t, wl) => {
      data[c][i].population[t] = {
        median: format(population.overall.median[wl]),
        cm: Object.fromEntries(Object.keys(population).filter(cm => cm !== 'overall').map(cm => {
          return [
            cm,
            {
              median: format(population[cm].median[wl]),
              im: Object.keys(population[cm].runs).map(im => format(population[cm].runs[im].mean[wl]))
            }
          ]
        }))
      }
      data[c][i].land[t] = {
        median: format(land.overall.median[wl]),
        cm: Object.fromEntries(Object.keys(land).filter(cm => cm !== 'overall').map(cm => {
          return [
            cm,
            {
              median: format(land[cm].median[wl]),
              im: Object.keys(land[cm].runs).map(im => format(land[cm].runs[im].mean[wl]))
            }
          ]
        }))
      }
    })
  })
})

fs.writeFileSync('./data/detail.json', JSON.stringify(data, null, 2))

function format (val) {
  return +(val * 1).toFixed(4)
}
