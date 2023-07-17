const express = require('express')
const router = express.Router()
const usersController = require('../controllers/userController')


// this router is just a router instance, it's just a way to make a routing system.. this router is responsible for the route of '/' which is the route of whoever uses this routing system. For example, the one who uses this router instance, is '/users' route, you can see it in server.js
router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createNewUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)

module.exports = router