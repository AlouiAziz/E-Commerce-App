const express = require("express");
const router = express.Router();
const commandeControllers = require("../controllers/commande.js")

router.post('/addCommande/:user_id', commandeControllers.createCommande)
router.get('/getCommandes', commandeControllers.getAllCommandes)
router.get('/getOneCommande/:id', commandeControllers.getOneCommande)
router.put('/updateCommande/:id', commandeControllers.updateCommande)
router.delete('/deleteCommande/:id', commandeControllers.deleteCommande)

module.exports = router