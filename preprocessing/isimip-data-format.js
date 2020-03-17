const fs = require('fs')

const countries = fs.readdirSync('./data/ISIpedia').filter(f => f !== '.DS_Store').filter(c =>
  require(`./data/ISIpedia/${c}/drought-population.json`).data.overall.median[0] != null
)
// const skipped = fs.readdirSync('./data/ISIpedia').filter(f => f !== '.DS_Store').filter(c =>
//   require(`./data/ISIpedia/${c}/drought-population.json`).data.overall.median[0] == null
// )
// console.log(skipped)
const data = {}

const indicators = ['all-events', 'confined-events', 'extensive-events', 'crop-failure', 'drought', 'heatwave', 'river-flood', 'tropical-cyclone', 'wildfire']
const temperatures = [0, 0.5, 1, 1.5, 2]

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
    const population = require(`./data/ISIpedia/${c}/${i}-population.json`).data.overall
    const land = require(`./data/ISIpedia/${c}/${i}-land.json`).data.overall
    data[c][i] = {
      population: {},
      land: {}
    }
    temperatures.forEach((t, index) => {
      data[c][i].population[t] = // [
        // +population.shading_lower_border[index].toFixed(2),
        +population.median[index].toFixed(2)
        // +population.shading_upper_border[index].toFixed(2)
      // ]
      data[c][i].land[t] = // [
        // +land.shading_lower_border[index].toFixed(2),
        +land.median[index].toFixed(2)
        // +land.shading_upper_border[index].toFixed(2)
      // ]
    })
  })
})

fs.writeFileSync('./data/countries.json', JSON.stringify(data))
