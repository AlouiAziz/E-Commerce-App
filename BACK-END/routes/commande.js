const express = require("express");
const router = express.Router();
const commandeControllers = require("../controllers/commande.js")

router.post('/addCommande', commandeControllers.createCommande)
router.get('/getCommandes', commandeControllers.getAllCommandes)
router.get('/getUserCommandes/:id', commandeControllers.getUserCommandes)
router.get('/getOneCommande/:id', commandeControllers.getOneCommande)
router.put('/updateCommande/:id', commandeControllers.updateCommande)
router.delete('/deleteCommande/:id', commandeControllers.deleteCommande)

module.exports = router