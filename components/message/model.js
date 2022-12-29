const mongoose = require("mongoose");

// hay que separar la clase, ya que sera una de las que se utilizara
const Schema = mongoose.Schema;

// a traves de una objeto se definen todas las propiedades y los tipos que queramos tener
const mySchema = new Schema({
    user: String,
    message: {
        type: String,
        required: true,
    },
    date: Date
});

const model = mongoose.model("Message", mySchema);
module.exports = model;

