var express = require('express');
var router = express.Router();
var workOutController = require('../controllers/workoutController');
let auth = require('../config/auth');

//Get workoutView
//router.get('/workout', workOutController.addWorkoutForm);
router.get('/workout', auth.ensureAuthenticated, workOutController.listofWorkouts);

//Add WorkoutToDb
router.post('/add', workOutController.addWorkout);

//Get WorkoutForm
router.get('/workoutForm', workOutController.WorkoutForm);

module.exports = router;