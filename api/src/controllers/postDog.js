const { Dog, Temperaments } = require("../db")
const axios = require("axios")
require("dotenv").config()

const { ENDPOINT } = process.env //extramos la api de .env

let id = 1
let idEnUso

const postDog = async (req, res) => {
    try {
        const { name, image, height, weight, age, temperaments } = req.body // recibimos por body los datos que nos envian desde el front

        const { data } = await axios.get(ENDPOINT)  //buscamos un id que no se encuentre utilizado de la api

        if (!idEnUso) { // esta condicional es para que solo cargue los id una vez
            idEnUso = data.map((d) => d = d.id) // convertimos la data en un arrays de ids
        }
        while (idEnUso.includes(id)) {
            id++                        // si el id existe lo aumentamos
        }

        idEnUso = [...idEnUso, id].sort((a, b) => a - b) //al encontrar el id lo guardamos en nuestro array idEnUso, paara que cuando creemos el proximo perro busque el nuevo id desde ese array

        if (!name || !height || !weight || !age || !temperaments) {
            return res.status(400).json({ error: "No se han ingresado todos los datos" })
        }

        const [dog, created] = await Dog.findOrCreate({ // creamos al perro
            where: { name },
            defaults: {
                id,
                name,
                image: image ? image : null,
                height,
                weight,
                age,
                created: true
            },
        });

        if (!created) {  // si el perro ya existe..
            res.status(401).json({ error: "The Dog does exist" });
        } else {
            if (temperaments) {
                temperaments.forEach(async (t) => {              // Relacionamos con la tabla intermedia
                    const temp = await Temperaments.findOne({ where: { name: t } })
                    const dog = await Dog.findByPk(id)
                    await dog.addTemperaments(temp)
                });
            }

            res.status(200).json({...dog.dataValues, temperaments})
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = postDog