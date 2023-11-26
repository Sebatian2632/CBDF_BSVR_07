const express = require('express');
const router = express.Router();
const rutas = require('../controllers/usuariosController');

router.get('/', rutas.getAllUsers);
router.get('/:correo', rutas.getUserByEmail);
router.post('/', rutas.addUser);
router.put('/:correo', rutas.updateUser);
router.delete('/:correo', rutas.deleteUser);

module.exports = router;
