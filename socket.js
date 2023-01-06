// este archvio se encargara de inicializar nuestro servidor de socket io, de generar una instancia y de poderla compartir
const socketIO = require("socket.io");
const socket = {} // crearemos socket como un objeto
let io;
let conections = 0;
//esta funcion de conexion lo que hace es pasarle un servidor
function connect(server) {
	io = socketIO(server)
	socket.io = io

	//SokcetIO
	io.on('connection', (socket) => {
		console.log(`Connect...`)
		console.log(`Cantidad de conexiones: ${++conections}`)

		/** Aqui detectamos cada q un cliente se desconecte **/
		socket.on('disconnect', (message) => {
			console.log(`[DISCONNECT]: ${message}`)
		    console.log(`Cantidad de conexiones: ${--conections}`)
			//showClients()
		})
        console.log(socket.id);
		//showClients()
	})
}


/** Esta funcon muestra los ID de los clientes conectados **/
function showClients() {
	io.client((error, clients) => {
		if (error) throw error
		console.log(`[CLIENTS]: [${clients}]`)
	})
}

module.exports = {
    connect, socket
}