const store = require("./store");

function addMessage(user, message) {
    return new Promise((resolve, reject) => {
        if (!user || !message) {
            console.error("[messageController] No hay usuario o mensaje");
            reject("Los datos son incorrectos");
            return false;
        }
        
        if (message.length > 256) {
            console.error("[messageController] Largo del mensaje excede el màximo. Largo: " + message.length);
            reject("Largo del mensaje incorrecto");
            return false;
        }
    
        const fullMessage = {
            user: user,
            message: message,
            date: new Date()
        }

        store.add(fullMessage);
        resolve(fullMessage);
    });    
}

function getMessages() {
    return new Promise((resolve, reject) => {
        resolve(store.list());
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

// asì exportamos las funciones que tenemos en un objeto
module.exports = {
    addMessage, getMessages, updateMessage
}