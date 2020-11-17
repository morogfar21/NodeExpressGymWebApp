var express = require('express');
var router = express.Router();
var exerciseController = require('../controllers/exerciseController');

// //Get exerciseView
// router.get('/exercise/:id', exerciseController.listofExercises);

//Add ExerciseToDb
router.post('/add', exerciseController.addExercise); //benjano

//get exerciseform
router.get('/exerciseform', exerciseController.addExerciseForm);

//Get exerciseListView
router.get('/listofExercises', exerciseController.listofExercises);

module.exports = router;