const db = require("mongoose");

db.Promise = global.Promise;

async function connect(url) {
    try {
        if (url == null) throw new Error("No se proporcionó la URL de la base de datos")
        db.set("strictQuery", false);
        await db.connect(url);
        console.info("[db] Conectado con éxito");    
    } catch (e) {
        const message = typeof e === "string"
            ? e : e instanceof Error
                ? e.message : "";
        console.error(`[db] Error conectando a la base de datos: ${message}`)    
    }
}

module.exports = connect;