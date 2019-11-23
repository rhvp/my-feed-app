const bcrypt = require('bcryptjs');
const passport = require('passport');
const local = require('passport-local');
const User = require('../models/User');
const LocalStrategy = local.Strategy;

passport.use(new LocalStrategy({
    usernameField: 'email',
}, (email, password, done)=>{
    User.findOne({email: email}).then(user=>{
        if(!user){
            return done(null, false, {message: 'user not found with this email'})
        }
        bcrypt.compare(password, user.password, (err, passwordMatched)=>{
            if(err) {
                return err
            }

            if(!passwordMatched) {
                return done(null, false, {message: 'invalid username or password'})
            }
            return done(null, user)
        });
    });
}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

module.exports = passport;