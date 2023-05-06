const axios = require("axios")
const { Dog, Temperaments } = require("../db")
require("dotenv").config()

const { ENDPOINT } = process.env //extramos la api de .env
const { api_key } = process.env

async function getDogById(req, res) {
    try {
        const idp = req.params.id //extraemos el id de req.params

        let { data } = await axios.get(ENDPOINT+api_key) //extraemos el array de perros
        data = data.find((d) => d.id === Number(idp)) // buscamos al perro por el id

        if (data) {         //si matchea lo retornamos
            const { id, name, image, weight, height, life_span, temperament } = data
            const dogApi = {
                id,
                name,
                image: image.url,
                weight: weight.imperial,
                height: height.imperial,
                age: life_span,
                temperaments: temperament.split(",").map((t) => t.trim())
            }
            res.status(200).json(dogApi)
        } else {     //si no matchea lo buscamos en la BD 

            const dog = await Dog.findOne({
                where: { id: idp },
                include: [{ // incluimos los temperaments si es que tiene
                    model: Temperaments
                }]
            })

            if (dog) { //si matchea lo retornamos
                const { id, name, weight, height, image, age, temperaments } = dog
                res.status(200).json({
                    id,
                    name,
                    weight,
                    height,
                    image,
                    age,
                    temperaments: temperaments.map(t => t.name)
                })
            }
            else res.status(400).json({ error: "The id of this dog does not exist" }) // si no lo encuentra respondemos con un 400
        }
    } catch (error) {
        res.status(404).status({ error: error.message })
    }
}

module.exports = getDogById