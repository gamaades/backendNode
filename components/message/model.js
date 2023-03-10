const mongoose = require("mongoose");

// hay que separar la clase, ya que sera una de las que se utilizara
const Schema = mongoose.Schema;

// a traves de una objeto se definen todas las propiedades y los tipos que queramos tener
const mySchema = new Schema({
    chat: {
        type: Schema.ObjectId,
        ref: "Chat"
    },
    user: {
        type: Schema.ObjectId,
        ref: "User"
    },
    message: {
        type: String,
        required: true,
    },
    date: Date,
    file: String
});

const model = mongoose.model("Message", mySchema);
module.exports = model;

