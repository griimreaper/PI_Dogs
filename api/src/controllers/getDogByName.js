const { Dog, Temperaments } = require("../db"); //importamos la DataTable
const axios = require("axios");
require("dotenv").config()

const { ENDPOINT } = process.env //extramos la api de .env
const { api_key } = process.env

async function getDogByName(req, res) {
    try {
        let name = req.query.name; //requerimos el name por query
        name = name.toLowerCase(); // Convertimos el string en minúsculas

        let { data } = await axios.get(ENDPOINT + api_key) //extraemos los perros de la api
        data = data.filter((d) => d.name.toLowerCase().includes(name)) // comparamos y buscamos los perros que coincidan con el name

        const arrayDogs = [] //creamos un array para aalmacenar los perros encontrados
        for (const dog of data) { //iteramos la api
            const { id, name, image, weight, height, life_span, temperament } = dog
            arrayDogs.push({ //pusheamos los perros ordenados con los datos que queremos de cada propiedad
                id,
                name,
                image: image.url,
                weight: weight.imperial,
                height: height.imperial,
                age: life_span,
                temperaments: temperament?.split(",").map((t) => t.trim())
            })
        }
        let DB = await Dog.findAll({ // extraemos los perros de la DB
            include: [{
                model: Temperaments
            }]
        })
        DB = DB.filter((d) => d.name.toLowerCase().includes(name)) // comparamos y buscamos los perros que coincidan con el name
        if (DB) { // iteramos en la DB
            for (const dog of DB) {
                const { id, name, weight, height, image, age, temperaments } = dog
                arrayDogs.push({ // lo pusheamos a nuestro array haciendo un flat a los temperaments
                    id,
                    name,
                    weight,
                    height,
                    image,
                    age,
                    temperaments: temperaments.map(t => t.name)
                })
            }
            if (arrayDogs.length > 0) { // si existen perros los retornamos
                res.status(200).json(arrayDogs.sort((a, b) => a.id - b.id)) 
            }
            else res.status(400).json({ error: 'This breed of dog does not exist' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = getDogByName;