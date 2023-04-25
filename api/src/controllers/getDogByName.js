const { Dog, Temperaments } = require("../db"); //importamos la DataTable
const axios = require("axios");
require("dotenv").config()

const { ENDPOINT } = process.env //extramos la api de .env

async function getDogByName(req, res) {
    try {
        let name = req.query.name; //requerimos el name por query
        name = name.toLowerCase(); // Convertimos el string en minúsculas

        let { data } = await axios.get(ENDPOINT)
        data = data.find((d) => d.name.toLowerCase() === name) // comparamos con el name del perro en minuscula

        if (data) {         //si existe lo retornamos
            const { id, name, image, weight, height, life_span, temperament } = data
            const dogApi = {
                id,
                name,
                image: image.url,
                weight: weight.imperial,
                height: height.imperial,
                age: life_span,
                temperament: temperament.split(",").map((t) => t.trim())
            }
            res.status(200).json(dogApi)
        } else {     //si no existe lo buscamos en la BD para retornarlo

            const dog = await Dog.findOne({
                where: { name: name },
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
            } else res.status(400).json({ error: 'This breed of dog does not exist' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = getDogByName;