const axios = require("axios")
const { Dog } = require("../db")
require("dotenv").config()

const { ENDPOINT } = process.env //extramos la api de .env

async function getDogs(req, res) {
    try {
        const { data } = await axios.get(ENDPOINT)
        const dogsAPI = data.map((dog) => {  //extraemos los perros de nuestra api
            return {
                id: dog.id,
                name: dog.name,
                image: dog.image.url,
                weight: dog.weight.imperial,
                height: dog.height.imperial,
                age: dog.life_span
            }
        })
        const dogsDB = await Dog.findAll({  //extraemos los perros de nuesta DB
            attributes: ["id", "name", "image", "weight", "height", "age"]
        })
        res.status(200).json([...dogsAPI, ...dogsDB].sort((a, b) => a.id - b.id)) // concatenamos los resultados y lo ordenamos por id
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = getDogs