var express = require('express');
var router = express.Router();
const homeController = require('../controllers/homeController')

router.get('/', homeController.homePage);

//Use for logout in html layout local variable.
router.use(function (req,res,next){
  res.locals.currentUser = req.user;
  next();
})

 module.exports = router;
