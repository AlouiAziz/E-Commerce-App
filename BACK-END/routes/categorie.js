const express = require("express");
const router = express.Router();
const categorieControllers = require("../controllers/categorie.js")

router.post('/addCategorie', categorieControllers.createCategorie)
router.get('/getCategories', categorieControllers.getAllCategories)
router.get('/getOneCategorie/:id', categorieControllers.getOneCategorie)
router.put('/updateCategorie/:id', categorieControllers.updateCategorie)
router.delete('/deleteCategorie/:id', categorieControllers.deleteCategorie)

module.exports = router