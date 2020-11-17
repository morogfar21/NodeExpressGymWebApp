const mongoose = require('mongoose');
const workoutColl = mongoose.model('Workout');
const userColl = mongoose.model('User');


/*Get add Workout form*/ 
module.exports.addWorkoutForm = function (req, res) {
    res.render('workouts', {
        title: 'workout'
    });
};

/*POST add new workout*/
module.exports.addWorkout = async function (req, res) {
    const workoutname = req.body.name;
    const workoutResult = new workoutColl({name: workoutname, exercises: []});

    workoutResult.save(function(err){
        if(err) {
            console.log("noooooo");
        }
    });
    
    console.log(workoutname);
    await userColl.findOne({_id: req.user._id}).populate('workouts')
    .exec(function(err, user){
            if(err) {
                res.render('error', err);
            }
             user.workouts.push(workoutResult);
             user.save(function(err){
                 if(err) {
                     console.log(nooooo);
                 }
             });
             res.redirect('workout')
        });
};

/*GET details of workout */
module.exports.WorkoutForm = function (req, res) {
    res.render('workoutForm');
};

/*GET list of workouts */
module.exports.listofWorkouts = async function (req, res) {
    console.log(req.user);
    await userColl.findOne({_id: req.user._id})
    .populate('workouts')
    .exec()
    .then((user) => {
        console.log(user.workouts);  

        var workoutdata = user.workouts;
        console.log(workoutdata);
        res.render('workouts', {
        title: 'WebAssignment1',
        workoutdata
        });  
    });
};