const rimraf = require('rimraf')
const fs = require('fs')
rimraf.sync('./data/temp')
fs.mkdirSync('./data/temp')

const countries = ['world']
// countries.forEach(c => fs.mkdirSync(`./data/temp/${c}`))

const indicators = ['crop-failure', 'drought', 'heatwave', 'river-flood', 'tropical-cyclone', 'wildfire']

const copies = countries.map(c => {
  const countryCopies = []
  indicators.forEach(i => {
    if (
      fs.existsSync(`./data/global_exposure/${i}/wld/population-exposed-to-${i}_future-projections_versus-temperature-change_WLD.json`) &&
      fs.existsSync(`./data/global_exposure/${i}/wld/land-area-exposed-to-${i}_future-projections_versus-temperature-change_WLD.json`)
    ) {
      countryCopies.push(
        new Promise((resolve, reject) => {
          fs.copyFile(
            `./data/global_exposure/${i}/wld/population-exposed-to-${i}_future-projections_versus-temperature-change_WLD.json`,
            `./data/temp/${i}-population.json`,
            err => err ? reject(err) : resolve()
          )
        }),
        new Promise((resolve, reject) => {
          fs.copyFile(
            `./data/global_exposure/${i}/wld/land-area-exposed-to-${i}_future-projections_versus-temperature-change_WLD.json`,
            `./data/temp/${i}-land.json`,
            err => err ? reject(err) : resolve()
          )
        })
      )
    }
  })
  return countryCopies
}).flat()

Promise.all(copies).then(() => console.log('copied ✨')).catch(reason => console.log(reason))
