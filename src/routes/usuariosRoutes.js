const express = require('express');
const router = express.Router();
const rutas = require('../controllers/usuariosController');

router.get('/', rutas.getAllUser);
router.get('/:correo', rutas.getUserByID);
router.post('/', rutas.addUser);
router.put('/:correo', rutas.updateUser);
router.delete('/:correo', rutas.deleteUser);

module.exports = router;
