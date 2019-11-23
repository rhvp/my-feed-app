const User = require('../models/User');
const Post = require('../models/Post');
const Topic = require('../models/Topic');
const bcrypt = require('bcryptjs');
const passport = require('../config/passport');



module.exports = {
    index: async (req, res) => {
        
        const posts = await Post.find({status: 'public'}).populate('user');
        const topics = await Topic.find();
        res.render('default/index', {posts: posts,topics:topics, user: req.user});
    },

    getLogin: (req, res) => {
        res.render('default/login')
        
    },

    postLogin: (req, res, next) => {
        passport.authenticate('local', (err, user, info)=>{
            if(err){return next(err);}
            if(!user){return res.render('default/login', {error: info.message})}
            req.logIn(user, (err)=>{
                if(err){return next(err);}
                return res.redirect('/admin');
            });
        })(req, res, next);
    },

    getSignUp: (req, res) => {
        res.render('default/register')
    },

    getUserExists: (req, res)=> {
        res.render('default/userExists')
    },

    postSignUp: (req, res) => {
        let errors = [];
        if(!req.body.firstName){
            errors.push({message: 'First Name not provided'})
        }
        if(!req.body.lastName){
            errors.push({message: 'Last Name not provided'})
        }
        if(!req.body.email){
            errors.push({message: 'Email not provided'})
        }
        if(req.body.password !== req.body.passwordConfirm){
            errors.push({message: 'Password did not match'})
        }

        if(errors.length > 0) {
            res.render('default/register', {
                errors: errors,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email
            })
        } else {
            User.findOne({email: req.body.email}).then(user=>{
                if(user){
                    res.redirect('/userExists');
                } else {
                    const newUser = new User(req.body)
                    bcrypt.genSalt(10, (err, salt)=>{
                        bcrypt.hash(newUser.password, salt, (err, hash)=>{
                            newUser.password = hash;
                            newUser.save().then(user=>{
                                res.redirect('/login');
                            })
                        })
                    })
                }
            })
        }
    }

}