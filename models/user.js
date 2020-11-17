const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passport = require('passport');
const saltrounds = 10;

const userSchema = new mongoose.Schema({
    username: {
    type: String,
    unique: true,
    required: true
    },
    password: {
    type: String,
    required: true
    },
    hash: String,
    workouts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workout"
    }]
});

userSchema.methods.setPassword = ( password) =>{
    return bcrypt.hashSync(password, saltrounds);
};

userSchema.methods.validPassword = function ( password) {
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
