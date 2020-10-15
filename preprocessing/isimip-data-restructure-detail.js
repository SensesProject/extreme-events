const rimraf = require('rimraf')
const fs = require('fs')
rimraf.sync('./data/extreme-events')
fs.mkdirSync('./data/extreme-events')

const countries = ['world']
// countries.forEach(c => fs.mkdirSync(`./data/extreme-events/${c}`))

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
            `./data/extreme-events/${i}-population.json`,
            err => err ? reject(err) : resolve()
          )
        }),
        new Promise((resolve, reject) => {
          fs.copyFile(
            `./data/global_exposure/${i}/wld/land-area-exposed-to-${i}_future-projections_versus-temperature-change_WLD.json`,
            `./data/extreme-events/${i}-land.json`,
            err => err ? reject(err) : resolve()
          )
        })
      )
    }
  })
  return countryCopies
}).flat()

Promise.all(copies).then(() => console.log('copied ✨')).catch(reason => console.log(reason))
//   let downloads = countries.map(c => client.fastGet(`${path}/country_data/${c}/${c}_general.json`, `./data/ISIpedia/${c}/country.json`))

//   indicators.forEach(i => {
//     countries.forEach(c => {
//       const popPath = `${path}/${i}/ISIMIP-projections/${c}/population-exposed-to-${i}_ISIMIP-projections_versus-temperature-change_${c}.json`
//       downloads.push(client.fastGet(popPath, `./data/ISIpedia/${c}/${i}-population.json`))
//       const landPath = `${path}/${i}/ISIMIP-projections/${c}/land-area-affected-by-${i}_ISIMIP-projections_versus-temperature-change_${c}.json`
//       downloads.push(client.fastGet(landPath, `./data/ISIpedia/${c}/${i}-land.json`))
//     })
//   })

//   Promise.all(downloads).then(() => client.end())
// }).catch(err => {
//   console.log(err, 'catch error')
// })
