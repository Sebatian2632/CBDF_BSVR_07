//Conexion con Mongoose
const mongoose = require('mongoose');
const uriLocal = "mongodb://127.0.0.1:27017/usuario"
//Conexión con MongoDB
const uriRemota = "mongodb+srv://Sebastian:DragonBlanco2632@cluster0-bsvr.megf1wb.mongodb.net/?retryWrites=true&w=majority";

async function conectarBaseDeDatos() {
    try {
      await mongoose.connect(uriRemota);
      console.log("Conexión a la base de datos exitosa");
    } catch (error) {
      console.error("Error al conectar a la base de datos:", error);
    }
  }
  
  conectarBaseDeDatos(); // Llamada a la función para iniciar la conexión

module.exports = mongoose;