// get an instance of mongoose and mongoose.Schema
const mongoose = require('mongoose');
var beautifyUnique = require('mongoose-beautiful-unique-validation');
var mongooseTypes = require("mongoose-types");
//var useTimestamps = mongooseTypes.useTimestamps;
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
var uuid = require('node-uuid');
//var bcrypt = require('bcryptjs');
var SALT_FACTOR = 10;
var noop = function() {}; //A do-nothing function for use with the bcrypt module
var Schema = mongoose.Schema;
var jwt = require('jsonwebtoken');

function setRegistrationExpirationDate() {
    return Date.now; //new Date(new Date(Date.now).getTime() + 60 * 60 * 24 * 1000);
}

function getToken() {
    return uuid.v4();
    //return rand=Math.floor((Math.random() * 100) + 54);
}

// User Schema
var userSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, unique: 'This E-mail is already registered', index: true, uniqueCaseInsensitive: true }, //, index:true
    //password: { type: String, required: true},
    hash: String,
    salt: String,
    createdAt: { type: Date, default: Date.now },
    //username: { type: String, lowercase: true, unique: 'This username is already taken' },
    registrationToken: { type: String, default: getToken() },
    registrationTokenExpires: { type: Date, default: setRegistrationExpirationDate() },
    passwordResetToken: String,
    passwordResetExpires: { type: Date }, //, default: Date.now },
    displayName: String,
    bio: String,
    gender: String,
    age: String,
    picture: { type: String, default: '' },
    emailVerified: Boolean,
    //status inactive, active
    status: { type: String, default: 'inactive' },
    /*
    profile: {
      gender: { type: String, default: '' },
      location: { type: String, default: '' },
      website: { type: String, default: '' },
      picture: { type: String, default: '' }
    },
    */
    facebook: {
        id: String,
        token: String,
        email: String,
        image: String,
    },
    twitter: {
        id: String,
        token: String,
        username: String,
        image: String,
    },
    google: {
        id: String,
        token: String,
        email: String,
        image: String,
    },
    //tokens: Array,
    admin: Boolean
});


userSchema.methods.generateJWT = function() {
    // set expiration to 60 days
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    //var secret = uuid.v4();
    return jwt.sign({ _id: this._id, username: this.username, exp: parseInt(exp.getTime() / 1000) }, process.env.API_TOKEN_KEY);
};

userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};
//used for new social users since they don't create passwords
userSchema.methods.setPasswordForNewSocialUser = function() {
    this.setPassword(crypto.randomBytes(16).toString('hex'));
};


userSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash === hash;
};

// Execute before each user.save() call

userSchema.pre('save', function(callback) {
    var user = this;
    // Break out if the password hasn't changed
    if (!user.isModified('password')) return callback();

    // Password changed so we need to hash it
    bcrypt.genSalt(5, function(err, salt) {
        if (err) return callback(err);

        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) return callback(err);

            user.password = hash;
            callback();
        });
    });
});

// set up a mongoose model and pass it using module.exports
userSchema.plugin(beautifyUnique);
//userSchema.plugin(useTimestamps);
const User = module.exports = mongoose.model('User', userSchema);


module.exports.createUser = function(newUser, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}
module.exports.emailVerified = function(email, token, callback) {
    var query = { email: email, registrationToken: token };
    User.findOne(query, callback);
}

module.exports.getPasswordResetToken = function() {
    return getToken();
}

module.exports.getUserByUsername = function(username, callback) {
    var query = { username: username };
    User.findOne(query, callback);
}
module.exports.getUserByEmail = function(email, callback) {
    var query = { email: email };
    User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}
/*
module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
}
module.exports.createRandomPassword = function() {
    return getToken();
}
*/


module.exports.resetPassword = function(email, callback) {
    User.getUserByEmail(email, function(err, user) {
        if (user) {
            user.passwordResetToken = User.getPasswordResetToken();
            user.passwordResetExpires = Date.today().add(1).days(); // Add 1 days to today
            user.save(function(err) {
                callback(err, user);
            });
        } else {
            console.log(err);
            callback(err, user);
        }
    });
}
