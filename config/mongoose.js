const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sody-boy:rhap95@my-cluster-01-a0hk3.mongodb.net/feeder-cms-app?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then(
    res => {
        console.log('mongoatlas connected');
    }
).catch(err => {
    console.log('mongoatlas connection failed', err)
});

module.exports = mongoose.connection;