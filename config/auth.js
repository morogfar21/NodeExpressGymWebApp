// This ensures that a user cant access pages without login
module.exports = {
    ensureAuthenticated : function(req,res,next) {
    if(req.isAuthenticated()) {
    return next();
    }
    res.redirect('/users/login');
    }
}
