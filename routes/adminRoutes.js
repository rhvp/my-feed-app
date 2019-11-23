const express = require('express')
const router = express.Router();
const adminController = require('../controllers/adminControllers');
const {isUserAuthenticated} = require('../config/customFunctions')

router.all('/*', isUserAuthenticated,  (req, res, next)=>{
    req.app.locals.layout = 'admin';
    next();
})

router.route('/')
    .get(adminController.index);

router.route('/posts')
    .get(adminController.getPosts);


router.route('/posts/create')
    .get(adminController.getCreatePost)
    .post(adminController.sendCreatePost);

router.route('/posts/delete/:id')
    .get(adminController.deletePost)

router.route('/posts/edit/:id')
    .get(adminController.getEditPost)
    .post(adminController.sendEditPost);

router.route('/topics')
    .get(adminController.getTopics)


router.route('/topics/create')
    .post(adminController.createTopic)

router.route('/topics/edit/:id')
    .get(adminController.getEditTopic)
    .post(adminController.sendEditTopic)

router.route('/logout')
    .get(adminController.logout)




module.exports = router;