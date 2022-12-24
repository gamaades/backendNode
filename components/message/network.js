const express = require("express");
const response = require("../../network/response");
const router = express.Router();


router.get("/", (req, res) => {
    //console.log(req.headers); // Cache-control es lo que se utiliza mucho, esto sirve para sestear cache especifico de imágenes, archivos de JavaScript. User-agent nos sirve para saber de qué dispositivo vienen. accept o accept-encoding
    res.header({
        "custom-header": "nuestro valor personalizados"
    });
    console.log(req.body);
    console.log(req.query);
    // res.send("Lista de mensajesss"); // Esto se trabajara del lado del network, ya que aca estaran todas las partes que pertenecen a la capa de redes de la aplicacion completa, y esta es llamada response
    response.success(req, res, "lista de mensajes");

});


router.post("/", (req, res) => {
    if (req.query.error == "ok") {
        response.error(req, res, "Error inesperado", 400, "Es solo una simulacion de los errores");        
    } else {
        response.success(req, res, "Creado correctamente", 201);
    }

});


module.exports = router;