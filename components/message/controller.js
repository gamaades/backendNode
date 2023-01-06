const socket = require("../../socket").socket;
const store = require("./store");
const config = require("../../config");

function addMessage(chat, user, message, file) {
    return new Promise((resolve, reject) => {
        if (!chat || !user || !message) {
            console.error("[messageController] No hay usuario o mensaje");
            reject("Los datos son incorrectos");
            return false;
        }
        
        let fileUrl = "";
        if (file) {
            fileUrl = config.hots+":"+config.port+"/app/files/"+file.filename;
        }

        if (message.length > 256) {
            console.error("[messageController] Largo del mensaje excede el màximo. Largo: " + message.length);
            reject("Largo del mensaje incorrecto");
            return false;
        }
    
        const fullMessage = {
            chat: chat,
            user: user,
            message: message,
            date: new Date(),
            file: fileUrl
        }

        store.add(fullMessage);

        socket.io.emit("message", fullMessage);

        resolve(fullMessage);
    });    
}

function getMessages(filterUser) {
    return new Promise((resolve, reject) => {
        resolve(store.list(filterUser));
    });
}

function updateMessage(id, message) {
    return new Promise(async (resolve, reject) => {
        if (!id || !message) {
            console.error("[messageController] No hay id o mensaje");
            reject("Sin datos")
            return false;
        }
        const result = await store.updateText(id, message);
        resolve(result);
    })
}

function deleteMessage(id) {
    return new Promise((resolve, reject) => {
        if (!id) {
            reject("Parametro invalido");
            return false;
        }
        store.remove(id)
            .then(() => {
                resolve();
            })
            .catch(e => {
                reject(e);
            })
    });
}

// asì exportamos las funciones que tenemos en un objeto
module.exports = {
    addMessage, getMessages, updateMessage, deleteMessage
}