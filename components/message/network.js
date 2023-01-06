const express = require("express");
const multer = require("multer"); // se encarga de todo lo que tenga que ver con la transmision de archivos, gestion de tipo y nos permite guardar en disco el archivo
var path = require('path');
const response = require("../../network/response");
const controller = require("./controller");
const router = express.Router();

var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'public/files/')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+path.extname(file.originalname)); //Appending extension
    }
});
    
var upload = multer({ storage: storage,
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(pdf|doc|docx|jpg)$/)) {
            return cb(new Error('Error en el tipo de archivo.'));
        }
        cb(null, true);
    }
});

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


// Agregamos información. multer se agrega como un middleware de express. y un meddleware es un punto donde va a pasar antes de ingresar a la funcion
router.post("/", upload.single("file"), (req, res) => {
    controller.addMessage(req.body.chat, req.body.user, req.body.message, req.file)
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

router.delete("/:id", (req, res) => {
    controller.deleteMessage(req.params.id)
        .then(() => {
            response.success(req, res, `Mensaje ${req.params.id} eliminado`, 200)
        })
        .catch(e => {
            response.error(req, res, "Error interno", 500, e);
        })
});


module.exports = router;