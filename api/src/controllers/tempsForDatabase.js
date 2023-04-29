// este controller lo vamos a inicializar al levantar el servidor

const axios = require("axios")
const { Temperaments } = require("../db")
require("dotenv").config()

const { ENDPOINT } = process.env //extramos la api de .env
const { api_key } = process.env

async function tempsForDatabase() {
    try {
        const { data } = await axios.get(ENDPOINT+api_key)   //vamos a iterar uno por uno los dogs para extraer los temperaments
        for (const r of data) {
            if (r.temperament) { // si tiene temperamentos los agregamos a la data table temperaments
                const dogTemps = r.temperament.split(",").map(t => t.trim())
                for (let i = 0; i < dogTemps.length; i++) {
                    await Temperaments.findOrCreate({
                        where: { name: dogTemps[i] },
                        defaults: { name: dogTemps[i] }
                    })
                }
            }
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = tempsForDatabase