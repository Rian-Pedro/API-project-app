// 1 - Importações

// 1.1 - Importação do express
const express = require("express")
const loginRouter = express.Router();

// 1.2 - Importação de middlewares
const hashMiddleware = require("../middlewares/hashMiddleware");
const validationMiddleware = require("../middlewares/validationMiddleware");

// 1.3 - Importação de models do banco de dados
const loginModel = require("../models/LoginModel"); 

// 2 - Rotas da API

// 2.1 - Rota de login de usuário
loginRouter.get("/userLogin", async (req, res) => {
    res.json(await loginModel.login("user", req.body.email, "", req.body.pass));
});

// 2.2 - Rota de login de funcionario
loginRouter.get("/employeeLogin", async (req, res) => {
    res.json(await loginModel.login("employee", "", req.body.ident, req.body.pass));
});

// 2.3 - Rota de registro de usuário
loginRouter.post("/userRegister", 
            validationMiddleware.isValidEmail,
            validationMiddleware.isString,
            hashMiddleware.createHash,
            async (req, res) => {
              const userModel = new loginModel(req.body);

              await userModel.register("user");

              res.json(req.body);
            }
);

// 2.4 - Rota de registro de funcionario
loginRouter.post("/employeeRegister", 
            validationMiddleware.isString, 
            hashMiddleware.createHash, 
            async (req, res) => {
              const employeeModel = new loginModel(req.body);

              await employeeModel.register("employee");

              res.json(req.body);
            }
);

module.exports = loginRouter;