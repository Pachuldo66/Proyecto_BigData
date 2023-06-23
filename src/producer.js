//producer
const Kafka = require("node-rdkafka");
const axios = require("axios");
const readConfigFile = require("./app.js");
const socketIO = require("socket.io");
const http = require("http");

const server = http.createServer();
const io = socketIO(server);

const producer = new Kafka.Producer(readConfigFile("api-key-2.txt"));
producer.connect();

async function fetchData() {
    try {
      const response = await axios.get("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR");
      const data = response.data;
      const key = "Valor del bitcoin, dolar y euro."; // Asigna una clave apropiada
      const value = JSON.stringify(data);
  
      producer.produce("topic_0", -1, Buffer.from(value), Buffer.from(key));
  
      // Enviar el mensaje al cliente a través de Socket.IO
      io.emit("message", value);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
}

async function fetchWeatherData() {
    try {
      const response = await axios.get("http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=ae4aefcd6020cb7c801efdfa289b23e6");
      const data = response.data;
      const key = "OpenWeatherMap"; // Asigna una clave apropiada
      const value = JSON.stringify(data);
  
      producer.produce("topic_0", -1, Buffer.from(value), Buffer.from(key));
  
      // Enviar el mensaje al cliente a través de Socket.IO
      io.emit("message", value);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
}

async function fetchProductsData() {
    try {
      const response = await axios.get("https://dummyjson.com/products/3");
      const data = response.data;
      const key = "ProductData"; // Asigna una clave apropiada
      const value = JSON.stringify(data);
  
      producer.produce("topic_0", -1, Buffer.from(value), Buffer.from(key));
  
      // Enviar el mensaje al cliente a través de Socket.IO
      io.emit("message", value);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  }

  
producer.on("ready", () => {
  // Producir datos cada cierto intervalo
  setInterval(fetchData, 10000);
  setInterval(fetchWeatherData, 5000)
  setInterval(fetchProductsData, 5000)
});


producer.on("event.error", (err) => {
  console.error("Error from producer:", err);
});

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(3001, () => {
  console.log("Socket.IO server running on port 3001");
});



