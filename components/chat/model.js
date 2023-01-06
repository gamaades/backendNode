const mongoose = require("mongoose");

// hay que separar la clase, ya que sera una de las que se utilizara
const Schema = mongoose.Schema;

// a traves de una objeto se definen todas las propiedades y los tipos que queramos tener
const mySchema = new Schema({
    users: [{
        type: Schema.ObjectId,
        ref: "User"
    }]
});

const model = mongoose.model("Chat", mySchema);
module.exports = model;

