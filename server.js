// Lo primero que hacemos para tener un server en NodeJS es cargar una librería para  montarlo. Express es una muy buena. --> npm i express
const express = require("express"); // La forma que tiene de traer módulos.
const bodyParser = require("body-parser"); // es una extencion de express que nos permite trabajar con el body de la petición de forma más sencilla. esto se instala con npm i body-parser
const response = require("./network/response");
const router = express.Router(); // Router nos permite separa cabecera, o metodos, o URL,


var app = express(); 
app.use(bodyParser.json()); // De esta manera se agrega la opcion de body parser, esto es para ocuparlo con formatos json
app.use(bodyParser.urlencoded({extended: false}))
app.use(router); // De esta manera se añade nuestra ruta a la aplicación de express

router.get("/message", (req, res) => {
    //console.log(req.headers); // Cache-control es lo que se utiliza mucho, esto sirve para sestear cache especifico de imágenes, archivos de JavaScript. User-agent nos sirve para saber de qué dispositivo vienen. accept o accept-encoding
    res.header({
        "custom-header": "nuestro valor personalizados"
    });
    console.log(req.body);
    console.log(req.query);
    // res.send("Lista de mensajesss"); // Esto se trabajara del lado del network, ya que aca estaran todas las partes que pertenecen a la capa de redes de la aplicacion completa, y esta es llamada response
    response.success(req, res, "lista de mensajes");

});

// router.post("/message", (req, res) => {
//     console.log(req.body);
//     res.send("Mensaje "+ req.body.text +" añadido correctamente");
// });

router.post("/message", (req, res) => {
    // res.send("Mensaje eliminado"); // comentado para mandar respuesta vacia y status
    // res.status(201).send(); // esta es una respuesta vacia
    // res.status(201).send('Hola ' + req.body.name);  // respuesta plana
    // res.status(201).send({"error": "", "body": "Creado correctamente"}); // Estructurada - array, objetos
    if (req.query.error == "ok") {
        response.error(req, res, "Error inesperado", 400, "Es solo una simulacion de los errores");        
    } else {
        response.success(req, res, "Creado correctamente", 201);
    }

});

router.delete('/message', function(req, res){
    console.log(req.query);
    console.log(req.body);
    res.send(`Mensaje ${req.body.text} eliminado correctamente`);
});

// Para ver que funciona le  pido que me devuelva para cualquier ruta:
// app.use("/", (req, res) => {
//     // --->Para cualquier ruta, crea una función, tiene dos parámentros, cualquier funcion http tiene req y res.
//     res.send("Estoy aprendiendo NodeJs!");
// });

//aca es donde estaria nuestra aplicacion (web), en la carpeta public es donde va a estar toda la informacion de nuestra aplicación
app.use("/app", express.static("public"));

// Para que lo anterior viva temos que decirle donde va a escuchar, eligimos un puerto, como el 3000 quees muy usado en las apps de Node.
app.listen(3000);
console.log("la aplicacion está escuchando en http://localhost:3000");
// Con esto está listo el servidor de Node para que viva:
//---> node server