//mok es falcear la base de datos o un servicio para validar que todo funciona correctamente.
const list = []; // Esto sirve para hacer pruebas antes de mandarlo a base de datos.
const db = require("mongoose");
const Model = require("./model");

db.Promise = global.Promise;
db.set("strictQuery", false);
db.connect(process.env.MONGODB_URL);
// db.db("telegrom");
// db.Collection("telegrom.platziBackEnd");

function addMessage(message) {
    // list.push(message);
    const myMessage = new Model(message);
    myMessage.save();
}

async function getMessage() {
    // return list;
    const messages = await Model.find();
    return messages;
}

async function updateText(id, message) {
    const foundMessage = await Model.findOne({
        "_id": id
    });

    foundMessage.message = message;
    const newMessage = foundMessage.save();

    return newMessage;
}

module.exports = {
    add: addMessage,
    list: getMessage,
    updateText: updateText,
    // get // para tomar un mensahe especifico
    // update // actualizar un mensaje especifico
    // delete // eliminar mensaje especifico
}