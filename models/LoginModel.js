const mongoose = require("mongoose");
const { Schema } = mongoose;

const hashMiddleware = require("../middlewares/hashMiddleware");

const userRegisterSchema = new Schema({
  name: String,
  email: String,
  tel: String,
  password: String,
});

const employeeRegisterSchema = new Schema({
  name: String,
  ident: String,
  tel: String,
  password: String,
});

const userModel = mongoose.model("user", userRegisterSchema);
const employeeModel = mongoose.model("employee", employeeRegisterSchema);

module.exports = class LoginModel {
  constructor(body) {
    this.body = body;
  }

  static async login(who, email, ident, pass) {
    if(who === "user") {
      const user = await userModel.findOne({email: email});
      if(!user) return { access: "Acesso negado, usuario não existe", permission: false }
      if(await hashMiddleware.comparePass(user.password, pass)) {
        return {
          access: "Acesso permitido",
          permission: true
        }
      }  else {
        return {
          access: "Acesso de negada",
          permission: false
        }
      }
    } else {
      const employee = await employeeModel.findOne({ident: ident});
      if(await hashMiddleware.comparePass(employee.password, pass)) {
        return {
          access: "Acesso de funcionario permitida",
          permission: true
        }
      } else {
        return {
          access: "Acesso de funcionario negada",
          permission: false
        }
      }
    }
  }

  async register(who) {
    try{ 

      if(Object.keys(this.body).length === 0) throw new Error("Corpo do objeto vazio");
      console.log(Object.keys(this.body).length === 0);

      if(who === "user") {
        const newUser = new userModel(this.body);
        await newUser.save();
        return newUser.id;
      } else {
        console.log(this.body);
        const newEmployee = new employeeModel(this.body);
        await newEmployee.save();
        return newEmployee.id;
      }
      
    } catch(err) {
      console.log(err);
    }
  }

  static async findUse(id) {
    const user = await userModel.findById(id);
    console.log(user);
  }
}