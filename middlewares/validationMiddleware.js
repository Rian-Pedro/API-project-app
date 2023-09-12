const validator = require("validator");

class validationMiddleware {
  static isString(req, res, next) {
    for(let i in req.body) {
      if(typeof req.body[i] != "string") {
        req.body[i] = req.body[i].toString();
      }
    }
    next();
  }

  static isValidEmail(req, res, next) {
    if(!validator.isEmail(req.body.email)) {
      res.json({
        erro: "Email inválido",
        permission: false
      });
    } else {
      next();
    }
  }

}

module.exports = validationMiddleware;