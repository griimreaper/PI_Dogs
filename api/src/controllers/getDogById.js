const axios = require("axios")
const { Dog, Temperaments } = require("../db")
require("dotenv").config()

const { ENDPOINT } = process.env //extramos la api de .env
async function getDogById(req, res) {
    try {
        const idp = req.params.id //extraemos el id de req.params

        let { data } = await axios.get(ENDPOINT)
        data = data.find((d) => d.id === Number(idp)) // buscamos al perro por el id

        if (data) {         //si existe lo retornamos
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
        } else {     //si no existe lo buscamos en la BD para retornarlo

            const dog = await Dog.findOne({ 
                where: { id: idp },
                include: [{
                    model: Temperaments
                }]
            })
            
            if (dog) {
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
            else res.status(400).json({ error: "The id of this dog does not exist" })
        }
    } catch (error) {
        res.status(404).status({ error: error.message })
    }
}

module.exports = getDogById