// 1 - Importações

// 1.1 - Importação do express
const express = require("express");
const router = express.Router();

const loginRouter = require("./routes/loginRouter");

router.use(loginRouter);

// 1.2 - Importação de middlewares
// const hashMiddleware = require("./middlewares/hashMiddleware");
// const validationMiddleware = require("./middlewares/validationMiddleware");

// // 1.3 - Importação de models do banco de dados
// const loginModel = require("./models/LoginModel"); 

// // 2 - Rotas da API

// // 2.1 - Rota de registro de usuário
// router.post("/userRegister", 
//             validationMiddleware.isValidEmail,
//             validationMiddleware.isString,
//             hashMiddleware.createHash,
//             async (req, res) => {
//               const userModel = new loginModel({
//                 name: req.body.name,
//                 email: req.body.email,
//                 tel: req.body.tel,
//                 password: req.body.pass,
//               });

//               await userModel.register("user");

//               res.json(req.body);
//             }
// );

// router.get("/userLogin", async (req, res) => {
//   res.json(await loginModel.login("user", req.body.email, "", req.body.pass));
// });

// router.get("/employeeLogin", async (req, res) => {
//   res.json(await loginModel.login("employee", "", req.body.ident, req.body.pass));
// });

// router.post("/employeeRegister", 
//             validationMiddleware.isString, 
//             hashMiddleware.createHash, 
//             async (req, res) => {
//               const employeeModel = new loginModel({
//                 name: req.body.name,
//                 ident: req.body.ident,
//                 tel: req.body.tel,
//                 password: req.body.pass,
//               });

//               await employeeModel.register("employee");

//               res.json(req.body);
//             }
// );

module.exports = router;