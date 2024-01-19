const express = require("express");
const router = express.Router();
const CommentaireControllers = require("../controllers/commentaire.js")

router.post('/addCommentaire', CommentaireControllers.createCommentaire)
router.get('/getCommentaires', CommentaireControllers.getAllCommentaires)
router.get('/getOneCommentaire/:id', CommentaireControllers.getOneCommentaire)
router.get('/getPrCommentaire/:id', CommentaireControllers.getPrCommentaires)
router.put('/updateCommentaire/:id', CommentaireControllers.updateCommentaire)
router.delete('/deleteCommentaire/:id', CommentaireControllers.deleteCommentaire)

module.exports = router