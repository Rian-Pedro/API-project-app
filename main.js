const express = require("express");
const app = express();

const mongoose = require("mongoose");
const cors = require("cors");
//mongodb+srv://systemw287:<password>@charge.iodlozw.mongodb.net/?retryWrites=true&w=majority
//cIO6vPldG48zQKSj 
const routes = require("./routes");


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect("mongodb+srv://systemw:cIO6vPldG48zQKSj@charge.iodlozw.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log("conectado ao banco de dados");
  })
  .then(() => {
    app.use(routes);

    app.listen(3000, () => {
      console.log("http://localhost:3000");
    })
  })
  .catch((err) => {
    console.log("Erro ao conectar com o servidor: ", err);
  })