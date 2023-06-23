//consumer


const Kafka = require("node-rdkafka");
const readConfigFile = require("./app.js");
const socketIO = require("socket.io-client");
const { MongoClient } = require('mongodb')
const uri = "mongodb+srv://islooz:1234567ochoi@cluster.jt0wb48.mongodb.net/?retryWrites=true&w=majority";

// Create a new MongoClient
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
  

async function run() {
    try {
      // Conectar a la base de datos
      await client.connect();
      // Enviar un ping para confirmar una conexión exitosa
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // No cierres la conexión aquí, se cerrará cuando termine el programa
    }
  }
  
run().catch(console.dir);

const config = readConfigFile("api-key-2.txt");
config["group.id"] = "node-group";

const consumer = new Kafka.KafkaConsumer(config, { "auto.offset.reset": "earliest" });
consumer.connect();

const socket = socketIO("http://localhost:3000"); // Cambia la URL según tu configuración de Socket.IO

consumer.on("ready", () => {
  consumer.subscribe(["topic_0"]);
  consumer.consume();
}).on("data", async (message) => {
    const key = message.key.toString();
    const value = message.value.toString();
    if (key === "Valor del bitcoin, dolar y euro.") {
      await fetchData(value);
    } else if (key === "OpenWeatherMap") {
      await fetchWeatherData(value);
    } else if (key === "ProductData") {
      await fetchProductsData(value);
    }
    // Enviar el mensaje al cliente a través de Socket.IO
    socket.emit("message", value);
  });

consumer.on("event.error", (err) => {
  console.error("Error from consumer:", err);
});

socket.on("message", async () => {
  try {
    await fetchData();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});



async function fetchData(data) {
    try {
        if (!data) {
            throw new Error("No se proporcionaron datos");
          }
        const { BTC, USD, EUR } = JSON.parse(data);
        console.log("Bitcoin:", BTC);
        console.log("Dólar:", USD);
        console.log("Euro:", EUR);
        // Conectar a la base de datos si no está conectada

        await client.connect();

  
        // Obtener la referencia a la base de datos
        const db = client.db("proyectoBigData");
    
        // Obtener la referencia a la colección
        const collection = db.collection("data");
    
        // Crear un nuevo documento con los datos
        const newData = {
            BTC,
            USD,
            EUR
        };
  
        // Insertar el documento en la colección
        await collection.insertOne(newData);
        socket.emit('message', {
            type: 'bitcoin',
            data: {
              BTC,
              USD,
              EUR
            }
          });
        console.log("Datos guardados en MongoDB correctamente");
    } catch{
      console.error("Esperando los datos...", );
    }
  }
  
async function fetchWeatherData(data) {
    try {
      if (!data) {
        throw new Error("No se proporcionaron datos");
      }

        const { main: { temp, humidity } } = JSON.parse(data);
        console.log("Temp:", temp);
        console.log("humidity:", humidity);
        await client.connect();

        // Obtener la referencia a la base de datos
        const db = client.db("proyectoBigData");
        // Obtener la referencia a la colección
        const collection = db.collection("weatherData");

        // Crear un nuevo documento con los datos
        const newData = {
            temp, 
            humidity, 

        };
        // Insertar el documento en la colección
        await collection.insertOne(newData);
        socket.emit('message', {
            type: 'weather',
            data: {
              temp,
              humidity
            }
          });
        console.log("Datos de clima guardados en MongoDB correctamente");
    } catch {
      console.error("Esperando los datos de clima...");
    }
  }
  
  async function fetchProductsData(data) {
    try {
      if (!data) {
        throw new Error("No se proporcionaron datos");
      }
      
      
      const { title, description } = JSON.parse(data);

      console.log('Titulo: ',title);
      console.log('Description: ',description);
  
      await client.connect();
  
      // Obtener la referencia a la base de datos
      const db = client.db("proyectoBigData");
      // Obtener la referencia a la colección
      const collection = db.collection("productsData");
      // Crear un nuevo documento con los datos
      const newData = {
        title,
        description
      };
      // Insertar el documento en la colección
      await collection.insertOne(newData);
      socket.emit('message', {
        type: 'product',
        data: {
          title,
          description
        }
      });
      console.log("Datos del producto guardados en MongoDB correctamente");
    } catch {
      console.error("Esperando los datos del producto...");
    }
  }
  
  


  
  
  
  
  
  
