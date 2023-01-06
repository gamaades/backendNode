const mongoose = require("mongoose");

// hay que separar la clase, ya que sera una de las que se utilizara
const Schema = mongoose.Schema;

// a traves de una objeto se definen todas las propiedades y los tipos que queramos tener
const mySchema = new Schema({
    name: String
});

const model = mongoose.model("User", mySchema);
module.exports = model;

