const axios = require("axios")
const { Dog, Temperaments } = require("../db")
require("dotenv").config()

const { ENDPOINT } = process.env //extramos la api de .env

async function apiForDatabase() {
    try {
        const { data } = await axios.get(ENDPOINT)
        for (const r of data) {
            await Dog.findOrCreate({ //insertamos todos los dogs
                where: { name: r.name },
                defaults: {
                    name: r.name,
                    image: r.image.url,
                    weight: r.weight.imperial,
                    height: r.height.imperial,
                    age: r.life_span
                }
            })
            if (r.temperament) { // si tiene temperamentos los agregamos a la data table temperaments
                const dogTemps = r.temperament.split(",").map(t => t.trim())
                for (let i = 0; i < dogTemps.length; i++) {
                    await Temperaments.findOrCreate({
                        where: { name: dogTemps[i] },
                        defaults: { name: dogTemps[i] }
                    })
                }
                dogTemps.forEach(async (t) => { // hacemos la relacion de la tabla intermedia 
                    const temp = await Temperaments.findOne({ where: { name: t } })
                    const d = await Dog.findOne({ where: { name: r.name } })
                    await d.addTemperaments(temp)
                })
            }
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = apiForDatabase