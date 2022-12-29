const express = require("express");
const response = require("../../network/response");
const controller = require("./controller");
const router = express.Router();


// Traemos información
router.get("/", (req, res) => {
    const filterMessages = req.query.user || null;
    controller.getMessages(filterMessages)
        .then((messagetList) => {
            response.success(req, res, messagetList, 200)
        })
        .catch(e => {
            response.error(req, res, "Unexpected Error", 500, e)
        })

    //pruebas para get
    // //console.log(req.headers); // Cache-control es lo que se utiliza mucho, esto sirve para sestear cache especifico de imágenes, archivos de JavaScript. User-agent nos sirve para saber de qué dispositivo vienen. accept o accept-encoding
    // res.header({
    //     "custom-header": "nuestro valor personalizados"
    // });
    // console.log(req.body);
    // console.log(req.query);
    // // res.send("Lista de mensajesss"); // Esto se trabajara del lado del network, ya que aca estaran todas las partes que pertenecen a la capa de redes de la aplicacion completa, y esta es llamada response
    // response.success(req, res, "lista de mensajes");
});


// Agregamos información
router.post("/", (req, res) => {

    controller.addMessage(req.body.user, req.body.message)
        .then((fullMessage) => {
            response.success(req, res, fullMessage, 201);
        })
        .catch(e => {
            response.error(req, res, "Informciòn invalida", 400, e);
        });

});


// Actualizaciones parciales de información. Para recibir parametros de la ruta, estos van con ":" y nombre del parametro. Ejemplo /:id
router.patch("/:id", (req, res) => {
    // console.log(req.params.id);
    //esto es un promesa
    controller.updateMessage(req.params.id, req.body.message)
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch(e => {
            response.error(req, res, "Error interno", 500, e);
        });
});


module.exports = router;