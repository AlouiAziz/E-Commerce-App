const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user.js')


router.post('/addUser', UserController.createUser)
router.get('/getUsers', UserController.getAllUsers)
router.get('/getOneUser/:id', UserController.getOneUser)
router.put('/updateUser/:id', UserController.updateUser)
router.delete('/deleteUser/:id', UserController.deleteUser)


module.exports = router;