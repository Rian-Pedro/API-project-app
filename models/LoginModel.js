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
      if(await hashMiddleware.comparePass(user.password, pass)) {
        return {
          access: "Acesso permitido",
          permission: true
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
      } else {
        console.log(this.body);
        const newEmployee = new employeeModel(this.body);
        await newEmployee.save();
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