const mongoose = require('mongoose');
const Schema = mongoose.Schema

const topicSchema = new Schema({
    title: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('topic', topicSchema);