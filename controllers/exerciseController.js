const mongoose = require('mongoose');
const exerciseColl = mongoose.model('Exercise');
const workoutColl = mongoose.model('Workout');
var idhack;


/*Get add Exercise form*/ 
module.exports.addExerciseForm = function (req, res) {
    res.render('exerciseAdd', {
        title: 'exercise'
    });
}

/*POST add new exercise*/
module.exports.addExercise = async function (req, res) {
    const exerciseName = req.body.exercise;
    const descrip = req.body.description;
    const sets = req.body.sets;
    const reps = req.body.reps;
    const exerciseResult = new exerciseColl({name: exerciseName, description: descrip, sets: sets, reps: reps});

    console.log(exerciseName);
    console.log(descrip);
    console.log(sets);
    console.log(reps);
    console.log(idhack);
    let worko = await workoutColl.findOne({_id: idhack});
    console.log(worko);
    worko.exercises.push(exerciseResult);
    worko.save(function(err){
        if(err) {
            console.log("nooooo");
        }
        res.redirect('listofExercises?id='+ idhack);
    });
}

/*GET list of workouts */
module.exports.listofExercises = async function (req, res) {
    idhack = req.query.id;
    var workout = await workoutColl.findById(idhack);
    console.log(workout);
    var excerciseData = workout.exercises;
    console.log()
    res.render('exercises', {
        title: 'WebAssignment1',
        excerciseData
    });
};