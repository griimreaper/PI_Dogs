const { Dog, Temperaments } = require("../db")

const postDog = async (req, res) => {
    try {
        const { name, image, height, weight, age, temperaments } = req.body // recibimos por body los datos que nos envian desde el front
        const id = await Dog.findAll()

        if (!name || !height || !weight || !age) {
            res.status(404).json({ error: "No se han ingresado todos los datos" })
        }

        const [dog, created] = await Dog.findOrCreate({ // creamos al perro
            where: { name },
            defaults: {
                id: id.length + 1,
                name,
                image: image ? image : null,
                height,
                weight,
                age,
            },
        });

        if (!created) {  // si el perro ya existe..
            res.status(401).json({ error: "El perro ya existe" });
        } else {
            if (temperaments) {
                temperaments.forEach(async (t) => {              // Relacionamos con la tabla intermedia
                    const temp = await Temperaments.findOne({ where: { name: t } })
                    const dog = await Dog.findByPk(id.length + 1)
                    await dog.addTemperaments(temp)
                });
            }

            res.status(200).json(dog)
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = postDog