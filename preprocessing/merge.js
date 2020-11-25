const fs = require('fs')

// const countries = fs.readdirSync('./data/ISIpedia').filter(f => f !== '.DS_Store').filter(c =>
//   require(`./data/ISIpedia/${c}/drought-population.json`).data.overall.median[0] != null
// )
const countries = ['world']
const data = {}

const indicators = ['all-events', 'confined-events', 'extensive-events', 'crop-failure', 'drought', 'heatwave', 'river-flood', 'tropical-cyclone', 'wildfire']
const warminglevels = [0, 1, 1.5, 2, 3]

countries.forEach(c => {
  data[c] = {}
  indicators.forEach(i => {
    if (
      !fs.existsSync(`./data/temp/${i}-population.json`) ||
      !fs.existsSync(`./data/temp/${i}-land.json`)
    ) return
    const temperatureList = require(`./data/temp/${i}-population.json`).temperature_list
    const population = require(`./data/temp/${i}-population.json`).data
    const land = require(`./data/temp/${i}-land.json`).data
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

fs.writeFileSync('../src/assets/data/world.json', JSON.stringify(data))
// fs.writeFileSync('./data/world.json', JSON.stringify(data, null, 2))

function format (val) {
  if (val == null) return null
  return +(val * 1).toFixed(4)
}
