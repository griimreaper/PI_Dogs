const axios = require("axios")
const { Dog, Temperaments } = require("../db")
require("dotenv").config()

const { ENDPOINT } = process.env //extramos la api de .env
const { api_key } = process.env

async function getDogs(req, res) {
    try {
        const { data } = await axios.get(ENDPOINT+api_key)
        const dogsAPI = data.map((dog) => {  //extraemos los perros de nuestra api
            // const temperament = dog.temperament.split(",").map((t)=> t.trim())
            return {
                id: dog.id,
                name: dog.name,
                image: dog.image.url,
                weight: dog.weight.imperial,
                height: dog.height.imperial,
                age: dog.life_span,
                temperaments: dog.temperament ? dog.temperament.split(",").map((t) => t.trim()) : null
            }
        })
        let dogsDB = await Dog.findAll(//extraemos los perros de nuesta DB
            {
                include: [{
                    model: Temperaments,
                    attributes: ["name"]
                }]
            }
        )
        const newDogs = []
        for (const dog of dogsDB) {
            const { id, name, weight, height, image, age, temperaments, created } = dog
            newDogs.push({ id, name, weight, height, image, age, created, temperaments: temperaments.map(t => t.name) })
        }


        res.status(200).json([...dogsAPI, ...newDogs].sort((a, b) => a.id - b.id)) // concatenamos los resultados y lo ordenamos por id
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = getDogs