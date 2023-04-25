const { Dog } = require("../db")

async function getDogs(req, res) {
    try {
        const dogs = await Dog.findAll()

        res.status(200).json(dogs)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = getDogs