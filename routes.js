// 1 - Importações

// 1.1 - Importação do express
const express = require("express");
const router = express.Router();

// 1.2 -Importação das rotas
const loginRouter = require("./routes/loginRouter");
const incidentRouter = require("./routes/incidentRouter");

// 2 - Uso da rotas
router.use(loginRouter);
router.use(incidentRouter);

module.exports = router;