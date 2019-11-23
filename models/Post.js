const connection = require('../config/mongoose');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'public'
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    topic: {
        type: Schema.Types.ObjectId,
        ref: 'topic'
    }
}, {timestamps: true})

module.exports = mongoose.model('post', PostSchema, 'post');