const { Dog, Temperaments } = require("../db"); //importamos la DataTable

async function getDogByName(req, res) {
    try {
        let name = req.query.name; //requerimos el name por query

        name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(); // Convertimos la primera letra en mayúscula y el resto en minúsculas

        const dogs = await Dog.findOne({ //filtramos en nuestra DT el dog que coincida con el name
            where: {
                name: name
            },include:[
                {
                    model: Temperaments
                }
            ]
        });
        res.status(200).json(dogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al buscar el perro' });
    }
}

module.exports = getDogByName;