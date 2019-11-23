const Post = require('../models/Post');
const Topic = require('../models/Topic');
const passport = require('../config/passport');

module.exports = {
    index: (req, res) => {
        res.render('admin/index');
    },

    logout: (req, res)=>{
        req.logOut();
        req.session.destroy(()=>{
            res.clearCookie('connect.sid').status(200).redirect('/')
        }
    );
    },

    getPosts: (req, res) => {
        Post.find({user: req.user.id})
        .populate('topic')
        .then(posts => {
            res.render('admin/posts/index', {posts: posts})
        })
    },
    getCreatePost: (req, res) => {
        Topic.find().then(topics => {
            res.render('admin/posts/create', {topics: topics})
        })
    },
    sendCreatePost: (req, res) => {


        const newPost = new Post({
            title: req.body.title,
            status: req.body.status,
            description: req.body.description,
            topic: req.body.topic,
            user: req.user.id
        })

        newPost.save().then(post => {
            res.redirect('/admin/posts')
        })
    },

    deletePost: (req, res) => {
        Post.findByIdAndDelete(req.params.id).then(deletedPost => {
            res.redirect('/admin/posts');
        })
    },

    getEditPost: (req,res)=>{
        Post.findById(req.params.id)
        .then(post=> {
            Topic.find().then(topics=>{
                res.render('admin/posts/edit', {post: post, topics: topics});
            })
        });
    },

    sendEditPost: (req,res)=> {
        Post.findByIdAndUpdate(req.params.id, req.body, {new: true}).then(
            res.redirect('/admin/posts')
        )
    },

    deletePost: (req, res)=>{
        Post.findByIdAndDelete(req.params.id).then(post=>{
            res.send(post)    
        })
    },

    getTopics: (req, res)=>{
        Topic.find().then(topics=>{
            res.render('admin/topics/index', {topics: topics})
        })
    },

    createTopic: (req, res)=>{
        Topic.create({title: req.body.title}).then(topic=>{
            res.send(topic)
        })
    },
    getEditTopic: async (req, res)=>{
        const tops = await Topic.find();
        Topic.findById(req.params.id).then(topic=>{
            res.render('admin/topics/edit', {topic: topic, topics: tops})
        })
    },
    sendEditTopic: (req,res)=>{
        Topic.findByIdAndUpdate(req.params.id, req.body, {new: true}).then(topic=>{
                res.send(topic)
            }
        )
    }
}