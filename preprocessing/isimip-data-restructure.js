const rimraf = require('rimraf')
const fs = require('fs')
rimraf.sync('./data/ISIpedia')
fs.mkdirSync('./data/ISIpedia')

const all = fs.readdirSync('./data/cube-old/all-events/future-projections')

const cd = fs.readdirSync('./data/cube-old/country_data').filter(c => {
  return fs.existsSync(`./data/cube-old/country_data/${c}/${c}_general.json`)
})

const countries = [...[...new Set([...cd, ...all])].filter(c => all.indexOf(c) !== -1 && cd.indexOf(c) !== -1), 'world']
countries.forEach(c => fs.mkdirSync(`./data/ISIpedia/${c}`))

const indicators = ['crop-failure', 'drought', 'heatwave', 'river-flood', 'tropical-cyclone', 'wildfire', 'all-events', 'confined-events', 'extensive-events']

const copies = countries.map(c => {
  const countryCopies = [
    new Promise((resolve, reject) => {
      fs.copyFile(
        `./data/cube-old/country_data/${c}/${c}_general.json`,
        `./data/ISIpedia/${c}/country.json`,
        err => err ? reject(err) : resolve()
      )
    })
  ]
  indicators.forEach(i => {
    if (
      fs.existsSync(`./data/cube-old/${i}/future-projections/${c}/pop-temp_${c}.json`) &&
      fs.existsSync(`./data/cube-old/${i}/future-projections/${c}/land-temp_${c}.json`)
    ) {
      countryCopies.push(
        new Promise((resolve, reject) => {
          fs.copyFile(
            `./data/cube-old/${i}/future-projections/${c}/pop-temp_${c}.json`,
            `./data/ISIpedia/${c}/${i}-population.json`,
            err => err ? reject(err) : resolve()
          )
        }),
        new Promise((resolve, reject) => {
          fs.copyFile(
            `./data/cube-old/${i}/future-projections/${c}/land-temp_${c}.json`,
            `./data/ISIpedia/${c}/${i}-land.json`,
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
