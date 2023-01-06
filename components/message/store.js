//mok es falcear la base de datos o un servicio para validar que todo funciona correctamente.
//const list = []; // Esto sirve para hacer pruebas antes de mandarlo a base de datos.
// const db = require("mongoose"); // esto se va a db.js
const { populate } = require("./model");
const Model = require("./model");


// db.db("telegrom");
// db.Collection("telegrom.platziBackEnd");

function addMessage(message) {
    // list.push(message);
    const myMessage = new Model(message);
    myMessage.save();
}

function getMessage(filterUser) {
    return new Promise((resolve, reject) => {
        let filter = {};
        if (filterUser !== null) {
            filter = {user: filterUser}
        }
        Model.find(filter)
            .populate("user")
            .exec((error, populated) => {
                if (error) {
                    reject(error)
                    return false;
                }
                resolve(populated);
            })
        //resolve(messages);
    })
}

async function updateText(id, message) {
    const foundMessage = await Model.findOne({
        "_id": id
    });

    foundMessage.message = message;
    const newMessage = foundMessage.save();

    return newMessage;
}

function removeMessage(id) {
    // return Model.deleteOne({
    //     _id: id
    // });
    return Model.findByIdAndDelete(id); // tambien se puede utlizar este metodo
}
module.exports = {
    add: addMessage,
    list: getMessage,
    updateText: updateText,
    remove: removeMessage
    // get // para tomar un mensahe especifico
    // update // actualizar un mensaje especifico
    // delete // eliminar mensaje especifico
}