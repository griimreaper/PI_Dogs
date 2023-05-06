// este controller lo vamos a inicializar al levantar el servidor

const axios = require("axios")
const { Temperaments } = require("../db")
require("dotenv").config()

const { ENDPOINT } = process.env //extramos la api de .env
const { api_key } = process.env

async function tempsForDatabase() {
    try {
        const { data } = await axios.get(ENDPOINT+api_key)   //extraemos el array de perros
        for (const dog of data) {  //vamos a iterar uno por uno los dogs para extraer los temperaments de cada uno
            if (dog.temperament) { // si tiene temperamentos los agregamos a la data table temperaments
                const dogTemps = dog.temperament.split(",").map(t => t.trim()) // lo convertimos en array y le sacamos los espacios
                for (let i = 0; i < dogTemps.length; i++) { // iteramos este array
                    await Temperaments.findOrCreate({ // usamos un findorcreate para que no se repitan los mismos temperaments
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