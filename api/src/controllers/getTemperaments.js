const { Temperaments } = require("../db")

async function getTemperaments(req, res) {
    try {
        const allTemps = await Temperaments.findAll()
        res.status(200).json(allTemps)
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

module.exports = getTemperaments