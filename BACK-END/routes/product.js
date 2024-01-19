const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/product.js")

router.post('/addProduct', productControllers.createProduct)
router.get('/getProducts', productControllers.getAllProducts)
router.get('/getProductNom', productControllers.getProductNom)
router.get('/getOneProduct/:id', productControllers.getOneProduct)
router.put('/updateProduct/:id', productControllers.updateProduct)
router.delete('/deleteProduct/:id', productControllers.deleteProduct)

module.exports = router