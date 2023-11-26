const { model } = require('mongoose')
const mongoose = require('../config/db')
const { Schema } = mongoose

//Estructura de la coleccion de usuarios
const usuarioSchema = new Schema({
    nombre:{type:String},
    apellidos:{type:String},
    usuario:{type:String},
    correo:{type:String},
    clave:{type:String}
})

//Correspondencia de la colección en la base de datos
const Usuario = mongoose.model('Usuario',usuarioSchema)

module.exports = Usuario;