const { Dog, Temperaments } = require("../db")
const axios = require("axios")
require("dotenv").config()

const { ENDPOINT } = process.env //extramos la api de .env
const { api_key } = process.env

let id = 1
let idEnUso

const postDog = async (req, res) => {
    try {
        const { name, image, height, weight, age, temperaments } = req.body // recibimos por body los datos que nos envian desde el front

        const { data } = await axios.get(ENDPOINT + api_key)  //buscamos un id que no se encuentre utilizado de la api

        if (!idEnUso) { // esta condicional es para que solo cargue los id una vez
            idEnUso = data.map((d) => d = d.id) // convertimos la data en un arrays de ids
        }
        while (idEnUso.includes(id)) { // creamos una condicional que corte al momento de encontrar un id que no este en uso
            id++                        // si el id existe lo aumentamos
        }

        idEnUso = [...idEnUso, id].sort((a, b) => a - b) //al encontrar el id lo guardamos en nuestro array idEnUso, para que cuando creemos el proximo perro busque el nuevo id desde ese array

        if (!name || !height || !weight || !age || !temperaments) {
            return res.status(400).json({ error: "Not all data has been entered" }) //respuesta si no se envian los datos necesarios
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
                created: true //agregamos este atributo para despues poder filtrar los perros creados con los de la api
            },
        });

        if (!created) {  // si el perro ya existe..
            return res.status(401).json({ error: "The Dog does exist" }); //insertamos la respuesta correspondiente
        } else {
            if (temperaments) { // si recibe temperaments
                temperaments.forEach(async (t) => { // lo relacionamos cada temp al perro con la tabla intermedia
                    const temp = await Temperaments.findOne({ where: { name: t } }) //ubicamos el temp de nuestraa DB
                    const dog = await Dog.findByPk(id) // ubicamos al perro recientemente creado
                    await dog.addTemperaments(temp) // hacemos la relacion
                });
            }

            res.status(200).json({ ...dog.dataValues, temperaments }) // retornamos al perro con sus temperaments para poder renderizarlo 
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = postDog