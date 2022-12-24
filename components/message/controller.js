

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

        console.info(fullMessage);
        resolve(fullMessage);
    });
}

// asì exportamos las funciones que tenemos en un objeto
module.exports = {
    addMessage,
}