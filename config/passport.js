var passport = require("passport")
LocalStrategy = require("passport-local").Strategy;
const mongoose = require('mongoose');
const UserColl = mongoose.model('User');

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
},
  function(username, password, done) {
    UserColl.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {return done(null, false, { message: 'Incorrect username.'}); } 
      if (!user.validPassword(password)) { return done(null, false, {message: 'Incorrect password.'}); }
      return done(null, user);
    }); 
  }
));

passport.serializeUser(function(user, cb){
  cb(null, user._id)
})

passport.deserializeUser(function(id, cb)
{
  UserColl.findById(id, function (err, user)
  {
    if(err) { return cb(err);}
  cb(null, user);
  });
});

