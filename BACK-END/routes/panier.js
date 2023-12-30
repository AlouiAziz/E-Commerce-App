const express = require("express");
const router = express.Router();
const PanierControllers = require("../controllers/Panier.js")

router.post('/addPanier/:user_id/:product_id', PanierControllers.createPanier)
router.get('/getPaniers', PanierControllers.getAllPaniers)
router.get('/getOnePanier/:id', PanierControllers.getOnePanier)
router.put('/updatePanier/:id', PanierControllers.updatePanier)
router.delete('/deletePanier/:id', PanierControllers.deletePanier)

module.exports = router