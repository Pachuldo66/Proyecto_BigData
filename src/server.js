const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const { MongoClient } = require('mongodb');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const uri = "mongodb+srv://islooz:1234567ochoi@cluster.jt0wb48.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200 
}
app.use(cors(corsOptions));

// Configura la conexión del socket
io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  // Maneja el evento 'message' enviado por el consumidor
  socket.on("message", (data) => {
    // Envía la data al cliente
    io.emit("message", data);
  });

  // Maneja la desconexión del cliente
  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

// Configura la carpeta de archivos estáticos
app.use(express.static(__dirname + "/public"));

// Ruta para el archivo HTML
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});



app.get('/data', async (req, res) => {
    try {
      await client.connect();
      const db = client.db("proyectoBigData");
      const collection = db.collection("data");
      const data = await collection.find().toArray();
      res.json(data);
    } finally {
        // No cierres la conexión aquí, se cerrará cuando termine el programa
      }
});

// Inicia el servidor
const port = 3000; // Puerto en el que se ejecutará el servidor
server.listen(port, () => {
  console.log(`Servidor Socket.IO iniciado en el puerto ${port}`);
});


