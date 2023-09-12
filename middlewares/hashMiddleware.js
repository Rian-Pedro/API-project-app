const bcrypt = require("bcrypt");

class hashMiddleware {
  static createHash(req, res, next) {
    bcrypt.hash(req.body.pass, 10, (err, hash) => {
      req.body.pass = hash;
      next();
    });
  }

  static async comparePass(hash, pass) {
    const teste = await bcrypt.compare(pass, hash);
    return teste;
  }
}

module.exports = hashMiddleware;