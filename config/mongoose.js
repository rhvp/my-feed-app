const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/my-cms-app', {useNewUrlParser: true, useUnifiedTopology: true, 'useFindAndModify': false}).then(
    res => {
        console.log('MongoDB connected')
    }
).catch(err => {
    console.log('MongoDB connection failed!!')
})

module.exports = mongoose.connection;