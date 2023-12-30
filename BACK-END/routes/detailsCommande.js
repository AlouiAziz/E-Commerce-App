const express = require("express");
const router = express.Router();
const detailCommandeControllers = require("../controllers/detailsCommande.js")

router.post('/adddetailCommande/:user_id', detailCommandeControllers.createDetailsCommande)
router.get('/getdetailCommandes', detailCommandeControllers.getAllDetailsCommandes)
router.get('/getOnedetailCommande/:id', detailCommandeControllers.getOneDetailsCommande)
router.put('/updatedetailCommande/:id', detailCommandeControllers.updateDetailsCommande)
router.delete('/deletedetailCommande/:id', detailCommandeControllers.deleteDetailsCommande)

module.exports = router