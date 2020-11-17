const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const passport = require('passport');
const UserColl = mongoose.model('User');
const saltRounds = 10;


//get register
module.exports.register = function (req, res) {
    res.render('register');
}

//get login
module.exports.showLogin = function (req, res) {
    res.render('login');
}

//post user
module.exports.registerPost = function (req,res) {
    const {username, password, password2} = req.body;
    let errors = [];
    console.log(' username ' + username+ ' pass:' + password);
    if(!username || !password || !password2) {
        errors.push({msg : "Please fill in all fields"});
    }

    //check if match
    if(password !== req.password2) {
        console.log("password != password2");
        errors.push({msg : "passwords dont match"});
    }
    
    //check if password is more than 6 characters
    if(password.length < 6 ) {
        console.log("password < 6");
        errors.push({msg : 'password atleast 6 characters'})
    } else {
        console.log("so far soo god");
        const newUser = new UserColl({
            username: username,
            password: password
        });
        bcrypt.hash(newUser.password, saltRounds)
            .then(function(hash){
                newUser.password = hash;
                newUser.save(function(err){
                    if(err) {
                        req.flash('error', `Failed to create user account because: ${err.message}.`);
                        res.render('register')
                    } else {
                        res.redirect('login');
                    }
                });
            });
    }
}

//get login
module.exports.login = async function (req, res, next) {
    passport.authenticate('local',{
        successRedirect : '/',
        failureRedirect : 'login',
        })(req,res,next);
}

//Get logout
module.exports.logout = function (req, res) {
    //logout function is a passport function.  
    req.logout();
    // log out user 
    req.user = null
    //delete req.user;
    res.redirect('login');
}


module.export

