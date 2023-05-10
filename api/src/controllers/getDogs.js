const axios = require("axios")
const { Dog, Temperaments } = require("../db")
require("dotenv").config()

const { ENDPOINT } = process.env //extramos la api de .env
const { api_key } = process.env

async function getDogs(req, res) {
    try {
        const { data } = await axios.get(ENDPOINT + api_key)
        const dogsAPI = data.map((dog) => {  //extraemos los perros de nuestra api
            return {
                id: dog.id,
                name: dog.name,
                image: dog.image.url,
                weight: dog.weight.imperial,
                height: dog.height.imperial,
                breedgroup: dog.breed_group ? dog.breed_group : null,
                age: dog.life_span,
                temperaments: dog.temperament ? dog.temperament.split(",").map((t) => t.trim()) : null //si tiene temperamentos los separamos en un array de strings y le quitamos los espacios
            }
        })
        let dogsDB = await Dog.findAll(//extraemos los perros de nuesta DB
            {
                include: [{
                    model: Temperaments, // incluimos los temperamentos si es que tiene, pero solo necesitamos el atributo name
                    attributes: ["name"]
                }]
            }
        )
        const newDogs = [] //creamos un array para para almacenar cada perro de la DB con los temperamentos ordenados en un array de strings 
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