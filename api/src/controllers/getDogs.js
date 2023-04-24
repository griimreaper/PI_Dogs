const axios = require("axios")
const { Dog, Temperaments } = require("../db")
const process = require("dotenv").config()

const endpoint = process.parsed.ENDPOINT //extramos la api de .env

async function getDogs(req, res) {
    try {
        const { data } = await axios.get(endpoint)
        for (const r of data) {
            await Dog.findOrCreate({ //insertamos todos los dogs
                where: { id: r.id },
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
                        where: {name: dogTemps[i]},
                        defaults:{name: dogTemps[i]}
                    })
                }

                dogTemps.forEach(async(t)=>{ // hacemos la relacion de la tabla intermedia 
                    const temp = await Temperaments.findOne({where:{name: t}})
                    const d = await Dog.findByPk(r.id) 
                    await d.addTemperaments(temp)
                })
            }
        }
        const dogs = await Dog.findAll() //encontramos todos los dogs para darlos en la respuesta

        res.status(200).json(dogs)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = getDogs