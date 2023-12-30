const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth.js")
const { registerValidation, loginValidation, validate } = require('../middlewares/validators/authValidate.js');
const isAuth = require("../middlewares/validators/isAuth.js");

router.post('/register', registerValidation, validate, authControllers.register)
router.post('/login', loginValidation, validate, authControllers.login)
router.post('/logout', authControllers.logout)
router.get('/current', isAuth, authControllers.current) // Retourne l'utilisateur authentifié en ce moment

module.exports = router