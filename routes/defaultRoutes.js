const express = require('express');
const defaultController = require('../controllers/defaultControllers')



const User = require('../models/User');


const router = express.Router();

router.all('/*', (req, res, next)=>{
    req.app.locals.layout = 'default';
    next();
})

router.route('/')
    .get(defaultController.index);




router.route('/login')
    .get(defaultController.getLogin)
    .post(defaultController.postLogin);


router.route('/register')
    .get(defaultController.getSignUp)
    .post(defaultController.postSignUp);
    
router.route('/userExists')
    .get(defaultController.getUserExists)

router.route('/post/:id')
    .get(defaultController.get_Post);
module.exports = router;