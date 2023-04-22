const { Router } = require('express');
// Importar todos los routers;
const getDogs = require("../controllers/getDogs")
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
router.get("/dogs", getDogs)
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
