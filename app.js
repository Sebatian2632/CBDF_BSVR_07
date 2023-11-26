const express = require('express')
const routeUsuario = require('./src/routes/usuariosRoutes')
const app = express()
const port = process.env.port || 3000;

app.use(express.json())

app.use('/socios/v1/users',routeUsuario);

//Ejecutar el servidor
app.listen(port,()=>{
    console.log("Servidor escuchando en el puerto:", port);
})