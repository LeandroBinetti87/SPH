const express = require('express');
const router = express.Router();
const userController = require("../controllers/user.controller");
const informeController = require("../controllers/informe.controller");
const productoController = require("../controllers/producto.controller");
const multer = require('multer');
const upload = multer({ dest: 'public/assets/firmas/' });
const adminVerify = require('../middlewares/adminVerify.js');

router.get('/users', adminVerify, userController.getUsers);
router.get('/user/:id', adminVerify, userController.getUserById);
router.post('/user', adminVerify, upload.single('firma'), userController.createUser);
router.put('/user/:id', adminVerify, upload.single('firma'), userController.updateUserById);
router.put('/user/updatepassword/:id', adminVerify, userController.updatePasswordById);
router.delete('/user/:id', adminVerify, userController.deleteUserById);

router.get('/informes', informeController.getInformes);
router.get('/informe/:id', informeController.getInformeById);
router.post('/informe', informeController.createInforme);
router.put('/informe/:id', adminVerify, informeController.updateInformeById);
router.delete('/informe/:id', adminVerify, informeController.deleteInformeById);

router.get('/productos', productoController.getProductos);
router.get('/producto/:id', productoController.getProductoById);
router.post('/producto', adminVerify, productoController.createProducto);
router.put('/producto/:id', adminVerify, productoController.updateProductoById);
router.delete('/producto/:id', adminVerify, productoController.deleteProductoById);

module.exports = router;