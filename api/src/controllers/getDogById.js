const { Dog, Temperaments } = require("../db")

async function getDogById(req, res) {
    try {
        const { id } = req.params  //extraemos el id de req.params

        const dog = await Dog.findOne({ //lo buscamos para retornarlo
            where: { id },
            include:[{
                model: Temperaments
            }]
        })

        res.status(200).json(dog)
    } catch (error) {
        res.status(404).status({ error: error.message })
    }
}

module.exports = getDogById