const bcrypt = require('bcryptjs')
const Usuarios = require('../models/usuario.model')

exports.getAllUsers = async(req,res) =>{
    try {
        const listadoUsuarios = await Usuarios.find();
        if(listadoUsuarios){
            res.status(200).json({
                estado: 1,
                mensaje: "Usuarios encontrados",
                usuarios: listadoUsuarios
            })
        }else{
            res.status(404).json({
                estado: 0,
                mensaje: "Usuarios no encontrados"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            estado: 0,
            mensaje: "Ocurrió un error desconocido"
        })
    }
}

exports.getUserByEmail = async(req,res) =>{
    try {
        const {correo} = req.params;      
        const usuario = await Usuarios.findOne({correo:correo}).exec();
        if(usuario){
            res.status(200).json({
                estado: 1,
                mensaje: "Usuarios encontrados",
                usuario: usuario
            })
        }else{
            res.status(404).json({
                estado: 0,
                mensaje: "Usuario no encontrado"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            estado: 0,
            mensaje: "Ocurrió un error desconocido"
        })
    }
}

exports.addUser = async(req,res) =>{
    try {
        const {nombre, apellidos, usuario, correo, clave} = req.body;
        if (nombre ==undefined || apellidos==undefined || usuario==undefined || correo==undefined || clave==undefined) {
            res.status(400).json({
                estado: 0,
                mensaje: "Faltan parámetros"
            })
        } else {
            // Falta encriptar la clave
            //Falta verificar si el usuario y/o correo ya existen
            //const usuarioEncontrado = await Usuarios.findOne({correo:correo, usuario:usuario}).exec();
            const usuarioEncontrado = await Usuarios.findOne({$or: [{correo:correo}, {usuario:usuario}]}).exec();
            if (usuarioEncontrado) {
                res.status(200).json({
                    estado: 0,
                    mensaje: "Usuario y/o correo ya regisrado"
                })
            } else {               
            const salt = await bcrypt.genSalt(8);
            const usuarioC = await Usuarios.create({nombre,apellidos,usuario,correo,clave:await bcrypt.hash(clave,salt)})
            if (usuarioC) {
                res.status(200).json({
                    estado: 1,
                    mensaje: "Usuario creado correctamente",
                    usuario: usuarioC
                })
            } else {
                res.status(500).json({
                    estado: 0,
                    mensaje: "Ocurrió un error desconocido"
                })
            }
        }
    }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            estado: 0,
            mensaje: "Ocurrió un error desconocido"
        })
    }
}

exports.updateUser = async(req,res) =>{
    try {
        const { correo } = req.params;
        const { nombre, apellidos, clave } = req.body;
        if (nombre ==undefined || apellidos==undefined || clave==undefined) {
            res.status(400).json({
                estado: 0,
                mensaje: "Faltan parámetros"
            })
        } else {
            const salt = await bcrypt.genSalt(8);
            const usuario = await Usuarios.findOneAndUpdate({correo:correo},{
                nombre:nombre,
                apellidos:apellidos,
                clave:await bcrypt.hash(clave,salt)}).exec();
                
            res.status(200).json({
                estado: 1,
                mensaje: "El registro se actualizó correctamente"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            estado: 0,
            mensaje: "Ocurrió un error desconocido"
        })
    }
}

exports.deleteUser = async(req,res) =>{
    try {
        const {correo} = req.params;      
        const usuario = await Usuarios.findOne({correo:correo}).exec();
        if(usuario){
            await Usuarios.deleteOne(usuario);
            res.status(200).json({
                estado: 1,
                mensaje: "Usuarios eliminado correctamente",
                usuario: usuario
            })
        }else{
            res.status(404).json({
                estado: 0,
                mensaje: "Usuario no encontrado"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            estado: 0,
            mensaje: "Ocurrió un error desconocido"
        })
    }
}


