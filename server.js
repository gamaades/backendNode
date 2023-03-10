// Lo primero que hacemos para tener un server en NodeJS es cargar una librería para  montarlo. Express es una muy buena. --> npm i express
require('dotenv').config()
const express = require("express"); // La forma que tiene de traer módulos.
const app = express();
const server = require("http").Server(app); // aca se exporta socketio e inmediatamente despues se configura con el servidor, esto quiere decir que socketio nos exporta una función. y en el archivo socket.js tendra la funcion de conexion.
const cors = require("cors");
const bodyParser = require("body-parser"); // es una extencion de express que nos permite trabajar con el body de la petición de forma más sencilla. esto se instala con npm i body-parser
const socket = require("./socket");
const config = require("./config");

//
const db = require("./db");
// const router = require("./components/message/network"); // con esta linea traemos la ruta de los mensajes en el server
const router = require("./network/routes");

db(process.env.MONGODB_URL);

app.use(cors());
app.use(bodyParser.json()); // De esta manera se agrega la opcion de body parser, esto es para ocuparlo con formatos json
app.use(bodyParser.urlencoded({extended: false}));
socket.connect(server);
// app.use(router); // De esta manera se añade nuestra ruta a la aplicación de express

router(app); // aca le pasamos el servidor de express que tenemos creado a nuestra aplicacion al router para que se encargue de crear todas las rutas necesarias

// Para ver que funciona le  pido que me devuelva para cualquier ruta:
// app.use("/", (req, res) => {
//     // --->Para cualquier ruta, crea una función, tiene dos parámentros, cualquier funcion http tiene req y res.
//     res.send("Estoy aprendiendo NodeJs!");
// });

//aca es donde estaria nuestra aplicacion (web), en la carpeta public es donde va a estar toda la informacion de nuestra aplicación
app.use("/app", express.static("public"));

// Para que lo anterior viva temos que decirle donde va a escuchar, eligimos un puerto, como el 3000 quees muy usado en las apps de Node.
const port = config.port;
server.listen(port, () => {
    console.log(`la aplicacion está escuchando en ${config.hots}:`+port);
});
// Con esto está listo el servidor de Node para que viva:
//---> node server    