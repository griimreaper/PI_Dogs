const { Dog, Temperaments } = require("../db")

const postDog = async (req, res) => {
    try {
        const { id, name, image, height, weight, age, temperaments } = req.body // recibimos por body los datos que nos envian desde el front

        if (!name || !image || !height || !weight || !age || !id) {
            res.status(404).json({ error: "No se han ingresado todos los datos" })
        }

        const [dog, created] = await Dog.findOrCreate({ // creamos al perro
            where: { id: id },
            defaults: {
                id,
                name,
                image,
                height,
                weight,
                age,
            },
        });

        if (!created) {  // si el id ya existe..
            res.status(401).json({ error: "El Id ya esta en uso" });
        } else {
            if (temperaments) {
                temperaments.forEach(async (t) => {              // Relacionamos con la tabla intermedia
                    const temp = await Temperaments.findOne({where:{name: t}})
                    const dog = await Dog.findByPk(id) 
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