var express = require('express');
var router = express.Router();
var userController = require('../controllers/usersController');

//Get login handle
router.get('/login', userController.showLogin);

//Post login
router.post('/login', userController.login);

//Get Register
router.get('/register', userController.register);

//post register
router.post('/register', userController.registerPost);

//Logout handler
router.get('/logout', userController.logout);

// //Validate user login
//router.get('/validate', userController.loginget);

module.exports = router;
