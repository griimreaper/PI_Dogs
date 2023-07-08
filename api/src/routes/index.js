const { Router } = require('express');
// Importar todos los routers;
const getDogs = require("../controllers/getDogs")
const getDogById = require("../controllers/getDogById")
const getDogByName = require("../controllers/getDogByName")
const getTemperaments = require("../controllers/getTemperaments")
const postDog = require("../controllers/postDog")
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
router.get("/", (req, res) => {res.send("hello world")})
router.get("/dogs", getDogs)
router.get("/dogs/:id", getDogById)
router.get("/dogsname", getDogByName)
router.get("/temperaments", getTemperaments)
router.post("/dogs", postDog)
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
