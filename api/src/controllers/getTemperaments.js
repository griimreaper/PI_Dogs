// ver el controller tempsForData

const { Temperaments } = require("../db")

async function getTemperaments(req, res) {
    try {
        const allTemps = await Temperaments.findAll({ attributes: ["name", "id"] }) // aqui solo retornamos todo lo que nos devuelve nuestra table temperaments
        res.status(200).json(allTemps)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = getTemperaments